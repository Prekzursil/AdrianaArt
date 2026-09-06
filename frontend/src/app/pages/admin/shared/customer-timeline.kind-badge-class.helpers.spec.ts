import { CustomerTimelineComponent } from './customer-timeline.component';

/** Golden WU customer-timeline-kind-badge-class — kindBadgeClass. */
describe('CustomerTimelineComponent kindBadgeClass (golden WU)', () => {
  it('maps event kinds to badge classes', () => {
    const cmp = Object.create(CustomerTimelineComponent.prototype) as CustomerTimelineComponent;
    expect(cmp.kindBadgeClass('order')).toContain('indigo');
    expect(cmp.kindBadgeClass('ticket')).toContain('amber');
    expect(cmp.kindBadgeClass('return' as any)).toContain('rose');
  });
});
