import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { DatabaseService } from '../db-service/database.service';
import { User } from './user';
import { map } from 'rxjs/operators';
import { Userdb } from '../../models/userdb.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _user$: BehaviorSubject<User> = new BehaviorSubject<User>(null);
  private _redirectUrl: string = '';

  set redirectUrl(path: string) {
    this._redirectUrl = path;
  }

  constructor(private router: Router, private afAuth: AngularFireAuth, private dbService: DatabaseService) {
    this.afAuth.authState
      .pipe(
        map((userData: User) => {
          if (userData) {
            return { uid: userData.uid, email: userData.email };
          }
          return null;
        })
      )
      .subscribe((user: User) => this._user$.next(user));
  }

  get user$(): Observable<User> {
    return this._user$.asObservable();
  }

  get isLoggedIn$(): Observable<boolean> {
    return this.user$.pipe(map((user: User) => !!user));
  }

  public getUserId(): Observable<string> {
    return this.user$.pipe(map((user: User) => user.uid));
  }

  public emailSignin(email: string, password: string): Promise<Error | void> {
    // tslint:disable-next-line: typedef
    return this.afAuth.auth.signInWithEmailAndPassword(email, password).then(_ => {
      this.redirect();
    });
  }

  public emailSignup(login: string, email: string, password: string): Promise<Error | void> {
    return this.afAuth.auth
      .createUserWithEmailAndPassword(email, password)
      .then((userCred: firebase.auth.UserCredential) => {
        this.addUser(userCred.user.uid, { email, login, password });
        this.redirect();
      });
  }

  public signout() {
    this.afAuth.auth.signOut();
    if (this.router.routerState.snapshot.url.split('/')[1] === 'share' || 'explore') {
      this.router.navigate(['auth']);
    }
  }

  public addUser(uid: string, { email, login, password }: { [key: string]: string }) {
    this.dbService.changeUserData(uid, { email, login, password });
  }

  public redirect() {
    this.router.navigate([this._redirectUrl]);
  }
}
