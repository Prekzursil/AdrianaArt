import { AdminProductsComponent } from './admin-products.component';

/** Golden WU — wizardStepDescriptionKey with basics fallback. */
describe('AdminProductsComponent wizardStepDescriptionKey (golden WU)', () => {
  function bare(current: { descriptionKey?: string } | null): AdminProductsComponent {
    const cmp = Object.create(AdminProductsComponent.prototype) as AdminProductsComponent;
    (cmp as any).wizardCurrent = () => current;
    return cmp;
  }

  it('uses current step descriptionKey or basics fallback', () => {
    expect(bare({ descriptionKey: 'adminUi.products.wizard.desc.media' }).wizardStepDescriptionKey()).toBe(
      'adminUi.products.wizard.desc.media',
    );
    expect(bare(null).wizardStepDescriptionKey()).toBe('adminUi.products.wizard.desc.basics');
    expect(bare({}).wizardStepDescriptionKey()).toBe('adminUi.products.wizard.desc.basics');
  });
});
