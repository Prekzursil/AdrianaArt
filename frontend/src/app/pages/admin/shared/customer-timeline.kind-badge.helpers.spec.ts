import { CustomerTimelineComponent } from './customer-timeline.component';

/** Golden WU — kindBadgeClass for timeline event kinds. */
describe('CustomerTimelineComponent kindBadgeClass (golden WU)', () => {
  function bare(): CustomerTimelineComponent {
    return Object.create(CustomerTimelineComponent.prototype) as CustomerTimelineComponent;
  }

  it('maps order/ticket and falls back for email', () => {
    const cmp = bare();
    expect(cmp.kindBadgeClass('order')).toContain('indigo');
    expect(cmp.kindBadgeClass('ticket')).toContain('amber');
    expect(cmp.kindBadgeClass('email')).toContain('rose');
  });
});
