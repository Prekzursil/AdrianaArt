import { AdminProductsImageManagerComponent } from './admin-products-image-manager.component';

describe('AdminProductsImageManagerComponent formatBytes (golden WU)', () => {
  it('formats null/non-finite and unit thresholds', () => {
    const cmp = Object.create(
      AdminProductsImageManagerComponent.prototype,
    ) as AdminProductsImageManagerComponent;
    expect(cmp.formatBytes(null)).toBe('—');
    expect(cmp.formatBytes(1024)).toBe('1 KB');
    expect(cmp.formatBytes(1024 * 1024)).toBe('1 MB');
  });
});
