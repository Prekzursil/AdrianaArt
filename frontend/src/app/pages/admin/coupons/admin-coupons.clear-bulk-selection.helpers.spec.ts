import { AdminCouponsComponent } from './admin-coupons.component';

/** Golden WU admin-coupons-clear-bulk-selection -- clearBulkSelection. */
describe('AdminCouponsComponent clearBulkSelection (golden WU)', () => {
  it('clears file input and resets bulk state', () => {
    const cmp = Object.create(AdminCouponsComponent.prototype) as AdminCouponsComponent;
    Object.assign(cmp as any, {
      resetBulkState: jasmine.createSpy('reset'),
    });
    const fileInput = { value: 'x.csv' } as any;
    cmp.clearBulkSelection(fileInput);
    expect(fileInput.value).toBe('');
    expect((cmp as any).resetBulkState).toHaveBeenCalled();
  });
});
