import { Component, OnInit, Input } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.css']
})
export class FeedbackComponent implements OnInit {
  @Input() control: AbstractControl;

  private config = {
    required: 'поле обязательно для заполнения',
    email: 'введите действительный адрес электронной почты',
    minlength: 'минимальная длина — 5',
    maxlength: 'максимальная длина — 140',
    noLowercase: 'должна быть минимум одна прописная латинская буква',
    noCapital: 'должна быть минимум одна заглавная латинская буква',
    noNum: 'должна быть минимум одна цифра',
    noSpecial: 'должен быть минимум один специальный символ(_!#+-$)',
    notEqual: 'пароли не совпадают'
  };

  constructor() {}

  ngOnInit() {}

  get feedback(): string {
    for (const error in this.control.errors) {
      if (this.control.errors.hasOwnProperty(error)) {
        return this.config[error];
      }
    }

    return null;
  }
}
