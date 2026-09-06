import { signal } from '@angular/core';
import { AdminSupportComponent } from './admin-support.component';

/** Golden WU support-toggle-templates — toggleTemplates. */
describe('AdminSupportComponent toggleTemplates (golden WU)', () => {
  it('flips showTemplates signal', () => {
    const cmp = Object.create(AdminSupportComponent.prototype) as AdminSupportComponent;
    const show = signal(false);
    Object.assign(cmp as any, { showTemplates: show });
    cmp.toggleTemplates();
    expect(show()).toBe(true);
    cmp.toggleTemplates();
    expect(show()).toBe(false);
  });
});
