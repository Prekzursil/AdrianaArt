import { AdminLayoutComponent } from './admin-layout.component';

/** Golden WU layout-is-training-mode — isTrainingMode. */
describe('AdminLayoutComponent isTrainingMode (golden WU)', () => {
  function bare(user: any): AdminLayoutComponent {
    const cmp = Object.create(AdminLayoutComponent.prototype) as AdminLayoutComponent;
    Object.assign(cmp as any, { auth: { user: () => user } });
    return cmp;
  }

  it('is true only when admin_training_mode is set', () => {
    expect(bare(null).isTrainingMode()).toBe(false);
    expect(bare({ admin_training_mode: false }).isTrainingMode()).toBe(false);
    expect(bare({ admin_training_mode: true }).isTrainingMode()).toBe(true);
  });
});
