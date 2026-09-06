import { normalizeTagKey } from './order-tag-colors';

/** Golden WU normalize-tag-key-fn -- normalizeTagKey. */
describe('normalizeTagKey (golden WU)', () => {
  it('lowercases, collapses spaces, and strips junk', () => {
    expect(normalizeTagKey('  VIP Guest!  ')).toBe('vip_guest');
    expect(normalizeTagKey('')).toBe('');
  });
});
