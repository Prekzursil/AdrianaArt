import { ShopComponent } from './shop.component';

describe('ShopComponent parsePrice (golden WU)', () => {
  const parse = (raw: unknown) =>
    (Object.create(ShopComponent.prototype) as any).parsePrice(raw);

  it('parses finite numbers/strings and rejects empty/invalid', () => {
    expect(parse(null)).toBeUndefined();
    expect(parse(undefined)).toBeUndefined();
    expect(parse(12.5)).toBe(12.5);
    expect(parse(Number.NaN)).toBeUndefined();
    expect(parse(' 9.99 ')).toBe(9.99);
    expect(parse('')).toBeUndefined();
    expect(parse('nope')).toBeUndefined();
    expect(parse({})).toBeUndefined();
  });
});
