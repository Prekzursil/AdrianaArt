import { passesAa } from './contrast';

/** Golden WU passes-aa-body -- passesAa. */
describe('passesAa (golden WU)', () => {
  it('passes black-on-white body text and fails near-equal greys', () => {
    expect(passesAa([15, 23, 42], [255, 255, 255], 'body')).toBe(true);
    expect(passesAa([200, 200, 200], [210, 210, 210], 'body')).toBe(false);
  });
});
