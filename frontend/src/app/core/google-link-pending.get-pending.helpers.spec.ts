import { GoogleLinkPendingService } from './google-link-pending.service';

/** Golden WU google-link-pending-get-pending -- getPending. */
describe('GoogleLinkPendingService getPending (golden WU)', () => {
  it('returns the stored pending payload or null', () => {
    const svc = Object.create(GoogleLinkPendingService.prototype) as GoogleLinkPendingService;
    Object.assign(svc as any, { pending: null });
    expect(svc.getPending()).toBeNull();
    Object.assign(svc as any, { pending: { code: 'c', state: 's' } });
    expect(svc.getPending()).toEqual({ code: 'c', state: 's' });
  });
});
