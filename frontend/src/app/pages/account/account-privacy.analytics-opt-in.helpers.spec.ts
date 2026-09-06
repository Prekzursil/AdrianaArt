import { AccountPrivacyComponent } from './account-privacy.component';

/** Golden WU account-privacy-analytics-opt-in -- analyticsOptIn. */
describe('AccountPrivacyComponent analyticsOptIn (golden WU)', () => {
  it('reads and writes analytics enabled state', () => {
    const cmp = Object.create(AccountPrivacyComponent.prototype) as AccountPrivacyComponent;
    const enabled = jasmine.createSpy('enabled').and.returnValue(true);
    const setEnabled = jasmine.createSpy('setEnabled');
    Object.assign(cmp as any, { analytics: { enabled, setEnabled } });
    expect(cmp.analyticsOptIn).toBe(true);
    cmp.analyticsOptIn = false;
    expect(setEnabled).toHaveBeenCalledWith(false);
  });
});
