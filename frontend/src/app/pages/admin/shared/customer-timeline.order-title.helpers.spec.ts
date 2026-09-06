import { CustomerTimelineComponent } from './customer-timeline.component';

/** Golden WU customer-timeline-order-title — orderTitle. */
describe('CustomerTimelineComponent orderTitle (golden WU)', () => {
  it('prefers reference code otherwise short id', () => {
    const cmp = Object.create(CustomerTimelineComponent.prototype) as CustomerTimelineComponent;
    expect(cmp.orderTitle({ reference_code: ' ABC ', id: 'abcdefghij' } as any)).toBe('#ABC');
    expect(cmp.orderTitle({ reference_code: '  ', id: 'abcdefghij' } as any)).toBe('abcdefgh');
    expect(cmp.orderTitle({ reference_code: null, id: 'xyz12345zz' } as any)).toBe('xyz12345');
  });
});
