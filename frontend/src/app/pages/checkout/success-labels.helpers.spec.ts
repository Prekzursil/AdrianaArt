import { SuccessComponent } from './success.component';

describe('SuccessComponent courier/delivery/locker labels (golden WU)', () => {
  function make(summary: Record<string, unknown> | null): any {
    const proto = Object.create(SuccessComponent.prototype);
    proto.summary = summary;
    return proto;
  }

  describe('courierLabel', () => {
    it('returns null without summary', () => {
      expect(make(null).courierLabel()).toBeNull();
    });

    it('maps fan_courier/sameday and falls back to raw', () => {
      expect(make({ courier: 'fan_courier' }).courierLabel()).toBe('Fan Courier');
      expect(make({ courier: 'Sameday' }).courierLabel()).toBe('Sameday');
      expect(make({ courier: 'DHL' }).courierLabel()).toBe('DHL');
      expect(make({ courier: '  ' }).courierLabel()).toBeNull();
    });
  });

  describe('deliveryTypeKey', () => {
    it('maps home/locker and rejects unknown/missing', () => {
      expect(make(null).deliveryTypeKey()).toBeNull();
      expect(make({ delivery_type: 'home' }).deliveryTypeKey()).toBe('checkout.deliveryHome');
      expect(make({ delivery_type: 'locker' }).deliveryTypeKey()).toBe('checkout.deliveryLocker');
      expect(make({ delivery_type: 'pickup' }).deliveryTypeKey()).toBeNull();
    });
  });

  describe('lockerLabel', () => {
    it('only joins locker fields for locker delivery', () => {
      expect(make(null).lockerLabel()).toBeNull();
      expect(make({ delivery_type: 'home', locker_name: 'A' }).lockerLabel()).toBeNull();
      expect(
        make({ delivery_type: 'locker', locker_name: 'Box 1', locker_address: 'Str. 2' }).lockerLabel(),
      ).toBe('Box 1 — Str. 2');
      expect(make({ delivery_type: 'locker', locker_name: 'Box 1' }).lockerLabel()).toBe('Box 1');
      expect(make({ delivery_type: 'locker' }).lockerLabel()).toBeNull();
    });
  });
});
