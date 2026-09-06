import { FONT_FAMILY_ALLOWLIST, isFontFamily } from './token-registry';

/** Golden WU is-font-family -- isFontFamily. */
describe('isFontFamily (golden WU)', () => {
  it('accepts only curated allowlist members', () => {
    expect(isFontFamily(FONT_FAMILY_ALLOWLIST[0])).toBe(true);
    expect(isFontFamily('Comic Sans MS')).toBe(false);
  });
});
