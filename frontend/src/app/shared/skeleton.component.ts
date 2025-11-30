import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-skeleton',
  standalone: true,
  template: `
    <div
      [ngClass]="[shape === 'circle' ? 'rounded-full' : 'rounded-lg', 'bg-slate-200/70 animate-pulse']"
      [style.height]="height"
      [style.width]="width"
    ></div>
  `
})
export class SkeletonComponent {
  @Input() width = '100%';
  @Input() height = '1rem';
  @Input() shape: 'rect' | 'circle' = 'rect';
}
