import { GoogleLinkPendingService } from './google-link-pending.service';

/** Golden WU google-link-pending-clear -- clear. */
describe('GoogleLinkPendingService clear (golden WU)', () => {
  it('nulls the pending payload', () => {
    const svc = Object.create(GoogleLinkPendingService.prototype) as GoogleLinkPendingService;
    Object.assign(svc as any, { pending: { code: 'c', state: 's' } });
    svc.clear();
    expect((svc as any).pending).toBeNull();
  });
});
