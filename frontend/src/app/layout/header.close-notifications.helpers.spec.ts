import { HeaderComponent } from './header.component';

/** Golden WU header-close-notifications — closeNotifications. */
describe('HeaderComponent closeNotifications (golden WU)', () => {
  it('sets notificationsOpen false', () => {
    const cmp = Object.create(HeaderComponent.prototype) as HeaderComponent;
    Object.assign(cmp as any, { notificationsOpen: true });
    cmp.closeNotifications();
    expect((cmp as any).notificationsOpen).toBe(false);
  });
});
