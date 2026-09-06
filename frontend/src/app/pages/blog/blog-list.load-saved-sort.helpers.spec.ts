import { BlogListComponent } from './blog-list.component';

/** Golden WU blog-list-load-saved-sort -- loadSavedSort. */
describe('BlogListComponent loadSavedSort (golden WU)', () => {
  it('returns null without localStorage and normalizes stored sort', () => {
    const cmp = Object.create(BlogListComponent.prototype) as BlogListComponent;
    Object.assign(cmp as any, {
      document: { defaultView: null },
      normalizeSort: jasmine.createSpy('normalizeSort').and.returnValue('oldest'),
    });
    expect((cmp as any).loadSavedSort()).toBeNull();

    (cmp as any).document = {
      defaultView: { localStorage: { getItem: () => 'oldest' } },
    };
    expect((cmp as any).loadSavedSort()).toBe('oldest');
    expect((cmp as any).normalizeSort).toHaveBeenCalledWith('oldest');
  });
});
