import { AdminSegmentsComponent } from './admin-segments.component';

/** Golden WU segments-open-user-helpers. */
describe('AdminSegmentsComponent open/reset helpers (golden WU)', () => {
  function bare(): AdminSegmentsComponent {
    const cmp = Object.create(AdminSegmentsComponent.prototype) as AdminSegmentsComponent;
    Object.assign(cmp as any, {
      router: { navigateByUrl: jasmine.createSpy('nav') },
      q: 'x',
      repeatMinOrders: 9,
      aovMinOrders: 5,
      aovMinAov: 10,
      applyFilters: jasmine.createSpy('apply'),
    });
    return cmp;
  }

  it('openUser navigates with prefill when needle present', () => {
    const cmp = bare();
    cmp.openUser('  ');
    expect((cmp as any).router.navigateByUrl).not.toHaveBeenCalled();
    cmp.openUser('alice');
    expect((cmp as any).router.navigateByUrl).toHaveBeenCalledWith(
      '/admin/users',
      jasmine.objectContaining({ state: jasmine.any(Object) }),
    );
  });

  it('resetFilters restores defaults and applies', () => {
    const cmp = bare();
    cmp.resetFilters();
    expect((cmp as any).q).toBe('');
    expect((cmp as any).repeatMinOrders).toBe(2);
    expect((cmp as any).aovMinOrders).toBe(1);
    expect((cmp as any).aovMinAov).toBe(0);
    expect((cmp as any).applyFilters).toHaveBeenCalled();
  });
});
