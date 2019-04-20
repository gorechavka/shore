import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Coords } from '../../models/coords';
import { Place } from '../../models/place';
import { Category } from '../../models/category';
import { CreateService } from './create.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {
  @Input() category: Category;
  @Input() coords: Coords;
  @Output() close = new EventEmitter();

  form: FormGroup;
  place: Place;
  image: string | ArrayBuffer;
  imageLoaded: boolean;

  constructor(private fb: FormBuilder, private createService: CreateService) {}

  ngOnInit() {
    this.form = this.fb.group({
      poster: [''],
      title: ['', [Validators.required, Validators.minLength(5)]],
      description: ['', [Validators.required, Validators.maxLength(140)]]
    });
  }

  get titleInvalid() {
    return this.form.get('title').invalid && this.form.get('title').touched;
  }

  get descriptionInvalid() {
    return this.form.get('description').invalid && this.form.get('description').touched;
  }

  get posterInvalid() {
    return this.form.get('poster').invalid && this.form.get('poster').touched;
  }

  onFileChange(fileInput) {
    const reader = new FileReader();
    reader.addEventListener('load', _ => {
      this.imageLoaded = true;
      this.image = reader.result;
    });

    if (fileInput.files && fileInput.files.length) {
      const [file] = fileInput.files;
      reader.readAsDataURL(file);
    }

    reader.addEventListener('load', (event: any) => {
      console.log('image was loaded');
    });
  }

  onSubmit(e: Event) {
    e.preventDefault();

    if (this.form.invalid) {
      Object.values(this.form.controls).forEach(c => c.markAsTouched());
      return;
    }

    this.place = {
      category: this.category,
      title: this.form.get('title').value,
      description: this.form.get('description').value,
      coords: this.coords,
      image: this.image
    };

    this.createService.addPlace(this.place);
    //если решу хранить и подгружать картинки отдельно
    // .then(id => this.createService.addImage(this.image, <string>id));
    // this.createService.addImage(this.image, id????);
    this.finish();
  }

  finish() {
    this.imageLoaded = false;
    this.image = null;
    this.form.reset();
    this.close.emit();
  }

  onCloseClick() {
    this.close.emit();
  }
}
