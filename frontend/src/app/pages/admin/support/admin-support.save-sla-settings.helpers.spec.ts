import { AdminSupportComponent } from './admin-support.component';

/** Golden WU admin-support-save-sla-settings -- saveSlaSettings. */
describe('AdminSupportComponent saveSlaSettings (golden WU)', () => {
  it('rejects invalid draft hours without calling API', () => {
    const cmp = Object.create(AdminSupportComponent.prototype) as AdminSupportComponent;
    Object.assign(cmp as any, {
      slaSettingsSaving: false,
      slaFirstReplyHoursDraft: 0,
      slaResolutionHoursDraft: 72,
      translate: { instant: jasmine.createSpy('instant').and.returnValue('invalid') },
      api: { updateSlaSettings: jasmine.createSpy('updateSlaSettings') },
    });
    cmp.saveSlaSettings();
    expect((cmp as any).slaSettingsError).toBe('invalid');
    expect((cmp as any).api.updateSlaSettings).not.toHaveBeenCalled();
  });
});
