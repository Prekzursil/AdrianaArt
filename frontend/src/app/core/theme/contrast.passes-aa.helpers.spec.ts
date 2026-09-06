import { passesAa } from './contrast';

/** Golden WU passes-aa -- passesAa. */
describe('passesAa (golden WU)', () => {
  it('black on white passes body AA; near-white on white fails', () => {
    expect(passesAa([0, 0, 0], [255, 255, 255], 'body')).toBe(true);
    expect(passesAa([250, 250, 250], [255, 255, 255], 'body')).toBe(false);
    expect(passesAa([255, 255, 255], [0, 0, 0], 'large')).toBe(true);
  });
});
