import { signal } from '@angular/core';
import { AdminInventoryComponent } from './admin-inventory.component';

/** Golden WU inventory-pii-reveal-helpers. */
describe('AdminInventoryComponent pii/selection helpers (golden WU)', () => {
  function bare(): AdminInventoryComponent {
    const cmp = Object.create(AdminInventoryComponent.prototype) as AdminInventoryComponent;
    Object.assign(cmp as any, {
      piiReveal: signal(false),
      reservationsOpen: signal(false),
      reloadReservations: jasmine.createSpy('reload'),
      selected: new Set<string>(['k1']),
      rowKey: (row: any) => row.key,
    });
    return cmp;
  }

  it('togglePiiReveal flips flag and reloads when reservations open', () => {
    const cmp = bare();
    cmp.togglePiiReveal();
    expect((cmp as any).piiReveal()).toBe(true);
    expect((cmp as any).reloadReservations).not.toHaveBeenCalled();
    (cmp as any).reservationsOpen.set(true);
    cmp.togglePiiReveal();
    expect((cmp as any).reloadReservations).toHaveBeenCalled();
  });

  it('isSelected uses rowKey membership', () => {
    const cmp = bare();
    expect(cmp.isSelected({ key: 'k1' } as any)).toBe(true);
    expect(cmp.isSelected({ key: 'k2' } as any)).toBe(false);
  });
});
