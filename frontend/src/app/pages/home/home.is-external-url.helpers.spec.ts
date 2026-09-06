import { HomeComponent } from './home.component';

/** Golden WU home-is-external-url-helpers. */
describe('HomeComponent isExternalHttpUrl (golden WU)', () => {
  function bare(): HomeComponent {
    return Object.create(HomeComponent.prototype) as HomeComponent;
  }

  it('isExternalHttpUrl detects http(s) only', () => {
    const cmp = bare();
    expect(cmp.isExternalHttpUrl(null)).toBe(false);
    expect(cmp.isExternalHttpUrl('/path')).toBe(false);
    expect(cmp.isExternalHttpUrl('http://x')).toBe(true);
    expect(cmp.isExternalHttpUrl(' HTTPS://Y ')).toBe(true);
  });
});
