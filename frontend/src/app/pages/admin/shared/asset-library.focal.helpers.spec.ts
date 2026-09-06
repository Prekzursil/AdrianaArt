import { AssetLibraryComponent } from './asset-library.component';

/** Golden WU asset-library-focal-helpers. */
describe('AssetLibraryComponent focal helpers (golden WU)', () => {
  function bare(overrides: Record<string, unknown> = {}): AssetLibraryComponent {
    const cmp = Object.create(AssetLibraryComponent.prototype) as AssetLibraryComponent;
    Object.assign(cmp as any, { focalDraftX: 50, focalDraftY: 50, ...overrides });
    return cmp;
  }

  it('focalObjectPosition formats draft percents', () => {
    expect(bare().focalObjectPosition()).toBe('50% 50%');
    expect(bare({ focalDraftX: 12, focalDraftY: 88 }).focalObjectPosition()).toBe('12% 88%');
  });

  it('pickFocal updates drafts from click geometry', () => {
    const cmp = bare();
    const target = {
      getBoundingClientRect: () => ({ left: 0, top: 0, width: 100, height: 100 }),
    };
    cmp.pickFocal({
      currentTarget: target,
      clientX: 25,
      clientY: 75,
    } as any);
    expect((cmp as any).focalDraftX).toBe(25);
    expect((cmp as any).focalDraftY).toBe(75);
  });

  it('pickFocal no-ops without target or zero size', () => {
    const cmp = bare({ focalDraftX: 1, focalDraftY: 2 });
    cmp.pickFocal({ currentTarget: null, clientX: 50, clientY: 50 } as any);
    expect((cmp as any).focalDraftX).toBe(1);
    cmp.pickFocal({
      currentTarget: { getBoundingClientRect: () => ({ left: 0, top: 0, width: 0, height: 0 }) },
      clientX: 50,
      clientY: 50,
    } as any);
    expect((cmp as any).focalDraftX).toBe(1);
  });
});
