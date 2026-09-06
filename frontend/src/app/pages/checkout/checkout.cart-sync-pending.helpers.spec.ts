import { CheckoutComponent } from './checkout.component';

describe('CheckoutComponent cartSyncPending (golden WU)', () => {
  it('is true when syncing or syncQueued', () => {
    const cmp = Object.create(CheckoutComponent.prototype) as CheckoutComponent;
    (cmp as any).syncing = false;
    (cmp as any).syncQueued = false;
    expect(cmp.cartSyncPending()).toBe(false);
    (cmp as any).syncing = true;
    expect(cmp.cartSyncPending()).toBe(true);
    (cmp as any).syncing = false;
    (cmp as any).syncQueued = true;
    expect(cmp.cartSyncPending()).toBe(true);
  });
});
