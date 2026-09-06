import { CustomerTimelineComponent } from './customer-timeline.component';

/** Golden WU customer-timeline-titles — orderTitle/ticketTitle. */
describe('CustomerTimelineComponent orderTitle/ticketTitle (golden WU)', () => {
  it('prefers reference_code / short id with # prefix', () => {
    const cmp = Object.create(CustomerTimelineComponent.prototype) as CustomerTimelineComponent;
    expect(cmp.orderTitle({ reference_code: 'ABC', id: '123456789' } as any)).toBe('#ABC');
    expect(cmp.orderTitle({ reference_code: '  ', id: '123456789' } as any)).toBe('#12345678');
    expect(cmp.ticketTitle({ id: 'abcdefghij' } as any)).toBe('#abcdefgh');
    expect(cmp.ticketTitle({ id: 'short' } as any)).toBe('#short');
  });
});
