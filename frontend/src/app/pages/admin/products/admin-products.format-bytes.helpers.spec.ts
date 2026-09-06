import { AdminProductsComponent } from './admin-products.component';

describe('AdminProductsComponent formatBytes (golden WU)', () => {
  it('formats null/non-finite and unit thresholds', () => {
    const cmp = Object.create(AdminProductsComponent.prototype) as AdminProductsComponent;
    expect(cmp.formatBytes(null)).toBe('—');
    expect(cmp.formatBytes(undefined)).toBe('—');
    expect(cmp.formatBytes(Number.NaN)).toBe('—');
    expect(cmp.formatBytes(0)).toBe('0 B');
    expect(cmp.formatBytes(512)).toBe('512 B');
    expect(cmp.formatBytes(1024)).toBe('1 KB');
    expect(cmp.formatBytes(1536)).toBe('1.5 KB');
    expect(cmp.formatBytes(1024 * 1024)).toBe('1 MB');
    expect(cmp.formatBytes(1024 * 1024 * 1024)).toBe('1 GB');
  });
});
