import { HomeComponent } from './home.component';

describe('HomeComponent isExternalHttpUrl (golden WU)', () => {
  const cmp = Object.create(HomeComponent.prototype) as HomeComponent;

  it('true only for http(s) prefixes after trim/lower', () => {
    expect(cmp.isExternalHttpUrl('https://ex.com')).toBe(true);
    expect(cmp.isExternalHttpUrl(' HTTP://EX.COM ')).toBe(true);
    expect(cmp.isExternalHttpUrl('/relative')).toBe(false);
    expect(cmp.isExternalHttpUrl('ftp://x')).toBe(false);
    expect(cmp.isExternalHttpUrl(null)).toBe(false);
    expect(cmp.isExternalHttpUrl(undefined)).toBe(false);
    expect(cmp.isExternalHttpUrl('')).toBe(false);
  });
});
