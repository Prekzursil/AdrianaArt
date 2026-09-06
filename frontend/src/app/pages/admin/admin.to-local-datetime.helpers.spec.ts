import { AdminComponent } from './admin.component';

/** Golden WU admin-to-local-datetime — toLocalDateTime. */
describe('AdminComponent toLocalDateTime (golden WU)', () => {
  it('converts ISO to local datetime-local value (yyyy-MM-ddTHH:mm)', () => {
    const cmp = Object.create(AdminComponent.prototype) as AdminComponent;
    const iso = '2026-06-15T12:30:00.000Z';
    const expected = new Date(
      new Date(iso).getTime() - new Date(iso).getTimezoneOffset() * 60000,
    )
      .toISOString()
      .slice(0, 16);
    expect(cmp.toLocalDateTime(iso)).toBe(expected);
    expect(cmp.toLocalDateTime(iso).length).toBe(16);
    expect(cmp.toLocalDateTime(iso)).toMatch(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/);
  });
});
