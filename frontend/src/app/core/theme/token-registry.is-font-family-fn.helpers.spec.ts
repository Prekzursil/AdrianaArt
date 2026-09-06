import { FONT_FAMILY_ALLOWLIST, isFontFamily } from './token-registry';

/** Golden WU is-font-family-fn -- isFontFamily. */
describe('isFontFamily (golden WU)', () => {
  it('accepts allowlisted stacks and rejects bare Inter', () => {
    expect(isFontFamily(FONT_FAMILY_ALLOWLIST[0])).toBe(true);
    expect(isFontFamily('Inter')).toBe(false);
  });
});
