import { isAllowedUrl } from './css-safe-encode';

/** Golden WU is-allowed-url — isAllowedUrl. */
describe('isAllowedUrl (golden WU)', () => {
  it('allows https and scheme-less paths; rejects non-https schemes', () => {
    expect(isAllowedUrl('https://cdn.example/x.png')).toBe(true);
    expect(isAllowedUrl('/relative/path.png')).toBe(true);
    expect(isAllowedUrl('http://cdn.example/x.png')).toBe(false);
    expect(isAllowedUrl('javascript:alert(1)')).toBe(false);
    expect(isAllowedUrl('data:text/html,hi')).toBe(false);
    expect(isAllowedUrl('')).toBe(false);
  });
});
