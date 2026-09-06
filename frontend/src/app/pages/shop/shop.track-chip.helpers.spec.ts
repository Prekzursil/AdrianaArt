import { ShopComponent } from './shop.component';

describe('ShopComponent trackChip (golden WU)', () => {
  it('returns the chip id for trackBy', () => {
    const cmp = Object.create(ShopComponent.prototype) as ShopComponent;
    expect(cmp.trackChip(0, { id: 'tag:clay' } as any)).toBe('tag:clay');
  });
});
