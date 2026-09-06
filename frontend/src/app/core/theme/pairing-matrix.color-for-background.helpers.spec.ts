import { colorFor } from './pairing-matrix';

/** Golden WU color-for-background -- colorFor. */
describe('colorFor (golden WU)', () => {
  it('resolves --background to white RGB', () => {
    expect(colorFor('--background')).toEqual([255, 255, 255]);
    expect(colorFor('--surface-inverse')).toEqual([15, 23, 42]);
  });
});
