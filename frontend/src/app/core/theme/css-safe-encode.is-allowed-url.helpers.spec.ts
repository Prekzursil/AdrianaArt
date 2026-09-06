import { isAllowedUrl } from './css-safe-encode';

/** Golden WU is-allowed-url — isAllowedUrl. */
describe('isAllowedUrl (golden WU)', () => {
  it('allows https and rejects javascript/data', () => {
    expect(isAllowedUrl('https://cdn.example/x.png')).toBe(true);
    expect(isAllowedUrl('http://cdn.example/x.png')).toBe(true);
    expect(isAllowedUrl('javascript:alert(1)')).toBe(false);
    expect(isAllowedUrl('data:text/html,hi')).toBe(false);
  });
});
