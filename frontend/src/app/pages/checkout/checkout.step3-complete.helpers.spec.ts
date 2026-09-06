import { CheckoutComponent } from './checkout.component';

describe('CheckoutComponent step3Complete (golden WU)', () => {
  it('delegates to step2Complete', () => {
    const cmp = Object.create(CheckoutComponent.prototype) as CheckoutComponent;
    (cmp as any).step2Complete = () => true;
    expect(cmp.step3Complete()).toBe(true);
    (cmp as any).step2Complete = () => false;
    expect(cmp.step3Complete()).toBe(false);
  });
});
