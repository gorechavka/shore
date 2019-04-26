import { Component, ViewChildren, QueryList, ElementRef } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  constructor() {}

  public pupilXPosition = 0;
  public pupilRotationAngle = 0;

  public containerWidth: number;
  public eyeWidth: number;

  private mousePosition$ = new Subject<MouseEvent>();

  @ViewChildren('pupil') public pupils: QueryList<ElementRef>;

  public ngAfterViewInit(): void {
    this.mousePosition$.asObservable().subscribe((e: MouseEvent) => {
      this.pupils.forEach(p => {
        const angle = this.countRotationAngle(e, p.nativeElement);
        p.nativeElement.style.right = this.countRelativePath(e, p.nativeElement.parentElement) + 'px';
        p.nativeElement.style.transform = `rotate(${angle + 180}deg)`;
      });
    });
  }

  public onMouseMove(e: MouseEvent, containerWidth: number) {
    this.containerWidth = containerWidth;
    this.mousePosition$.next(e);
  }

  private countRelativePath(e: MouseEvent, eye: HTMLDivElement): number {
    const delta = Math.round((eye.clientWidth * (this.containerWidth / 2 - e.clientX)) / this.containerWidth) + 18;
    return delta;
  }

  private countRotationAngle(e: MouseEvent, pupil: HTMLDivElement): number {
    const a = e.clientX - pupil.getBoundingClientRect().left;
    const b = e.clientY - (pupil.getBoundingClientRect().top + pupil.clientHeight / 2);
    return (Math.atan2(b, a) * 180) / Math.PI;
  }
}
