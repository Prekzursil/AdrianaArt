import { CANVAS_BACKGROUNDS } from './pairing-matrix';

/** Golden WU canvas-backgrounds-pin -- CANVAS_BACKGROUNDS. */
describe('CANVAS_BACKGROUNDS (golden WU)', () => {
  it('pins the two gradient endpoints in order', () => {
    expect(CANVAS_BACKGROUNDS).toEqual(['--background', '--background-subtle']);
  });
});
