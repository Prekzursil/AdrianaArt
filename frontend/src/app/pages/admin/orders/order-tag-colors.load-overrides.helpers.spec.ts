import { TAG_COLOR_STORAGE_KEY, loadTagColorOverrides } from './order-tag-colors';

/** Golden WU load-tag-color-overrides-fn -- loadTagColorOverrides. */
describe('loadTagColorOverrides (golden WU)', () => {
  afterEach(() => localStorage.clear());

  it('returns empty when storage missing and filters invalid colours', () => {
    expect(loadTagColorOverrides()).toEqual({});
    localStorage.setItem(
      TAG_COLOR_STORAGE_KEY,
      JSON.stringify({ vip: 'violet', bad: 'neon', 'X Y': 'rose' }),
    );
    expect(loadTagColorOverrides()).toEqual({ vip: 'violet', x_y: 'rose' });
  });
});
