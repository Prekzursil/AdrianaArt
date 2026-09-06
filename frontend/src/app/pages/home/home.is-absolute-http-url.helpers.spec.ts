import { HomeComponent } from './home.component';

/** Golden WU home-is-absolute-http-url — isExternalHttpUrl. */
describe('HomeComponent isExternalHttpUrl (golden WU)', () => {
  it('detects http(s) absolute URLs', () => {
    const cmp = Object.create(HomeComponent.prototype) as HomeComponent;
    expect(cmp.isExternalHttpUrl(null)).toBe(false);
    expect(cmp.isExternalHttpUrl('/relative')).toBe(false);
    expect(cmp.isExternalHttpUrl(' HTTPS://Example.com ')).toBe(true);
    expect(cmp.isExternalHttpUrl('http://x.test')).toBe(true);
  });
});
