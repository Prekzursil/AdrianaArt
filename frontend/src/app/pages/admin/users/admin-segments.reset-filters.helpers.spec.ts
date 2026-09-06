import { AdminSegmentsComponent } from './admin-segments.component';

/** Golden WU segments-reset-filters -- resetFilters. */
describe('AdminSegmentsComponent resetFilters (golden WU)', () => {
  it('resets q/repeat/aov defaults and applies filters', () => {
    const cmp = Object.create(AdminSegmentsComponent.prototype) as AdminSegmentsComponent;
    Object.assign(cmp as any, {
      q: 'x',
      repeatMinOrders: 9,
      aovMinOrders: 5,
      aovMinAov: 12,
      applyFilters: jasmine.createSpy('applyFilters'),
    });
    cmp.resetFilters();
    expect((cmp as any).q).toBe('');
    expect((cmp as any).repeatMinOrders).toBe(2);
    expect((cmp as any).aovMinOrders).toBe(1);
    expect((cmp as any).aovMinAov).toBe(0);
    expect((cmp as any).applyFilters).toHaveBeenCalled();
  });
});
