import { AssetLibraryComponent } from './asset-library.component';

/** Golden WU asset-library-nav-helpers. */
describe('AssetLibraryComponent nav helpers (golden WU)', () => {
  function bare(overrides: Record<string, unknown> = {}): AssetLibraryComponent {
    const cmp = Object.create(AssetLibraryComponent.prototype) as AssetLibraryComponent;
    Object.assign(cmp as any, {
      page: 2,
      totalPages: () => 3,
      reload: jasmine.createSpy('reload'),
      tag: '',
      ...overrides,
    });
    return cmp;
  }

  it('prev/next respect bounds and reload', () => {
    const cmp = bare();
    cmp.prev();
    expect((cmp as any).page).toBe(1);
    expect((cmp as any).reload).toHaveBeenCalled();
    bare({ page: 1 }).prev();
    const n = bare({ page: 3 });
    n.next();
    expect((n as any).reload).not.toHaveBeenCalled();
    const m = bare({ page: 2 });
    m.next();
    expect((m as any).page).toBe(3);
  });

  it('applyTagFilter sets tag and reloads', () => {
    const cmp = bare();
    cmp.applyTagFilter('  ');
    expect((cmp as any).reload).not.toHaveBeenCalled();
    cmp.applyTagFilter(' hero ');
    expect((cmp as any).tag).toBe('hero');
    expect((cmp as any).reload).toHaveBeenCalledWith(true);
  });
});
