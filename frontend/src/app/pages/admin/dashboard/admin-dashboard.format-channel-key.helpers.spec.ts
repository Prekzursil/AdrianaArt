import { AdminDashboardComponent } from './admin-dashboard.component';

/** Golden WU tip — formatChannelKey. */
describe('AdminDashboardComponent formatChannelKey (golden WU)', () => {
  it('trims, replaces underscores, empty => em dash', () => {
    const cmp = Object.create(AdminDashboardComponent.prototype) as AdminDashboardComponent;
    expect(cmp.formatChannelKey('online_store')).toBe('online store');
    expect(cmp.formatChannelKey('  pos  ')).toBe('pos');
    expect(cmp.formatChannelKey('')).toBe('—');
    expect(cmp.formatChannelKey(null as any)).toBe('—');
  });
});
