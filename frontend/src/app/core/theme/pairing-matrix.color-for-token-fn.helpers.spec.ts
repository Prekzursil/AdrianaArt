import { colorFor } from './pairing-matrix';

/** Golden WU color-for-token-fn -- colorFor. */
describe('colorFor (golden WU)', () => {
  it('resolves --background white and rejects unknown names', () => {
    expect(colorFor('--background')).toEqual([255, 255, 255]);
    expect(() => colorFor('--not-a-token')).toThrow();
  });
});
