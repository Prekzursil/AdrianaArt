import { AdminSegmentsComponent } from './admin-segments.component';

/** Golden WU segments-format-money-helpers. */
describe('AdminSegmentsComponent formatMoney (golden WU)', () => {
  function bare(): AdminSegmentsComponent {
    return Object.create(AdminSegmentsComponent.prototype) as AdminSegmentsComponent;
  }

  it('formatMoney formats finite values as RON', () => {
    const cmp = bare();
    expect(cmp.formatMoney(12)).toBe('12.00 RON');
    expect(cmp.formatMoney('3.5')).toBe('3.50 RON');
    expect(cmp.formatMoney('nope')).toBe('0.00 RON');
  });
});
