import { OfflineComponent } from './offline.component';
import { shouldReloadOnRetry } from './offline.helpers';

describe('OfflineComponent canReloadNow (golden WU)', () => {
  it('shouldReloadOnRetry is true only when online', () => {
    expect(shouldReloadOnRetry(true)).toBe(true);
    expect(shouldReloadOnRetry(false)).toBe(false);
  });

  it('canReloadNow mirrors navigator.onLine via helpers', () => {
    const cmp = Object.create(OfflineComponent.prototype) as OfflineComponent;
    const desc = Object.getOwnPropertyDescriptor(Navigator.prototype, 'onLine');
    Object.defineProperty(navigator, 'onLine', { configurable: true, get: () => true });
    expect(cmp.canReloadNow()).toBe(true);
    Object.defineProperty(navigator, 'onLine', { configurable: true, get: () => false });
    expect(cmp.canReloadNow()).toBe(false);
    if (desc) {
      Object.defineProperty(Navigator.prototype, 'onLine', desc);
    } else {
      delete (navigator as any).onLine;
    }
  });
});
