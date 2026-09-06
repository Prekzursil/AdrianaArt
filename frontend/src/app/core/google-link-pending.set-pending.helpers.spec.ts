import { GoogleLinkPendingService } from './google-link-pending.service';

/** Golden WU google-link-pending-set-pending -- setPending. */
describe('GoogleLinkPendingService setPending (golden WU)', () => {
  it('stores trimmed code/state and rejects empty pairs', () => {
    const svc = Object.create(GoogleLinkPendingService.prototype) as GoogleLinkPendingService;
    Object.assign(svc as any, { pending: null });
    svc.setPending({ code: '  abc  ', state: ' xyz ' });
    expect((svc as any).pending).toEqual({ code: 'abc', state: 'xyz' });
    svc.setPending({ code: '', state: 'xyz' });
    expect((svc as any).pending).toBeNull();
  });
});
