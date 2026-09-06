import { LockerPickerComponent } from './locker-picker.component';

/** Golden WU locker-picker-clear-search-query — clearSearchQuery. */
describe('LockerPickerComponent clearSearchQuery (golden WU)', () => {
  it('resets search fields and aborts in-flight search', () => {
    const cmp = Object.create(LockerPickerComponent.prototype) as LockerPickerComponent;
    const abort = { abort: jasmine.createSpy('abort') };
    Object.assign(cmp as any, {
      searchQuery: 'bucharest',
      searchResults: [{ id: '1' }],
      searchError: 'err',
      searchLoading: true,
      searchAbort: abort,
    });
    cmp.clearSearchQuery();
    expect((cmp as any).searchQuery).toBe('');
    expect((cmp as any).searchResults).toEqual([]);
    expect((cmp as any).searchError).toBe('');
    expect((cmp as any).searchLoading).toBe(false);
    expect(abort.abort).toHaveBeenCalled();
  });
});
