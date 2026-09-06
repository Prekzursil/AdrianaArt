import { CheckoutComponent } from './checkout.component';

/** Golden WU checkout-is-element-visible — isElementVisible. */
describe('CheckoutComponent isElementVisible (golden WU)', () => {
  it('uses getClientRects length', () => {
    const cmp = Object.create(CheckoutComponent.prototype) as CheckoutComponent;
    const fn = (CheckoutComponent.prototype as any).isElementVisible as (
      this: CheckoutComponent,
      el: HTMLElement,
    ) => boolean;
    const visible = { getClientRects: () => [{}, {}] } as unknown as HTMLElement;
    const hidden = { getClientRects: () => [] } as unknown as HTMLElement;
    expect(fn.call(cmp, visible)).toBe(true);
    expect(fn.call(cmp, hidden)).toBe(false);
  });
});
