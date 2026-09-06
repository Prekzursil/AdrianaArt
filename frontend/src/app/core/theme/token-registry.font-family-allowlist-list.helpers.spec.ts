import { FONT_FAMILY_ALLOWLIST } from './token-registry';

/** Golden WU font-family-allowlist-list -- FONT_FAMILY_ALLOWLIST. */
describe('FONT_FAMILY_ALLOWLIST (golden WU)', () => {
  it('includes Inter body and Cinzel heading stacks', () => {
    expect(FONT_FAMILY_ALLOWLIST.some((f) => f.startsWith('Inter'))).toBe(true);
    expect(FONT_FAMILY_ALLOWLIST.some((f) => f.startsWith('Cinzel'))).toBe(true);
  });
});
