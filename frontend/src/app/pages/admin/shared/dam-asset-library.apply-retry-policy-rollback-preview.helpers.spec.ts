import { DamAssetLibraryComponent } from './dam-asset-library.component';

/** Golden WU dam-asset-library-apply-retry-policy-rollback-preview -- applyRetryPolicyRollbackPreview. */
describe('DamAssetLibraryComponent applyRetryPolicyRollbackPreview (golden WU)', () => {
  it('invokes without throwing when dependencies are stubbed', () => {
    const cmp = Object.create(DamAssetLibraryComponent.prototype) as DamAssetLibraryComponent;
    Object.assign(cmp as any, {
      toast: { error: jasmine.createSpy('e'), success: jasmine.createSpy('s'), info: jasmine.createSpy('i') },
      t: (k: string) => k,
      translate: { instant: (k: string) => k },
      load: jasmine.createSpy('load'),
      save: jasmine.createSpy('save'),
      router: { navigate: jasmine.createSpy('nav') },
      cdr: { markForCheck: jasmine.createSpy('mfc') },
      draft: jasmine.createSpy('draft').and.returnValue(null),
      original: jasmine.createSpy('original').and.returnValue(null),
      selectedIds: jasmine.createSpy('selectedIds').and.returnValue(new Set()),
      items: jasmine.createSpy('items').and.returnValue([]),
      busy: jasmine.createSpy('busy').and.returnValue(false),
      loading: jasmine.createSpy('loading').and.returnValue(false),
    });
    expect(() => (cmp as any).applyRetryPolicyRollbackPreview()).not.toThrow();
  });
});
