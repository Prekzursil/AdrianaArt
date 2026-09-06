import { CustomerTimelineComponent } from './customer-timeline.component';

/** Golden WU customer-timeline-titles-helpers. */
describe('CustomerTimelineComponent title helpers (golden WU)', () => {
  function bare(): CustomerTimelineComponent {
    return Object.create(CustomerTimelineComponent.prototype) as CustomerTimelineComponent;
  }

  it('orderTitle prefers reference else id prefix', () => {
    const cmp = bare();
    expect(cmp.orderTitle({ reference_code: 'ABC', id: '123456789' } as any)).toBe('#ABC');
    expect(cmp.orderTitle({ reference_code: '  ', id: '123456789' } as any)).toBe('12345678');
  });

  it('ticketTitle shortens id', () => {
    const cmp = bare();
    expect(cmp.ticketTitle({ id: 'abcdefghij' } as any)).toBe('#abcdefgh');
  });
});
