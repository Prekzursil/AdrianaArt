import { AdminSupportComponent } from './admin-support.component';

describe('AdminSupportComponent formatAgent (golden WU)', () => {
  it('formats name+tag, username-only, and empty fallback', () => {
    const cmp = Object.create(AdminSupportComponent.prototype) as AdminSupportComponent;
    expect(cmp.formatAgent({ username: 'alice', name: 'Alice', name_tag: 42 } as any)).toBe(
      'alice (Alice#42)',
    );
    expect(cmp.formatAgent({ username: 'bob', name: '', name_tag: 1 } as any)).toBe('bob');
    expect(cmp.formatAgent({ username: '', name: '', name_tag: 0 } as any)).toBe('—');
    expect(cmp.formatAgent({ username: '  ', name: '  ', name_tag: Number.NaN } as any)).toBe('—');
  });
});
