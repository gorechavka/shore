import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../../core/auth-service/auth.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
  @Output() registrationRequest = new EventEmitter();
  form: FormGroup;

  constructor(private fb: FormBuilder, private auth: AuthService) {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  ngOnInit() {
    this.auth.isLoggedIn$.subscribe(isLoggedIn => {
      if (isLoggedIn) {
        this.auth.redirect();
      }
    });
  }

  get emailInvalid() {
    return this._checkErrors('email');
  }

  get passwordInvalid() {
    return this._checkErrors('password');
  }

  onSubmit(e: Event) {
    e.preventDefault();
    const { email, password } = this.form.value;
    this.form.reset();
    this.auth.emailSignin(email, password);
  }

  onRegistrationClick() {
    this.registrationRequest.emit();
  }
  private _checkErrors(control: string): boolean {
    return this.form.get(control).invalid && (this.form.get(control).touched || this.form.get(control).dirty);
  }
}
