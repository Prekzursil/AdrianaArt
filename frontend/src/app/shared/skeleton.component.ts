import { Component, Input } from '@angular/core';
import { CommonModule, NgClass } from '@angular/common';

@Component({
  selector: 'app-skeleton',
  standalone: true,
  imports: [CommonModule, NgClass],
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
