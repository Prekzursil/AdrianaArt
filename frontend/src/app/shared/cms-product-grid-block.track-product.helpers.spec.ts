import { CmsProductGridBlockComponent } from './cms-product-grid-block.component';

/** Golden WU cms-product-grid-track-product — trackProduct. */
describe('CmsProductGridBlockComponent trackProduct (golden WU)', () => {
  it('prefers id then slug then index', () => {
    const cmp = Object.create(CmsProductGridBlockComponent.prototype) as CmsProductGridBlockComponent;
    expect(cmp.trackProduct(0, { id: 'p1', slug: 's1' } as any)).toBe('p1');
    expect(cmp.trackProduct(4, { id: '', slug: 's4' } as any)).toBe('s4');
    expect(cmp.trackProduct(7, { id: '', slug: '' } as any)).toBe('7');
  });
});
