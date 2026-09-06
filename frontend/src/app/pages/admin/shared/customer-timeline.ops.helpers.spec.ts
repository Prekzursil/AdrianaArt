import { CustomerTimelineComponent } from './customer-timeline.component';

/** Golden WU customer-timeline-ops-helpers. */
describe('CustomerTimelineComponent ops helpers (golden WU)', () => {
  function bare(overrides: Record<string, unknown> = {}): CustomerTimelineComponent {
    const cmp = Object.create(CustomerTimelineComponent.prototype) as CustomerTimelineComponent;
    Object.assign(cmp as any, {
      customerEmail: 'a@b.c',
      includePii: true,
      auth: { canAccessAdminSection: () => true },
      ...overrides,
    });
    return cmp;
  }

  it('showOpsShortcut requires ops access, email, and PII', () => {
    expect(bare().showOpsShortcut()).toBe(true);
    expect(bare({ includePii: false }).showOpsShortcut()).toBe(false);
    expect(bare({ customerEmail: '  ' }).showOpsShortcut()).toBe(false);
    expect(
      bare({ auth: { canAccessAdminSection: () => false } }).showOpsShortcut(),
    ).toBe(false);
  });

  it('kindBadgeClass maps event kinds', () => {
    const cmp = bare();
    expect(cmp.kindBadgeClass('order')).toContain('indigo');
    expect(cmp.kindBadgeClass('ticket')).toContain('amber');
    expect(cmp.kindBadgeClass('other' as any)).toBeTruthy();
  });
});
