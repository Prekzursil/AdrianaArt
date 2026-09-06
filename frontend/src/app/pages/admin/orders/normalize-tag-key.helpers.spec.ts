import { normalizeTagKey } from './order-tag-colors';

describe('normalizeTagKey (golden WU)', () => {
  it('trims, lowercases, collapses spaces, strips junk', () => {
    expect(normalizeTagKey('  VIP Gift!! ')).toBe('vip_gift');
    expect(normalizeTagKey('')).toBe('');
    expect(normalizeTagKey('___')).toBe('');
  });
});
