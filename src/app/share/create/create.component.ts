import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Coords } from '../../models/coords';
import { Place } from '../../models/place';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {
  @Input() coords: Coords;
  @Output() close = new EventEmitter();

  form: FormGroup;
  place: Place;
  imageLoaded: boolean;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.form = this.fb.group({
      poster: ['', Validators.required],
      title: ['', Validators.required],
      description: ['', Validators.required]
    });
  }

  get titleInvalid() {
    return this.form.get('title').invalid && this.form.get('title').touched;
  }

  get descriptionInvalid() {
    return this.form.get('description').invalid && this.form.get('description').touched;
  }

  onFileChange(fileInput) {
    const reader = new FileReader();
    reader.addEventListener('load', _ => {
      this.imageLoaded = true;
      this.form.patchValue({
        poster: reader.result
      });
    });

    if (fileInput.files && fileInput.files.length) {
      const [file] = fileInput.files;
      reader.readAsDataURL(file);
    }

    reader.addEventListener('load', (event: any) => {
      console.log(event.target.result);
    });
  }

  onSubmit(e: Event) {
    e.preventDefault();

    if (this.form.invalid) {
      Object.values(this.form.controls).forEach(c => c.markAsTouched());
      return;
    }

    this.place = {
      title: this.form.get('title').value,
      description: this.form.get('description').value,
      coords: this.coords,
      image: this.form.get('poster').value
    };
  }

  onCloseClick() {
    this.close.emit();
  }
}
