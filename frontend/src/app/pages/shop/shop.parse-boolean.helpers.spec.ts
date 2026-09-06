import { ShopComponent } from './shop.component';

describe('ShopComponent parseBoolean (golden WU)', () => {
  const parse = (raw: unknown) =>
    (Object.create(ShopComponent.prototype) as any).parseBoolean(raw);

  it('accepts bool/number/string/array truthy forms', () => {
    expect(parse(true)).toBe(true);
    expect(parse(false)).toBe(false);
    expect(parse(null)).toBe(false);
    expect(parse(1)).toBe(true);
    expect(parse(0)).toBe(false);
    expect(parse(' Yes ')).toBe(true);
    expect(parse('true')).toBe(true);
    expect(parse('1')).toBe(true);
    expect(parse('no')).toBe(false);
    expect(parse(['true'])).toBe(true);
    expect(parse({})).toBe(false);
  });
});
