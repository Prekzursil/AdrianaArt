import { CANVAS_BACKGROUNDS } from './pairing-matrix';

/** Golden WU canvas-backgrounds -- CANVAS_BACKGROUNDS. */
describe('CANVAS_BACKGROUNDS (golden WU)', () => {
  it('lists page canvas token names', () => {
    expect(CANVAS_BACKGROUNDS).toEqual(['--background', '--background-subtle']);
  });
});
