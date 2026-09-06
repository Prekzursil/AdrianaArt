import { colorFor } from './pairing-matrix';

/** Golden WU color-for -- colorFor. */
describe('colorFor (golden WU)', () => {
  it('parses compiled-default colour tokens; rejects non-colours', () => {
    expect(colorFor('--accent')).toEqual([79, 70, 229]);
    expect(colorFor('--background')).toEqual([255, 255, 255]);
    expect(() => colorFor('--font-body')).toThrow();
  });
});
