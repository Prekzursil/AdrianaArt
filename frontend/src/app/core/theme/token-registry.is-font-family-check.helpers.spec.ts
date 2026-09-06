import { FONT_FAMILY_ALLOWLIST, isFontFamily } from './token-registry';

/** Golden WU is-font-family-check -- isFontFamily. */
describe('isFontFamily (golden WU)', () => {
  it('accepts only exact allowlist members', () => {
    expect(isFontFamily(FONT_FAMILY_ALLOWLIST[0])).toBe(true);
    expect(isFontFamily('Inter')).toBe(false);
    expect(isFontFamily('Comic Sans MS')).toBe(false);
  });
});
