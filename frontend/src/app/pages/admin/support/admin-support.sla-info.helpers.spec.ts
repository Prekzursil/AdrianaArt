import { AdminSupportComponent } from './admin-support.component';

/** Golden WU — slaInfo label/class for open tickets. */
describe('AdminSupportComponent slaInfo (golden WU)', () => {
  function bare(): AdminSupportComponent {
    const cmp = Object.create(AdminSupportComponent.prototype) as AdminSupportComponent;
    (cmp as any).slaFirstReplyHours = 24;
    (cmp as any).slaResolveHours = 72;
    (cmp as any).formatDuration = (ms: number) => `${Math.round(ms / 3600000)}h`;
    (cmp as any).translate = {
      instant: (key: string, params?: any) =>
        params?.duration ? `${key}:${params.duration}` : key,
    };
    return cmp;
  }

  it('returns null for invalid/resolved and labels open tickets', () => {
    const cmp = bare();
    expect(cmp.slaInfo({ created_at: 'nope', status: 'new' } as any)).toBeNull();
    expect(
      cmp.slaInfo({ created_at: '2020-01-01T00:00:00Z', status: 'resolved' } as any),
    ).toBeNull();

    const overdue = cmp.slaInfo({
      created_at: '2020-01-01T00:00:00Z',
      status: 'new',
    } as any)!;
    expect(overdue.label).toContain('adminUi.support.sla.reply');
    expect(overdue.label).toContain('adminUi.support.sla.overdue');
    expect(overdue.class).toContain('rose');

    const fresh = cmp.slaInfo({
      created_at: new Date().toISOString(),
      status: 'open',
    } as any)!;
    expect(fresh.label).toContain('adminUi.support.sla.resolve');
    expect(fresh.class).toContain('slate');
  });
});
