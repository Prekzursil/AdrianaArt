import { AdminComponent } from './admin.component';

/** Golden WU — fxAuditActionLabel translates known actions. */
describe('AdminComponent fxAuditActionLabel (golden WU)', () => {
  function bare(): AdminComponent {
    const cmp = Object.create(AdminComponent.prototype) as AdminComponent;
    (cmp as any).t = (key: string) =>
      key === 'adminUi.fx.audit.actions.create' ? 'Created' : key;
    return cmp;
  }

  it('translates known actions and falls back to raw', () => {
    const cmp = bare();
    expect(cmp.fxAuditActionLabel('Create')).toBe('Created');
    expect(cmp.fxAuditActionLabel('mystery')).toBe('mystery');
  });
});
