import { CustomerTimelineComponent } from './customer-timeline.component';

/** Golden WU customer-timeline-ticket-title — ticketTitle. */
describe('CustomerTimelineComponent ticketTitle (golden WU)', () => {
  it('prefixes short ticket id when present', () => {
    const cmp = Object.create(CustomerTimelineComponent.prototype) as CustomerTimelineComponent;
    expect(cmp.ticketTitle({ id: 'ticket12zzzz' } as any)).toBe('#ticket12');
    expect(cmp.ticketTitle({ id: '' } as any)).toBe('');
  });
});
