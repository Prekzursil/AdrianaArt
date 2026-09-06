import { StatusBadgeComponent } from './status-badge.component';

/** Golden WU status-badge-classes — classes. */
describe('StatusBadgeComponent classes (golden WU)', () => {
  it('maps status values to tone utility classes', () => {
    const cmp = Object.create(StatusBadgeComponent.prototype) as StatusBadgeComponent;
    Object.assign(cmp as any, { value: 'paid' });
    expect(cmp.classes).toContain('bg-emerald-50');
    Object.assign(cmp as any, { value: 'processing' });
    expect(cmp.classes).toContain('bg-indigo-50');
    Object.assign(cmp as any, { value: 'pending' });
    expect(cmp.classes).toContain('bg-amber-50');
    Object.assign(cmp as any, { value: 'cancelled' });
    expect(cmp.classes).toContain('bg-rose-50');
    Object.assign(cmp as any, { value: 'unknown' });
    expect(cmp.classes).toContain('bg-slate-50');
  });
});
