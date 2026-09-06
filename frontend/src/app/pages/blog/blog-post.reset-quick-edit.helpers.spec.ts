import { BlogPostComponent } from './blog-post.component';

/** Golden WU blog-post-reset-quick-edit -- resetQuickEdit. */
describe('BlogPostComponent resetQuickEdit (golden WU)', () => {
  it('clears error and rehydrates quick-edit state', () => {
    const cmp = Object.create(BlogPostComponent.prototype) as BlogPostComponent;
    Object.assign(cmp as any, {
      quickEditError: { set: jasmine.createSpy('errSet') },
      hydrateQuickEditFromState: jasmine.createSpy('hydrate'),
    });
    cmp.resetQuickEdit();
    expect((cmp as any).quickEditError.set).toHaveBeenCalledWith('');
    expect((cmp as any).hydrateQuickEditFromState).toHaveBeenCalled();
  });
});
