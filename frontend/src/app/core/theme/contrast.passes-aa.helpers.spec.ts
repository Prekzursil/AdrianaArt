import { passesAa } from './contrast';

/** Golden WU contrast-passes-aa — passesAa. */
describe('passesAa (golden WU)', () => {
  it('passes black-on-white for body text', () => {
    expect(passesAa([0, 0, 0], [255, 255, 255], 'body')).toBe(true);
    expect(passesAa([200, 200, 200], [255, 255, 255], 'body')).toBe(false);
  });
});
