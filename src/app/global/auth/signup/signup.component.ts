import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../../core/auth-service/auth.service';
import { PasswordValidators } from './PasswordValidators.validator';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  form: FormGroup;

  constructor(private fb: FormBuilder, private auth: AuthService) {}

  ngOnInit() {
    this.form = this.fb.group({
      login: ['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9_\-]+$/), Validators.minLength(6)]],
      email: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [
          Validators.required,
          PasswordValidators.hasCapital(),
          PasswordValidators.hasLowercase(),
          PasswordValidators.hasNum(),
          PasswordValidators.hasSpecial(),
          Validators.minLength(6),
          Validators.maxLength(21)
        ]
      ],
      confirmation: ['']
    });

    this.form
      .get('confirmation')
      .setValidators([Validators.required, PasswordValidators.equal(this.form.get('password'))]);
  }

  get loginInvalid(): boolean {
    return this._checkErrors('login');
  }

  get emailInvalid(): boolean {
    return this._checkErrors('email');
  }

  get passwordInvalid(): boolean {
    return this._checkErrors('password');
  }

  get confirmationInvalid(): boolean {
    return this._checkErrors('confirmation');
  }

  onSubmit(e: Event) {
    e.preventDefault();
    const { login, email, password } = this.form.value;
    this.form.reset();
    this.auth.emailSignup(login, email, password).catch(err => console.log(err.message));
  }

  private _checkErrors(control: string): boolean {
    return this.form.get(control).invalid && (this.form.get(control).touched || this.form.get(control).dirty);
  }
}
