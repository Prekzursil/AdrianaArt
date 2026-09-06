import { AdminLayoutComponent } from './admin-layout.component';

/** Golden WU admin-training-mode — isTrainingMode. */
describe('AdminLayoutComponent isTrainingMode (golden WU)', () => {
  function createCmp(user: { admin_training_mode?: boolean } | null) {
    const cmp = Object.create(AdminLayoutComponent.prototype) as AdminLayoutComponent;
    (cmp as any).auth = { user: () => user };
    return cmp;
  }

  it('is true only when admin_training_mode is set', () => {
    expect(createCmp(null).isTrainingMode()).toBe(false);
    expect(createCmp({}).isTrainingMode()).toBe(false);
    expect(createCmp({ admin_training_mode: false }).isTrainingMode()).toBe(false);
    expect(createCmp({ admin_training_mode: true }).isTrainingMode()).toBe(true);
  });
});
