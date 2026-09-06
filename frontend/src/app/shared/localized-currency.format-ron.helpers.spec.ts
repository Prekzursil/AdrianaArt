import { LocalizedCurrencyPipe } from './localized-currency.pipe';

/** Golden WU localized-currency-format-ron — formatRon. */
describe('LocalizedCurrencyPipe formatRon (golden WU)', () => {
  it('formats finite RON amounts with two decimals', () => {
    const pipe = Object.create(LocalizedCurrencyPipe.prototype) as LocalizedCurrencyPipe;
    expect((pipe as any).formatRon(12.5)).toBe('12.50 RON');
    expect((pipe as any).formatRon(Number.NaN)).toBe('0.00 RON');
  });
});
