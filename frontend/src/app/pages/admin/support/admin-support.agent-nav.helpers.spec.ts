import { AdminSupportComponent } from './admin-support.component';

/** Golden WU support-agent-nav-helpers. */
describe('AdminSupportComponent agent/nav helpers (golden WU)', () => {
  function bare(overrides: Record<string, unknown> = {}): AdminSupportComponent {
    const cmp = Object.create(AdminSupportComponent.prototype) as AdminSupportComponent;
    Object.assign(cmp as any, {
      auth: { role: () => 'support' },
      cannedResponses: () => [],
      meta: () => ({ page: 1, total_pages: 1 }),
      ...overrides,
    });
    return cmp;
  }

  it('canEditSlaSettings allows owner/admin only', () => {
    expect(bare().canEditSlaSettings()).toBe(false);
    expect(bare({ auth: { role: () => 'owner' } }).canEditSlaSettings()).toBe(true);
    expect(bare({ auth: { role: () => 'admin' } }).canEditSlaSettings()).toBe(true);
  });

  it('formatAgent prefers name+tag; falls back to username or em dash', () => {
    const cmp = bare();
    expect(cmp.formatAgent({ username: 'alice', name: 'Alice', name_tag: 1 } as any)).toBe(
      'alice (Alice#1)',
    );
    expect(cmp.formatAgent({ username: 'bob', name: '', name_tag: 0 } as any)).toBe('bob');
    expect(cmp.formatAgent({ username: '', name: '', name_tag: 0 } as any)).toBe('—');
  });

  it('activeCannedResponses filters active templates', () => {
    expect(
      bare({
        cannedResponses: () => [
          { id: 1, is_active: true },
          { id: 2, is_active: false },
          null,
        ],
      }).activeCannedResponses().map((t: any) => t.id),
    ).toEqual([1]);
  });

  it('hasPrev / hasNext use meta page bounds', () => {
    expect(bare().hasPrev()).toBe(false);
    expect(bare().hasNext()).toBe(false);
    expect(bare({ meta: () => ({ page: 2, total_pages: 3 }) }).hasPrev()).toBe(true);
    expect(bare({ meta: () => ({ page: 2, total_pages: 3 }) }).hasNext()).toBe(true);
  });
});
