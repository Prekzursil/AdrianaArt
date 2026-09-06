import { TAG_COLOR_STORAGE_KEY, persistTagColorOverrides } from './order-tag-colors';

/** Golden WU persist-tag-color-overrides-fn -- persistTagColorOverrides. */
describe('persistTagColorOverrides (golden WU)', () => {
  afterEach(() => localStorage.clear());

  it('writes overrides JSON under TAG_COLOR_STORAGE_KEY', () => {
    persistTagColorOverrides({ vip: 'violet' });
    expect(localStorage.getItem(TAG_COLOR_STORAGE_KEY)).toBe(
      JSON.stringify({ vip: 'violet' }),
    );
  });
});
