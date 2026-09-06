import { AdminThemeComponent } from './admin-theme.component';

/** Golden WU admin-theme-reload -- reload. */
describe('AdminThemeComponent reload (golden WU)', () => {
  it('seeds values from draft tokens and clears dirty', () => {
    const cmp = Object.create(AdminThemeComponent.prototype) as AdminThemeComponent;
    Object.assign(cmp as any, {
      values: { set: jasmine.createSpy('valuesSet') },
      dirty: { set: jasmine.createSpy('dirtySet') },
      staleView: { set: jasmine.createSpy('staleViewSet') },
      contrast: { set: jasmine.createSpy('contrastSet') },
      loaded: { set: jasmine.createSpy('loadedSet') },
      versions: { set: jasmine.createSpy('versionsSet') },
      syncPreview: jasmine.createSpy('syncPreview'),
      service: {
        getDraft: jasmine.createSpy('getDraft').and.returnValue({
          subscribe: (h: any) =>
            h.next({ version: 7, tokens: { '--accent': '1 2 3' } }),
        }),
        listVersions: jasmine.createSpy('listVersions').and.returnValue({
          subscribe: (h: any) => h.next({ items: [{ version: 1 }] }),
        }),
      },
    });
    (cmp as any).reload();
    expect((cmp as any).baselineVersion).toBe(7);
    expect((cmp as any).dirty.set).toHaveBeenCalledWith(false);
    expect((cmp as any).loaded.set).toHaveBeenCalledWith(true);
    expect((cmp as any).versions.set).toHaveBeenCalledWith([{ version: 1 }]);
  });
});
