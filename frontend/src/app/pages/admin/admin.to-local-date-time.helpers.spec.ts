import { AdminComponent } from './admin.component';

/** Golden WU admin-to-local-date-time — toLocalDateTime. */
describe('AdminComponent toLocalDateTime (golden WU)', () => {
  function bare(): AdminComponent {
    return Object.create(AdminComponent.prototype) as AdminComponent;
  }

  it('formats ISO into local datetime-local value length', () => {
    const out = bare().toLocalDateTime('2024-01-15T12:30:00.000Z');
    expect(out).toMatch(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/);
    expect(out.length).toBe(16);
  });
});
