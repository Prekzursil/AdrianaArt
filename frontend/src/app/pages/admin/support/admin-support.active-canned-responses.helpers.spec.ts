import { signal } from '@angular/core';
import { AdminSupportComponent } from './admin-support.component';

/** Golden WU support-active-canned-responses — activeCannedResponses. */
describe('AdminSupportComponent activeCannedResponses (golden WU)', () => {
  function bare(rows: unknown[]): AdminSupportComponent {
    const cmp = Object.create(AdminSupportComponent.prototype) as AdminSupportComponent;
    Object.assign(cmp as any, { cannedResponses: signal(rows) });
    return cmp;
  }

  it('filters to active truthy templates', () => {
    const out = bare([
      { id: '1', is_active: true },
      { id: '2', is_active: false },
      null,
      { id: '3', is_active: true },
    ]).activeCannedResponses();
    expect(out.map((r: any) => r.id)).toEqual(['1', '3']);
  });
});
