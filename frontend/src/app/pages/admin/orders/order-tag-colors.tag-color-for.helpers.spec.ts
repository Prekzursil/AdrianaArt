import { tagColorFor } from './order-tag-colors';

/** Golden WU tag-color-for-fn -- tagColorFor. */
describe('tagColorFor (golden WU)', () => {
  it('prefers overrides then known semantic tags', () => {
    expect(tagColorFor('vip', { vip: 'teal' })).toBe('teal');
    expect(tagColorFor('vip', {})).toBe('violet');
    expect(tagColorFor('fraud_risk', {})).toBe('amber');
    expect(tagColorFor('', {})).toBe('slate');
  });
});
