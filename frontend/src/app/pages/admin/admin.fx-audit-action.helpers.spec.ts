import { AdminComponent } from './admin.component';

/** Golden WU admin-fx-audit-action — fxAuditActionLabel. */
describe('AdminComponent fxAuditActionLabel (golden WU)', () => {
  function createCmp(translations: Record<string, string>) {
    const cmp = Object.create(AdminComponent.prototype) as AdminComponent;
    (cmp as any).t = (key: string) => translations[key] ?? key;
    return cmp;
  }

  it('returns translated label when present, else original action', () => {
    const cmp = createCmp({
      'adminUi.fx.audit.actions.set': 'Set override',
    });
    expect(cmp.fxAuditActionLabel(' SET ')).toBe('Set override');
    expect(cmp.fxAuditActionLabel('clear')).toBe('clear');
    expect(cmp.fxAuditActionLabel('')).toBe('');
  });
});
