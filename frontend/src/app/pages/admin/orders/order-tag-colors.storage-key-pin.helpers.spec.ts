import { TAG_COLOR_STORAGE_KEY } from './order-tag-colors';

/** Golden WU tag-color-storage-key-pin -- TAG_COLOR_STORAGE_KEY. */
describe('TAG_COLOR_STORAGE_KEY (golden WU)', () => {
  it('pins the v1 localStorage key for order tag colours', () => {
    expect(TAG_COLOR_STORAGE_KEY).toBe('admin.orders.tagColors.v1');
  });
});
