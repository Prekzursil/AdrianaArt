import { AdminOpsComponent } from './admin-ops.component';

/** Golden WU ops-reset-banner-form -- resetBannerForm. */
describe('AdminOpsComponent resetBannerForm (golden WU)', () => {
  it('resets banner fields and seeds startsAt from nowLocalInput', () => {
    const cmp = Object.create(AdminOpsComponent.prototype) as AdminOpsComponent;
    Object.assign(cmp as any, {
      editingBannerId: 'b1',
      bannerIsActive: false,
      bannerLevel: 'warn',
      bannerStartsAtLocal: 'old',
      bannerEndsAtLocal: 'end',
      bannerMessageEn: 'en',
      bannerMessageRo: 'ro',
      bannerLinkUrl: 'u',
      bannerLinkLabelEn: 'le',
      bannerLinkLabelRo: 'lr',
      nowLocalInput: jasmine.createSpy('nowLocalInput').and.returnValue('2026-01-01T00:00'),
    });
    cmp.resetBannerForm();
    expect((cmp as any).editingBannerId).toBeNull();
    expect((cmp as any).bannerIsActive).toBe(true);
    expect((cmp as any).bannerLevel).toBe('info');
    expect((cmp as any).bannerStartsAtLocal).toBe('2026-01-01T00:00');
    expect((cmp as any).bannerEndsAtLocal).toBe('');
    expect((cmp as any).bannerMessageEn).toBe('');
    expect((cmp as any).bannerMessageRo).toBe('');
    expect((cmp as any).bannerLinkUrl).toBe('');
    expect((cmp as any).bannerLinkLabelEn).toBe('');
    expect((cmp as any).bannerLinkLabelRo).toBe('');
  });
});
