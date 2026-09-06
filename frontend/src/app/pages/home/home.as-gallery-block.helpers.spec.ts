import { HomeComponent } from './home.component';

/** Golden WU home-as-gallery-block — asGalleryBlock. */
describe('HomeComponent asGalleryBlock (golden WU)', () => {
  it('returns gallery blocks only', () => {
    const cmp = Object.create(HomeComponent.prototype) as HomeComponent;
    const gallery = { type: 'gallery', images: [] } as any;
    expect(cmp.asGalleryBlock(gallery)).toBe(gallery);
    expect(cmp.asGalleryBlock({ type: 'text' } as any)).toBeNull();
  });
});
