import { AdminComponent } from './admin.component';

/** Golden WU admin-is-custom-home-block — isCustomHomeBlock. */
describe('AdminComponent isCustomHomeBlock (golden WU)', () => {
  it('returns true for custom block types and false otherwise', () => {
    const cmp = Object.create(AdminComponent.prototype) as AdminComponent;
    for (const type of [
      'text',
      'columns',
      'cta',
      'faq',
      'testimonials',
      'product_grid',
      'form',
      'image',
      'gallery',
      'banner',
      'carousel',
    ]) {
      expect(cmp.isCustomHomeBlock({ type } as any)).toBe(true);
    }
    expect(cmp.isCustomHomeBlock({ type: 'hero' } as any)).toBe(false);
    expect(cmp.isCustomHomeBlock({ type: 'story' } as any)).toBe(false);
  });
});
