import { AdminSegmentsComponent } from './admin-segments.component';

/** Golden WU — formatMoney for segment tables. */
describe('AdminSegmentsComponent formatMoney (golden WU)', () => {
  function bare(): AdminSegmentsComponent {
    return Object.create(AdminSegmentsComponent.prototype) as AdminSegmentsComponent;
  }

  it('formats finite numbers and coerces invalid to 0.00 RON', () => {
    const cmp = bare();
    expect(cmp.formatMoney(12.5)).toBe('12.50 RON');
    expect(cmp.formatMoney('3')).toBe('3.00 RON');
    expect(cmp.formatMoney('nope')).toBe('0.00 RON');
    expect(cmp.formatMoney(null)).toBe('0.00 RON');
  });
});
