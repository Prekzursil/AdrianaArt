import { RENDER_PAIRINGS } from './pairing-matrix';

/** Golden WU render-pairings -- RENDER_PAIRINGS. */
describe('RENDER_PAIRINGS (golden WU)', () => {
  it('starts with text-on-background body render pair', () => {
    expect(RENDER_PAIRINGS[0]).toEqual({
      id: 'text-on-background',
      foreground: '--text',
      background: '--background',
      size: 'body',
    });
    expect(RENDER_PAIRINGS.length).toBeGreaterThan(10);
  });
});
