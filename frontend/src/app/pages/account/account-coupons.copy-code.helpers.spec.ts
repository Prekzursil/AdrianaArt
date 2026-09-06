import { AccountCouponsComponent } from './account-coupons.component';

describe('AccountCouponsComponent copyCode (golden WU)', () => {
  it('noops on blank; writes clipboard and toasts on success', async () => {
    const cmp = Object.create(AccountCouponsComponent.prototype) as AccountCouponsComponent;
    const writeText = jasmine.createSpy('writeText').and.resolveTo(undefined);
    (cmp as any).toast = { success: jasmine.createSpy('success') };
    (cmp as any).translate = { instant: (k: string) => k };
    spyOnProperty(navigator, 'clipboard', 'get').and.returnValue({ writeText } as any);

    await cmp.copyCode('  ');
    expect(writeText).not.toHaveBeenCalled();

    await cmp.copyCode(' ab12 ');
    expect(writeText).toHaveBeenCalledWith('AB12');
    expect((cmp as any).toast.success).toHaveBeenCalled();
  });
});
