import { loadTagColorOverrides, TAG_COLOR_STORAGE_KEY } from './order-tag-colors';

describe('loadTagColorOverrides (golden WU)', () => {
  afterEach(() => localStorage.removeItem(TAG_COLOR_STORAGE_KEY));

  it('returns {} on miss/junk and keeps only valid palette colors', () => {
    expect(loadTagColorOverrides()).toEqual({});
    localStorage.setItem(TAG_COLOR_STORAGE_KEY, '{bad');
    expect(loadTagColorOverrides()).toEqual({});
    localStorage.setItem(
      TAG_COLOR_STORAGE_KEY,
      JSON.stringify({ ' VIP ': 'violet', nope: 'chartreuse', '': 'slate' }),
    );
    expect(loadTagColorOverrides()).toEqual({ vip: 'violet' });
  });
});
