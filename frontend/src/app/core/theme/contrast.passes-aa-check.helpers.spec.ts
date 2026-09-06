import { passesAa } from './contrast';

/** Golden WU passes-aa-check -- passesAa. */
describe('passesAa (golden WU)', () => {
  it('passes black-on-white large text and fails near-equal greys', () => {
    expect(passesAa([0, 0, 0], [255, 255, 255], 'large')).toBe(true);
    expect(passesAa([190, 190, 190], [200, 200, 200], 'large')).toBe(false);
  });
});
