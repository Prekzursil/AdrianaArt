import { persistTagColorOverrides, TAG_COLOR_STORAGE_KEY } from './order-tag-colors';

describe('persistTagColorOverrides (golden WU)', () => {
  afterEach(() => localStorage.removeItem(TAG_COLOR_STORAGE_KEY));

  it('writes overrides JSON to localStorage', () => {
    persistTagColorOverrides({ gift: 'indigo' });
    expect(JSON.parse(localStorage.getItem(TAG_COLOR_STORAGE_KEY)!)).toEqual({ gift: 'indigo' });
    persistTagColorOverrides(null as any);
    expect(JSON.parse(localStorage.getItem(TAG_COLOR_STORAGE_KEY)!)).toEqual({});
  });
});
