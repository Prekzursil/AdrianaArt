import { AdminDashboardComponent } from './admin-dashboard.component';

/** Golden WU dashboard-open-onboarding -- openOnboarding. */
describe('AdminDashboardComponent openOnboarding (golden WU)', () => {
  it('sets onboardingOpen true', () => {
    const cmp = Object.create(AdminDashboardComponent.prototype) as AdminDashboardComponent;
    Object.assign(cmp as any, {
      onboardingOpen: { set: jasmine.createSpy('set') },
    });
    cmp.openOnboarding();
    expect((cmp as any).onboardingOpen.set).toHaveBeenCalledWith(true);
  });
});
