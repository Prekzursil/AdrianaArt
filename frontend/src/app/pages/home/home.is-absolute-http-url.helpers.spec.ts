import { HomeComponent } from './home.component';

/** Golden WU home-is-absolute-http-url — isAbsoluteHttpUrl. */
describe('HomeComponent isAbsoluteHttpUrl (golden WU)', () => {
  it('detects http(s) absolute URLs', () => {
    const cmp = Object.create(HomeComponent.prototype) as HomeComponent;
    expect(cmp.isAbsoluteHttpUrl(null)).toBe(false);
    expect(cmp.isAbsoluteHttpUrl('/relative')).toBe(false);
    expect(cmp.isAbsoluteHttpUrl(' HTTPS://Example.com ')).toBe(true);
    expect(cmp.isAbsoluteHttpUrl('http://x.test')).toBe(true);
  });
});
