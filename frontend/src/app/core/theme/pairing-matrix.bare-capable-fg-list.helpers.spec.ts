import { BARE_CAPABLE_FOREGROUNDS, ON_COLORS } from './pairing-matrix';

/** Golden WU bare-capable-fg-list -- BARE_CAPABLE_FOREGROUNDS. */
describe('BARE_CAPABLE_FOREGROUNDS (golden WU)', () => {
  it('includes --text and excludes on-colours', () => {
    expect(BARE_CAPABLE_FOREGROUNDS).toContain('--text');
    for (const name of ON_COLORS) {
      expect(BARE_CAPABLE_FOREGROUNDS).not.toContain(name);
    }
  });
});
