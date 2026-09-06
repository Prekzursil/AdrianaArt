import { AdminOpsComponent } from './admin-ops.component';

/** Golden WU ops-select-banner-helpers. */
describe('AdminOpsComponent banner helpers (golden WU)', () => {
  function bare(): AdminOpsComponent {
    const cmp = Object.create(AdminOpsComponent.prototype) as AdminOpsComponent;
    Object.assign(cmp as any, {
      toLocalInput: (v: string) => `local:${v}`,
      nowLocalInput: () => 'now',
      editingBannerId: null,
      bannerIsActive: true,
      bannerLevel: 'info',
      bannerStartsAtLocal: '',
      bannerEndsAtLocal: '',
      bannerMessageEn: '',
      bannerMessageRo: '',
      bannerLinkUrl: '',
      bannerLinkLabelEn: '',
      bannerLinkLabelRo: '',
    });
    return cmp;
  }

  it('selectBanner copies banner fields', () => {
    const cmp = bare();
    cmp.selectBanner({
      id: 'b1',
      is_active: false,
      level: 'warn',
      starts_at: 's',
      ends_at: 'e',
      message_en: 'en',
      message_ro: 'ro',
      link_url: 'u',
      link_label_en: 'le',
      link_label_ro: 'lr',
    } as any);
    expect((cmp as any).editingBannerId).toBe('b1');
    expect((cmp as any).bannerLevel).toBe('warn');
    expect((cmp as any).bannerStartsAtLocal).toBe('local:s');
    expect((cmp as any).bannerEndsAtLocal).toBe('local:e');
  });

  it('resetBannerForm clears edit state', () => {
    const cmp = bare();
    (cmp as any).editingBannerId = 'x';
    cmp.resetBannerForm();
    expect((cmp as any).editingBannerId).toBeNull();
    expect((cmp as any).bannerIsActive).toBe(true);
    expect((cmp as any).bannerStartsAtLocal).toBe('now');
  });
});
