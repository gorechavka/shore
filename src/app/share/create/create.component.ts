import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
  ChangeDetectorRef
} from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { Coords } from '../../models/coords.model';
import { Place } from '../../models/place.model';
import { Category } from '../../models/category.model';
import { CreateService } from './create.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CreateComponent implements OnInit {
  @Input() public category: Category;
  @Input() public coords: Coords;
  @Output() public readonly close: EventEmitter<void> = new EventEmitter();

  public form: FormGroup;
  public place: Place;
  public image: string | ArrayBuffer;
  public imageLoaded: boolean;

  constructor(private fb: FormBuilder, private createService: CreateService, private cdr: ChangeDetectorRef) {}

  public ngOnInit() {
    this.form = this.fb.group({
      poster: [''],
      title: ['', [Validators.required, Validators.minLength(5)]],
      description: ['', [Validators.required]],
      address: ['', Validators.required]
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

  get addressInvalid() {
    return this.form.get('adress').invalid && this.form.get('adress').touched;
  }

  public onFileChange(fileInput) {
    const reader = new FileReader();
    reader.addEventListener('load', _ => {
      this.imageLoaded = true;
      this.image = reader.result;
      this.cdr.detectChanges();
    });

    if (fileInput.files && fileInput.files.length) {
      const [file] = fileInput.files;
      reader.readAsDataURL(file);
    }
  }

  public onSubmit(e: Event) {
    e.preventDefault();

    if (this.form.invalid) {
      Object.values(this.form.controls).forEach((c: AbstractControl) => c.markAsTouched());
      return;
    }

    this.place = {
      category: this.category,
      title: this.form.get('title').value,
      description: this.form.get('description').value,
      coords: this.coords,
      image: this.image,
      address: this.form.get('address').value
    };

    this.createService.addPlace(this.place);

    this.finish();
  }

  public onCloseClick() {
    this.close.emit();
  }

  private finish() {
    this.imageLoaded = false;
    this.image = null;
    this.form.reset();
    this.close.emit();
  }
}
