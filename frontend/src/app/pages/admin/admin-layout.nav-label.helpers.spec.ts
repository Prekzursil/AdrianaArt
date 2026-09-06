import { AdminLayoutComponent } from './admin-layout.component';

/** Golden WU admin-layout-nav-label-helpers. */
describe('AdminLayoutComponent nav/shortcut helpers (golden WU)', () => {
  function bare(overrides: Record<string, unknown> = {}): AdminLayoutComponent {
    const cmp = Object.create(AdminLayoutComponent.prototype) as AdminLayoutComponent;
    Object.assign(cmp as any, {
      translate: { instant: (k: string) => (k === 'nav.home' ? ' Home ' : k) },
      ...overrides,
    });
    return cmp;
  }

  it('navLabel prefers translated label else key', () => {
    const fn = (AdminLayoutComponent.prototype as any).navLabel.bind(bare());
    expect(fn({ labelKey: 'nav.home' })).toBe(' Home ');
    expect(fn({ labelKey: 'nav.x' })).toBe('nav.x');
    const empty = (AdminLayoutComponent.prototype as any).navLabel.bind(
      bare({ translate: { instant: () => '   ' } }),
    );
    expect(empty({ labelKey: 'nav.x' })).toBe('nav.x');
  });

  it('shouldIgnoreShortcut skips inputs and prevented events', () => {
    const fn = (AdminLayoutComponent.prototype as any).shouldIgnoreShortcut.bind(bare());
    expect(fn({ defaultPrevented: true, target: null })).toBe(true);
    expect(fn({ defaultPrevented: false, target: null })).toBe(false);
    expect(
      fn({ defaultPrevented: false, target: { tagName: 'INPUT', isContentEditable: false } }),
    ).toBe(true);
    expect(
      fn({ defaultPrevented: false, target: { tagName: 'DIV', isContentEditable: true } }),
    ).toBe(true);
    expect(
      fn({ defaultPrevented: false, target: { tagName: 'DIV', isContentEditable: false } }),
    ).toBe(false);
  });
});
