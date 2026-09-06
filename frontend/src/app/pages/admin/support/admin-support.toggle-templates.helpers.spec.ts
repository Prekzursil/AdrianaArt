import { AdminSupportComponent } from './admin-support.component';

/** Golden WU admin-support-toggle-templates -- toggleTemplates. */
describe('AdminSupportComponent toggleTemplates (golden WU)', () => {
  it('flips the showTemplates signal', () => {
    const cmp = Object.create(AdminSupportComponent.prototype) as AdminSupportComponent;
    let value = false;
    (cmp as any).showTemplates = Object.assign(() => value, {
      set: (next: boolean) => {
        value = next;
      },
    });
    cmp.toggleTemplates();
    expect((cmp as any).showTemplates()).toBe(true);
    cmp.toggleTemplates();
    expect((cmp as any).showTemplates()).toBe(false);
  });
});
