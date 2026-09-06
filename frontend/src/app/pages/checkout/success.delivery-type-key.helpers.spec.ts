import { SuccessComponent } from './success.component';

/** Golden WU success-delivery-type-key — deliveryTypeKey. */
describe('SuccessComponent deliveryTypeKey (golden WU)', () => {
  it('maps delivery_type to i18n keys', () => {
    const cmp = Object.create(SuccessComponent.prototype) as SuccessComponent;
    Object.assign(cmp as any, { summary: null });
    expect(cmp.deliveryTypeKey()).toBeNull();
    Object.assign(cmp as any, { summary: { delivery_type: 'home' } });
    expect(cmp.deliveryTypeKey()).toBe('checkout.deliveryHome');
    Object.assign(cmp as any, { summary: { delivery_type: 'locker' } });
    expect(cmp.deliveryTypeKey()).toBe('checkout.deliveryLocker');
    Object.assign(cmp as any, { summary: { delivery_type: 'other' } });
    expect(cmp.deliveryTypeKey()).toBeNull();
  });
});
