import { HomeComponent } from './home.component';

/** Golden WU — asTextBlock / asImageBlock / asGalleryBlock / asBannerBlock. */
describe('HomeComponent block cast helpers (golden WU)', () => {
  function bare(): HomeComponent {
    return Object.create(HomeComponent.prototype) as HomeComponent;
  }

  it('returns typed block only when type matches', () => {
    const cmp = bare();
    expect(cmp.asTextBlock({ type: 'text' } as any)?.type).toBe('text');
    expect(cmp.asTextBlock({ type: 'image' } as any)).toBeNull();
    expect(cmp.asImageBlock({ type: 'image' } as any)?.type).toBe('image');
    expect(cmp.asImageBlock({ type: 'text' } as any)).toBeNull();
    expect(cmp.asGalleryBlock({ type: 'gallery' } as any)?.type).toBe('gallery');
    expect(cmp.asGalleryBlock({ type: 'banner' } as any)).toBeNull();
    expect(cmp.asBannerBlock({ type: 'banner' } as any)?.type).toBe('banner');
    expect(cmp.asBannerBlock({ type: 'gallery' } as any)).toBeNull();
  });
});
