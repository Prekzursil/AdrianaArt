import { NotificationsService } from './notifications.service';

/** Golden WU notifications-reset — reset. */
describe('NotificationsService reset (golden WU)', () => {
  it('clears items, unread count, and loading signals', () => {
    const svc = Object.create(NotificationsService.prototype) as NotificationsService;
    const state = { items: [1], unread: 3, loading: true } as any;
    Object.assign(svc as any, {
      itemsSignal: { set: (v: any) => (state.items = v) },
      unreadCountSignal: { set: (v: any) => (state.unread = v) },
      loadingSignal: { set: (v: any) => (state.loading = v) },
    });
    svc.reset();
    expect(state).toEqual({ items: [], unread: 0, loading: false });
  });
});
