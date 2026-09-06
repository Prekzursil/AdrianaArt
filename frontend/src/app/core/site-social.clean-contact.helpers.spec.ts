import { SiteSocialService } from './site-social.service';

/** Golden WU site-social-clean-contact — cleanContact. */
describe('SiteSocialService cleanContact (golden WU)', () => {
  it('returns null without phone/email; otherwise trims fields', () => {
    const svc = Object.create(SiteSocialService.prototype) as SiteSocialService;
    expect((svc as any).cleanContact(null)).toBeNull();
    expect((svc as any).cleanContact({})).toBeNull();
    expect((svc as any).cleanContact({ phone: ' 07 ', email: '  a@b  ' })).toEqual({
      phone: '07',
      email: 'a@b',
    });
    expect((svc as any).cleanContact({ phone: ' 07 ', email: '  ' })).toEqual({
      phone: '07',
      email: null,
    });
  });
});
