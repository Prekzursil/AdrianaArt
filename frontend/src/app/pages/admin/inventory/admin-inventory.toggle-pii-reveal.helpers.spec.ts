import { AdminInventoryComponent } from './admin-inventory.component';

/** Golden WU admin-inventory-toggle-pii-reveal -- togglePiiReveal. */
describe('AdminInventoryComponent togglePiiReveal (golden WU)', () => {
  it('toggles pii reveal and reloads only when reservations are open', () => {
    const cmp = Object.create(AdminInventoryComponent.prototype) as AdminInventoryComponent;
    const reload = jasmine.createSpy('reloadReservations');
    Object.assign(cmp as any, {
      piiReveal: { set: jasmine.createSpy('set'), 0: false, call: undefined },
      reservationsOpen: jasmine.createSpy('reservationsOpen').and.returnValue(false),
      reloadReservations: reload,
    });
    // emulate signal read/write used by component
    let revealed = false;
    (cmp as any).piiReveal = {
      set: (v: boolean) => {
        revealed = v;
      },
    };
    // replace method body expectation via direct assign of helpers used inside
    (cmp as any).piiReveal = Object.assign(
      (() => revealed) as any,
      {
        set: (v: boolean) => {
          revealed = Boolean(v);
        },
      },
    );
    // Component calls this.piiReveal.set(!this.piiReveal())
    (cmp as any).piiReveal = Object.assign(
      function piiReveal(this: any) {
        return revealed;
      },
      {
        set(v: boolean) {
          revealed = Boolean(v);
        },
      },
    );
    (cmp as any).reservationsOpen = () => false;
    (cmp as any).reloadReservations = reload;
    cmp.togglePiiReveal();
    expect(revealed).toBe(true);
    expect(reload).not.toHaveBeenCalled();
    (cmp as any).reservationsOpen = () => true;
    cmp.togglePiiReveal();
    expect(revealed).toBe(false);
    expect(reload).toHaveBeenCalled();
  });
});
