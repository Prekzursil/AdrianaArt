import { AdminProductsComponent } from './admin-products.component';

/** Golden WU products-success-saved-helpers. */
describe('AdminProductsComponent success/saved helpers (golden WU)', () => {
  function bare(overrides: Record<string, unknown> = {}): AdminProductsComponent {
    const cmp = Object.create(AdminProductsComponent.prototype) as AdminProductsComponent;
    Object.assign(cmp as any, {
      lastSavedState: () => null,
      form: { status: 'draft', is_active: false },
      ...overrides,
    });
    return cmp;
  }

  it('savedStatus prefers lastSavedState then form.status', () => {
    expect(bare().savedStatus()).toBe('draft');
    expect(
      bare({ lastSavedState: () => ({ status: 'published', isActive: true }) }).savedStatus(),
    ).toBe('published');
  });

  it('savedIsVisible requires published+active', () => {
    expect(bare().savedIsVisible()).toBe(false);
    expect(
      bare({
        lastSavedState: () => ({ status: 'published', isActive: true }),
      }).savedIsVisible(),
    ).toBe(true);
    expect(
      bare({
        lastSavedState: () => ({ status: 'published', isActive: false }),
      }).savedIsVisible(),
    ).toBe(false);
  });

  it('success label keys follow saved status/visibility', () => {
    const draft = bare();
    expect(draft.successStatusLabelKey()).toBe('adminUi.status.draft');
    expect(draft.successVisibilityLabelKey()).toBe('adminUi.products.successFeedback.hidden');
    const live = bare({
      lastSavedState: () => ({ status: 'published', isActive: true }),
    });
    expect(live.successStatusLabelKey()).toBe('adminUi.status.published');
    expect(live.successVisibilityLabelKey()).toBe('adminUi.products.successFeedback.visible');
  });
});
