import { isAllowedUrl } from './css-safe-encode';

/** Golden WU is-allowed-url-check -- isAllowedUrl. */
describe('isAllowedUrl (golden WU)', () => {
  it('allows relative and https targets; rejects http', () => {
    expect(isAllowedUrl('/fonts/x.woff2')).toBe(true);
    expect(isAllowedUrl('https://cdn.example.com/f.woff2')).toBe(true);
    expect(isAllowedUrl('http://cdn.example.com/f.woff2')).toBe(false);
  });
});
