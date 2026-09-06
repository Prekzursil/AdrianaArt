import { AdminSegmentsComponent } from './admin-segments.component';

describe('AdminSegmentsComponent formatMoney (golden WU)', () => {
  it('formats finite numbers and falls back to 0.00 RON', () => {
    const cmp = Object.create(AdminSegmentsComponent.prototype) as AdminSegmentsComponent;
    expect(cmp.formatMoney(12.5)).toBe('12.50 RON');
    expect(cmp.formatMoney('3')).toBe('3.00 RON');
    expect(cmp.formatMoney('x')).toBe('0.00 RON');
    expect(cmp.formatMoney(null)).toBe('0.00 RON');
  });
});
