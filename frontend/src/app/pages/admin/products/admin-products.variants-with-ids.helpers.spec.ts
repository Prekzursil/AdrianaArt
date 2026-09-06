import { signal } from '@angular/core';
import { AdminProductsComponent } from './admin-products.component';

/** Golden WU products-variants-with-ids — variantsWithIds. */
describe('AdminProductsComponent variantsWithIds (golden WU)', () => {
  function bare(rows: any[]): AdminProductsComponent {
    const cmp = Object.create(AdminProductsComponent.prototype) as AdminProductsComponent;
    Object.assign(cmp as any, { variants: signal(rows) });
    return cmp;
  }

  it('keeps only rows with truthy ids', () => {
    const rows = [{ id: 'a' }, { id: '' }, { id: null }, { id: 'b' }];
    expect(bare(rows).variantsWithIds()).toEqual([{ id: 'a' }, { id: 'b' }]);
  });
});
