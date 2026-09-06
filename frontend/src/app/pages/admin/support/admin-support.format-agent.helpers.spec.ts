import { AdminSupportComponent } from './admin-support.component';

/** Golden WU support-format-agent — formatAgent. */
describe('AdminSupportComponent formatAgent (golden WU)', () => {
  it('formats username/name/tag and empty fallback', () => {
    const cmp = Object.create(AdminSupportComponent.prototype) as AdminSupportComponent;
    expect(cmp.formatAgent({ username: 'ada', name: 'Ada', name_tag: 1 } as never)).toBe(
      'ada (Ada#1)',
    );
    expect(cmp.formatAgent({ username: 'bob', name: '', name_tag: 0 } as never)).toBe('bob');
    expect(cmp.formatAgent({ username: '', name: '', name_tag: 0 } as never)).toBe('—');
  });
});
