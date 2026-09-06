import { ProductImageManagerModalComponent } from './product-image-manager-modal.component';

/** Golden WU product-image-manager-modal-can-reorder — canReorder. */
describe('ProductImageManagerModalComponent canReorder (golden WU)', () => {
  it('requires slug, >1 images with ids, and not saving', () => {
    const cmp = Object.create(ProductImageManagerModalComponent.prototype) as ProductImageManagerModalComponent;
    Object.assign(cmp as any, {
      orderSaving: false,
      slug: 'p1',
      draftImages: [{ id: 'a' }, { id: 'b' }],
    });
    expect(cmp.canReorder()).toBe(true);
    Object.assign(cmp as any, { orderSaving: true });
    expect(cmp.canReorder()).toBe(false);
    Object.assign(cmp as any, { orderSaving: false, slug: '  ' });
    expect(cmp.canReorder()).toBe(false);
    Object.assign(cmp as any, { slug: 'p1', draftImages: [{ id: 'a' }] });
    expect(cmp.canReorder()).toBe(false);
    Object.assign(cmp as any, { draftImages: [{ id: 'a' }, { id: '' }] });
    expect(cmp.canReorder()).toBe(false);
  });
});
