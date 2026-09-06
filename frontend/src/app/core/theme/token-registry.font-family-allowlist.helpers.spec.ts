import { FONT_FAMILY_ALLOWLIST } from './token-registry';

/** Golden WU font-family-allowlist -- FONT_FAMILY_ALLOWLIST. */
describe('FONT_FAMILY_ALLOWLIST (golden WU)', () => {
  it('curates five Inter/Cinzel/system stacks', () => {
    expect(FONT_FAMILY_ALLOWLIST.length).toBe(5);
    expect(FONT_FAMILY_ALLOWLIST[0]).toContain('Inter');
    expect(FONT_FAMILY_ALLOWLIST[1]).toContain('Cinzel');
    expect(FONT_FAMILY_ALLOWLIST.some((f) => f.includes('monospace'))).toBe(true);
  });
});
