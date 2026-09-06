import { AdminReturnsComponent } from './admin-returns.component';

/** Golden WU returns-open-status-list — openStatusList. */
describe('AdminReturnsComponent openStatusList (golden WU)', () => {
  it('forces list view, sets status filter, resets page, reloads', () => {
    const cmp = Object.create(AdminReturnsComponent.prototype) as AdminReturnsComponent;
    const calls: string[] = [];
    (cmp as any).viewMode = { set: (m: string) => calls.push(`view:${m}`) };
    (cmp as any).page = 7;
    (cmp as any).statusFilter = '';
    (cmp as any).load = (flag?: boolean) => calls.push(`load:${flag}`);
    cmp.openStatusList('approved' as any);
    expect(calls).toEqual(['view:list', 'load:false']);
    expect(cmp.statusFilter).toBe('approved');
    expect(cmp.page).toBe(1);
  });
});
