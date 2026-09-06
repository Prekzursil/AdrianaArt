import { BARE_CAPABLE_FOREGROUNDS } from './pairing-matrix';

/** Golden WU bare-capable-foregrounds -- BARE_CAPABLE_FOREGROUNDS. */
describe('BARE_CAPABLE_FOREGROUNDS (golden WU)', () => {
  it('includes core text/accent foregrounds', () => {
    expect(BARE_CAPABLE_FOREGROUNDS.length).toBeGreaterThan(0);
    expect(BARE_CAPABLE_FOREGROUNDS).toContain('--text');
    expect(BARE_CAPABLE_FOREGROUNDS).toContain('--accent');
    expect(BARE_CAPABLE_FOREGROUNDS.every((n) => n.startsWith('--'))).toBe(true);
  });
});
