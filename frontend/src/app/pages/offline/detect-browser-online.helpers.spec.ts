import { detectBrowserOnline } from './offline.helpers';

describe('detectBrowserOnline (golden WU)', () => {
  it('is optimistic when nav/onLine is missing; mirrors boolean otherwise', () => {
    expect(detectBrowserOnline(null)).toBe(true);
    expect(detectBrowserOnline({} as any)).toBe(true);
    expect(detectBrowserOnline({ onLine: true })).toBe(true);
    expect(detectBrowserOnline({ onLine: false })).toBe(false);
  });
});
