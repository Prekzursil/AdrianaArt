import { AdminLayoutComponent } from './admin-layout.component';

/** Golden WU admin-layout-is-training-mode — isTrainingMode. */
describe('AdminLayoutComponent isTrainingMode (golden WU)', () => {
  it('reflects auth.user().admin_training_mode', () => {
    const cmp = Object.create(AdminLayoutComponent.prototype) as AdminLayoutComponent;
    (cmp as any).auth = { user: () => null };
    expect(cmp.isTrainingMode()).toBe(false);
    (cmp as any).auth = { user: () => ({ admin_training_mode: false }) };
    expect(cmp.isTrainingMode()).toBe(false);
    (cmp as any).auth = { user: () => ({ admin_training_mode: true }) };
    expect(cmp.isTrainingMode()).toBe(true);
  });
});
