import { GoogleLinkPendingService } from './google-link-pending.service';

/** Golden WU google-link-pending-set — setPending. */
describe('GoogleLinkPendingService setPending (golden WU)', () => {
  it('stores trimmed code/state or clears when blank', () => {
    const svc = new GoogleLinkPendingService();
    svc.setPending({ code: '  abc  ', state: ' xyz ' });
    expect(svc.getPending()).toEqual({ code: 'abc', state: 'xyz' });
    svc.setPending({ code: '', state: 'xyz' });
    expect(svc.getPending()).toBeNull();
  });
});
