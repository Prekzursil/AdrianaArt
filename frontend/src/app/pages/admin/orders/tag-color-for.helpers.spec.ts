import { tagColorFor } from './order-tag-colors';

describe('tagColorFor (golden WU)', () => {
  it('prefers overrides then known defaults', () => {
    expect(tagColorFor('vip', {})).toBe('violet');
    expect(tagColorFor('fraud_risk', {})).toBe('amber');
    expect(tagColorFor('gift', { gift: 'teal' })).toBe('teal');
    expect(tagColorFor('', {})).toBe('slate');
  });
});
