import { AboutComponent } from './about.component';

/** Golden WU about-focal-edit — focalPosition/canEditPage/editPage. */
describe('AboutComponent focal/edit helpers (golden WU)', () => {
  function createCmp(overrides: Record<string, unknown> = {}) {
    const cmp = Object.create(AboutComponent.prototype) as AboutComponent;
    (cmp as any).storefrontAdminMode = { enabled: () => false };
    (cmp as any).router = { navigate: jasmine.createSpy('navigate') };
    Object.assign(cmp as any, overrides);
    return cmp;
  }

  it('focalPosition clamps and defaults to 50/50', () => {
    const cmp = createCmp();
    expect(cmp.focalPosition()).toBe('50% 50%');
    expect(cmp.focalPosition(12, 88)).toBe('12% 88%');
    expect(cmp.focalPosition(-1, 200)).toBe('0% 100%');
  });

  it('canEditPage mirrors storefrontAdminMode.enabled', () => {
    expect(createCmp().canEditPage()).toBe(false);
    expect(createCmp({ storefrontAdminMode: { enabled: () => true } }).canEditPage()).toBe(true);
  });

  it('editPage navigates to admin page editor for about', () => {
    const cmp = createCmp();
    cmp.editPage();
    expect((cmp as any).router.navigate).toHaveBeenCalled();
    const [path, opts] = (cmp as any).router.navigate.calls.mostRecent().args;
    expect(path.join ? path.join('/') : path).toContain('admin');
    expect(JSON.stringify(opts)).toContain('about');
  });
});
