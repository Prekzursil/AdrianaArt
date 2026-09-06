import { AdminReturnsComponent } from './admin-returns.component';

/** Golden WU returns-set-view — setView. */
describe('AdminReturnsComponent setView (golden WU)', () => {
  it('no-ops same mode; switches mode, resets page, loads board/list', () => {
    const cmp = Object.create(AdminReturnsComponent.prototype) as AdminReturnsComponent;
    const calls: string[] = [];
    (cmp as any).viewMode = Object.assign(() => 'list', { set: (m: string) => calls.push(`set:${m}`) });
    (cmp as any).page = 9;
    (cmp as any).statusFilter = 'open';
    (cmp as any).loadBoard = () => calls.push('board');
    (cmp as any).load = () => calls.push('list');

    cmp.setView('list');
    expect(calls).toEqual([]);
    expect(cmp.page).toBe(9);

    (cmp as any).viewMode = Object.assign(() => 'list', { set: (m: string) => calls.push(`set:${m}`) });
    cmp.setView('board');
    expect(calls).toEqual(['set:board', 'board']);
    expect(cmp.page).toBe(1);
    expect(cmp.statusFilter).toBe('');

    calls.length = 0;
    (cmp as any).viewMode = Object.assign(() => 'board', { set: (m: string) => calls.push(`set:${m}`) });
    (cmp as any).page = 4;
    cmp.setView('list');
    expect(calls).toEqual(['set:list', 'list']);
    expect(cmp.page).toBe(1);
  });
});
