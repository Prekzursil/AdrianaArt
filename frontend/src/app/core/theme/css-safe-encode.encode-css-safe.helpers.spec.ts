import { encodeCssSafe } from './css-safe-encode';

/** Golden WU encode-css-safe — encodeCssSafe. */
describe('encodeCssSafe (golden WU)', () => {
  it('accepts plain values and rejects breakouts', () => {
    expect(encodeCssSafe('12px')).toEqual({ ok: true, value: '12px' });
    expect(encodeCssSafe('a; color: red')).toEqual({ ok: false, value: '' });
    expect(encodeCssSafe('expression(alert(1))')).toEqual({ ok: false, value: '' });
    expect(encodeCssSafe('url(https://x.test)')).toEqual({ ok: false, value: '' });
  });
});
