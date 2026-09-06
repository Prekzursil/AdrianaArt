import { meetsAa } from './contrast';

/** Golden WU contrast-meets-aa — meetsAa. */
describe('meetsAa (golden WU)', () => {
  it('applies body/large thresholds inclusively', () => {
    expect(meetsAa(4.5, 'body')).toBe(true);
    expect(meetsAa(4.49, 'body')).toBe(false);
    expect(meetsAa(3, 'large')).toBe(true);
    expect(meetsAa(2.99, 'large')).toBe(false);
  });
});
