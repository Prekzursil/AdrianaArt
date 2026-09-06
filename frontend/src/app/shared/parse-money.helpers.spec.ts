import { parseMoney } from './money';

describe('parseMoney (golden WU)', () => {
  it('parses finite numbers/strings/bigints; else 0', () => {
    expect(parseMoney(12.5)).toBe(12.5);
    expect(parseMoney(Number.NaN)).toBe(0);
    expect(parseMoney(' 3.25 ')).toBe(3.25);
    expect(parseMoney('nope')).toBe(0);
    expect(parseMoney(10n)).toBe(10);
    expect(parseMoney(null)).toBe(0);
    expect(parseMoney(undefined)).toBe(0);
    expect(parseMoney({})).toBe(0);
  });
});
