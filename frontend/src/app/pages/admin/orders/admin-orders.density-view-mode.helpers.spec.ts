import { signal } from '@angular/core';
import { AdminOrdersComponent } from './admin-orders.component';

/** Golden WU orders-density-view-mode-helpers. */
describe('AdminOrdersComponent density/view helpers (golden WU)', () => {
  function bare(): AdminOrdersComponent {
    const cmp = Object.create(AdminOrdersComponent.prototype) as AdminOrdersComponent;
    Object.assign(cmp as any, {
      tableLayout: signal({ density: 'compact', columns: [] }),
      applyTableLayout: jasmine.createSpy('apply'),
      viewMode: signal('table'),
      persistViewMode: jasmine.createSpy('persist'),
      clearSelection: jasmine.createSpy('clear'),
      load: jasmine.createSpy('load'),
    });
    return cmp;
  }

  it('toggleDensity flips compact/comfortable', () => {
    const cmp = bare();
    cmp.toggleDensity();
    expect((cmp as any).applyTableLayout).toHaveBeenCalledWith(
      jasmine.objectContaining({ density: 'comfortable' }),
    );
  });

  it('densityToggleLabelKey reflects current density', () => {
    const cmp = bare();
    expect(cmp.densityToggleLabelKey()).toContain('toComfortable');
    (cmp as any).tableLayout.set({ density: 'comfortable', columns: [] });
    expect(cmp.densityToggleLabelKey()).toContain('toCompact');
  });

  it('toggleViewMode switches table/kanban', () => {
    const cmp = bare();
    cmp.toggleViewMode();
    expect((cmp as any).viewMode()).toBe('kanban');
    expect((cmp as any).clearSelection).toHaveBeenCalled();
    expect((cmp as any).load).toHaveBeenCalled();
  });
});
