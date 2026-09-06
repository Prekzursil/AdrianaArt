import { AdminProductsComponent } from './admin-products.component';

/** Golden WU products-wizard-current-step-id — wizardCurrentStepId. */
describe('AdminProductsComponent wizardCurrentStepId (golden WU)', () => {
  function bare(current: any): AdminProductsComponent {
    const cmp = Object.create(AdminProductsComponent.prototype) as AdminProductsComponent;
    Object.assign(cmp as any, { wizardCurrent: () => current });
    return cmp;
  }

  it('returns current step id or null', () => {
    expect(bare(null).wizardCurrentStepId()).toBeNull();
    expect(bare({ id: 'basics' }).wizardCurrentStepId()).toBe('basics');
  });
});
