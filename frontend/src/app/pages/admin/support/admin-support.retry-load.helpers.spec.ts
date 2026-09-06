import { AdminSupportComponent } from './admin-support.component';

/** Golden WU admin-support-retry-load -- retryLoad. */
describe('AdminSupportComponent retryLoad (golden WU)', () => {
  it('delegates to load', () => {
    const cmp = Object.create(AdminSupportComponent.prototype) as AdminSupportComponent;
    Object.assign(cmp as any, { load: jasmine.createSpy('load') });
    cmp.retryLoad();
    expect((cmp as any).load).toHaveBeenCalled();
  });
});
