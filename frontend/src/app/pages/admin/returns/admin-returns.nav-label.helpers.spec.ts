import { AdminReturnsComponent } from './admin-returns.component';

/** Golden WU returns-nav-label-helpers. */
describe('AdminReturnsComponent nav/label helpers (golden WU)', () => {
  function bare(overrides: Record<string, unknown> = {}): AdminReturnsComponent {
    const cmp = Object.create(AdminReturnsComponent.prototype) as AdminReturnsComponent;
    Object.assign(cmp as any, {
      meta: () => ({ page: 1, total_pages: 1 }),
      returnLabelSelectedName: () => '',
      translate: {
        instant: jasmine.createSpy('instant').and.returnValue('NO_FILE'),
      },
      ...overrides,
    });
    return cmp;
  }

  it('hasPrev / hasNext use page meta', () => {
    expect(bare().hasPrev()).toBe(false);
    expect(bare().hasNext()).toBe(false);
    expect(bare({ meta: () => ({ page: 2, total_pages: 3 }) }).hasPrev()).toBe(true);
    expect(bare({ meta: () => ({ page: 2, total_pages: 3 }) }).hasNext()).toBe(true);
    expect(bare({ meta: () => ({ page: 3, total_pages: 3 }) }).hasNext()).toBe(false);
  });

  it('returnLabelFileName prefers selected name else i18n fallback', () => {
    expect(bare().returnLabelFileName()).toBe('NO_FILE');
    expect(
      bare({ returnLabelSelectedName: () => 'label.pdf' }).returnLabelFileName(),
    ).toBe('label.pdf');
  });
});
