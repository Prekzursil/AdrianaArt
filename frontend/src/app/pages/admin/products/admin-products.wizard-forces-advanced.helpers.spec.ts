import { AdminProductsComponent } from './admin-products.component';

/** Golden WU products-wizard-forces-advanced — wizardForcesAdvancedOpen. */
describe('AdminProductsComponent wizardForcesAdvancedOpen (golden WU)', () => {
  it('true only on publish step when wizard active', () => {
    const cmp = Object.create(AdminProductsComponent.prototype) as AdminProductsComponent;
    (cmp as any).wizardKind = () => null;
    (cmp as any).wizardCurrentStepId = () => 'publish';
    expect(cmp.wizardForcesAdvancedOpen()).toBe(false);
    (cmp as any).wizardKind = () => 'simple';
    (cmp as any).wizardCurrentStepId = () => 'basics';
    expect(cmp.wizardForcesAdvancedOpen()).toBe(false);
    (cmp as any).wizardCurrentStepId = () => 'publish';
    expect(cmp.wizardForcesAdvancedOpen()).toBe(true);
  });
});
