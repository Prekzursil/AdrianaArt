import { AdminProductsComponent } from './admin-products.component';

/** Golden WU admin-products-go-to-wizard-step -- goToWizardStep. */
describe('AdminProductsComponent goToWizardStep (golden WU)', () => {
  it('returns early when wizard steps are empty', () => {
    const cmp = Object.create(AdminProductsComponent.prototype) as AdminProductsComponent;
    Object.assign(cmp as any, {
      wizardSteps: jasmine.createSpy('steps').and.returnValue([]),
      wizardStep: { set: jasmine.createSpy('set') },
      scrollToWizardAnchor: jasmine.createSpy('scroll'),
    });
    cmp.goToWizardStep(0);
    expect((cmp as any).wizardStep.set).not.toHaveBeenCalled();
  });
});
