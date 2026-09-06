import { encodeCssSafe } from './css-safe-encode';

/** Golden WU encode-css-safe-fn -- encodeCssSafe. */
describe('encodeCssSafe (golden WU)', () => {
  it('accepts clean triplets and rejects style breakouts', () => {
    expect(encodeCssSafe('15 23 42').ok).toBe(true);
    expect(encodeCssSafe('</style>').ok).toBe(false);
  });
});
