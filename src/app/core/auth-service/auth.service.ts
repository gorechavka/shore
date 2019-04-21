import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { DatabaseService } from '../db-service/database.service';
import { User } from './user';
import { map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _user$ = new BehaviorSubject<User>(null);
  private _redirectUrl: string = '';

  set redirectUrl(path) {
    this._redirectUrl = path;
  }

  constructor(private router: Router, private afAuth: AngularFireAuth, private dbService: DatabaseService) {
    this.afAuth.authState
      .pipe(
        map(userData => {
          if (userData) return { uid: userData.uid, email: userData.email };
          return null;
        })
      )
      .subscribe(user => this._user$.next(user));
  }

  get user(): Observable<User> {
    return this._user$.asObservable();
  }

  get isLoggedIn$(): Observable<boolean> {
    return this._user$.asObservable().pipe(map(user => !!user));
  }

  emailSignin(email: string, password: string): Promise<Error | void> {
    return this.afAuth.auth.signInWithEmailAndPassword(email, password).then(_ => this.redirect());
  }

  emailSignup(login: string, email: string, password: string): Promise<Error | void> {
    return this.afAuth.auth.createUserWithEmailAndPassword(email, password).then(user => {
      return this.addUser(user.user.uid, { email, login, password });
    });
  }

  signout() {
    this.afAuth.auth.signOut();
    if (this.router.routerState.snapshot.url.split('/')[1] === 'share') {
      this.router.navigate(['auth']);
    }
  }

  addUser(uid, { email, login, password }) {
    this.dbService.changeData('users', uid, { email, login, password });
  }

  redirect() {
    this.router.navigate([this._redirectUrl]);
  }
}
