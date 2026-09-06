import { signal } from '@angular/core';
import { AdminSupportComponent } from './admin-support.component';

/** Golden WU support-format-duration-helpers. */
describe('AdminSupportComponent format/agent helpers (golden WU)', () => {
  function bare(overrides: Record<string, unknown> = {}): AdminSupportComponent {
    const cmp = Object.create(AdminSupportComponent.prototype) as AdminSupportComponent;
    Object.assign(cmp as any, {
      auth: { role: () => 'customer' },
      cannedResponses: signal([]),
      ...overrides,
    });
    return cmp;
  }

  it('formatDuration builds d/h/m parts', () => {
    const fmt = (AdminSupportComponent.prototype as any).formatDuration.bind(bare());
    expect(fmt(0)).toBe('0m');
    expect(fmt(90_000)).toBe('1m');
    expect(fmt(3_600_000)).toBe('1h 0m');
    expect(fmt(90_000_000)).toBe('1d 1h 0m');
  });

  it('formatAgent prefers name#tag and falls back', () => {
    const cmp = bare();
    expect(cmp.formatAgent({ username: 'a', name: 'Ann', name_tag: 7 } as any)).toBe('a (Ann#7)');
    expect(cmp.formatAgent({ username: 'solo' } as any)).toBe('solo');
    expect(cmp.formatAgent({} as any)).toBe('—');
  });

  it('canEditSlaSettings and activeCannedResponses gate/filter', () => {
    expect(bare().canEditSlaSettings()).toBe(false);
    expect(bare({ auth: { role: () => 'owner' } }).canEditSlaSettings()).toBe(true);
    expect(bare({ auth: { role: () => 'admin' } }).canEditSlaSettings()).toBe(true);
    const cmp = bare({
      cannedResponses: signal([
        { id: '1', is_active: true },
        { id: '2', is_active: false },
        null,
      ]),
    });
    expect(cmp.activeCannedResponses().map((t: any) => t.id)).toEqual(['1']);
  });
});
