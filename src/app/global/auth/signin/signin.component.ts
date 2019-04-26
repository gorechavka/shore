import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../../core/auth-service/auth.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
  @Output() public registrationRequest = new EventEmitter();
  public form: FormGroup;

  public _destroy$ = new Subject();

  constructor(private fb: FormBuilder, private auth: AuthService) {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  public ngOnInit() {
    this.auth.isLoggedIn$.pipe(takeUntil(this._destroy$)).subscribe(isLoggedIn => {
      if (isLoggedIn) {
        this.auth.redirect();
      }
    });
  }

  get emailInvalid(): boolean {
    return this._checkErrors('email');
  }

  get passwordInvalid() {
    return this._checkErrors('password');
  }

  public onSubmit(e: Event) {
    e.preventDefault();
    const { email, password } = this.form.value;
    this.form.reset();
    this.auth.emailSignin(email, password);
  }

  public onRegistrationClick() {
    this.registrationRequest.emit();
  }

  private _checkErrors(control: string): boolean {
    return this.form.get(control).invalid && (this.form.get(control).touched || this.form.get(control).dirty);
  }

  public ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.unsubscribe();
  }
}
