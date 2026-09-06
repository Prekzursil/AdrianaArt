import { AdminProductsComponent } from './admin-products.component';

/** Golden WU products-format-bytes — formatBytes. */
describe('AdminProductsComponent formatBytes (golden WU)', () => {
  function createCmp() {
    return Object.create(AdminProductsComponent.prototype) as AdminProductsComponent;
  }

  it('formats bytes with unit ladder', () => {
    const cmp = createCmp();
    expect(cmp.formatBytes(null)).toBe('—');
    expect(cmp.formatBytes(undefined)).toBe('—');
    expect(cmp.formatBytes(Number.NaN)).toBe('—');
    expect(cmp.formatBytes(512)).toBe('512 B');
    expect(cmp.formatBytes(2048)).toBe('2 KB');
    expect(cmp.formatBytes(1536)).toBe('1.5 KB');
    expect(cmp.formatBytes(1048576)).toBe('1 MB');
  });
});
