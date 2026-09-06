import { CheckoutComponent } from './checkout.component';

/** Golden WU checkout-detect-changes-safe -- detectChangesSafe. */
describe('CheckoutComponent detectChangesSafe (golden WU)', () => {
  it('swallows detectChanges errors', () => {
    const cmp = Object.create(CheckoutComponent.prototype) as CheckoutComponent;
    Object.assign(cmp as any, {
      cdr: {
        detectChanges: jasmine.createSpy('detect').and.callFake(() => {
          throw new Error('destroyed');
        }),
      },
    });
    expect(() => (cmp as any).detectChangesSafe()).not.toThrow();
  });
});
