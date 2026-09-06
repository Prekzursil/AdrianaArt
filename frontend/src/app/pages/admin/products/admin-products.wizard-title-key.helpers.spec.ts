import { AdminProductsComponent } from './admin-products.component';

/** Golden WU — wizardTitleKey for publish vs create. */
describe('AdminProductsComponent wizardTitleKey (golden WU)', () => {
  function bare(kind: string): AdminProductsComponent {
    const cmp = Object.create(AdminProductsComponent.prototype) as AdminProductsComponent;
    (cmp as any).wizardKind = () => kind;
    return cmp;
  }

  it('returns publish or create title key', () => {
    expect(bare('publish').wizardTitleKey()).toBe('adminUi.products.wizard.publishTitle');
    expect(bare('create').wizardTitleKey()).toBe('adminUi.products.wizard.createTitle');
  });
});
