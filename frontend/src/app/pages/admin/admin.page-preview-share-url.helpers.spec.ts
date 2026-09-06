import { AdminComponent } from './admin.component';

/** Golden WU admin-page-preview-share-url — pagePreviewShareUrl. */
describe('AdminComponent pagePreviewShareUrl (golden WU)', () => {
  it('returns null without token/expiry; else builds share URL', () => {
    const cmp = Object.create(AdminComponent.prototype) as AdminComponent;
    (cmp as any).pagePreviewToken = null;
    (cmp as any).pagePreviewExpiresAt = null;
    expect(cmp.pagePreviewShareUrl('about')).toBeNull();
    (cmp as any).pagePreviewToken = 'tok';
    (cmp as any).pagePreviewExpiresAt = '2099-01-01T00:00:00Z';
    (cmp as any).pagePreviewForSlug = 'about';
    const url = cmp.pagePreviewShareUrl('about');
    expect(url).toContain('/pages/about');
    expect(url).toContain('preview=tok');
  });
});
