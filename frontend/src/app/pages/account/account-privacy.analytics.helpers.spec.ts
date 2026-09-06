import { AccountPrivacyComponent } from './account-privacy.component';

describe('AccountPrivacyComponent analyticsOptIn (golden WU)', () => {
  function bare(analytics: { enabled: () => boolean; setEnabled: (v: boolean) => void }) {
    const cmp = Object.create(AccountPrivacyComponent.prototype) as AccountPrivacyComponent;
    (cmp as any).analytics = analytics;
    return cmp;
  }

  it('getter mirrors analytics.enabled', () => {
    const enabled = jasmine.createSpy('enabled').and.returnValue(true);
    const cmp = bare({ enabled, setEnabled: () => undefined });
    expect(cmp.analyticsOptIn).toBe(true);
    enabled.and.returnValue(false);
    expect(cmp.analyticsOptIn).toBe(false);
  });

  it('setter coerces and forwards to analytics.setEnabled', () => {
    const setEnabled = jasmine.createSpy('setEnabled');
    const cmp = bare({ enabled: () => false, setEnabled });
    cmp.analyticsOptIn = true;
    expect(setEnabled).toHaveBeenCalledWith(true);
    cmp.analyticsOptIn = 0 as any;
    expect(setEnabled).toHaveBeenCalledWith(false);
  });
});
