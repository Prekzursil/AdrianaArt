import { AdminProductsImageManagerComponent } from './admin-products-image-manager.component';

/** Golden WU products-format-bytes-helpers. */
describe('AdminProductsImageManagerComponent formatBytes (golden WU)', () => {
  function bare(): AdminProductsImageManagerComponent {
    return Object.create(AdminProductsImageManagerComponent.prototype) as AdminProductsImageManagerComponent;
  }

  it('formatBytes handles null/finite and unit steps', () => {
    const cmp = bare();
    expect(cmp.formatBytes(null)).toBe('—');
    expect(cmp.formatBytes(undefined)).toBe('—');
    expect(cmp.formatBytes(Number.NaN)).toBe('—');
    expect(cmp.formatBytes(512)).toBe('512 B');
    expect(cmp.formatBytes(2048)).toBe('2 KB');
    expect(cmp.formatBytes(1048576)).toBe('1 MB');
  });
});
