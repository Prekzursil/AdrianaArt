import { StatusBadgeComponent } from './status-badge.component';

/** Golden WU status-badge-resolve-tone — resolveTone. */
describe('StatusBadgeComponent resolveTone (golden WU)', () => {
  it('maps status values onto badge tones', () => {
    const cmp = Object.create(StatusBadgeComponent.prototype) as StatusBadgeComponent;
    Object.assign(cmp as any, { value: 'paid' });
    expect((cmp as any).resolveTone()).toBe('green');
    Object.assign(cmp as any, { value: 'shipped' });
    expect((cmp as any).resolveTone()).toBe('blue');
    Object.assign(cmp as any, { value: 'draft' });
    expect((cmp as any).resolveTone()).toBe('amber');
    Object.assign(cmp as any, { value: 'cancelled' });
    expect((cmp as any).resolveTone()).toBe('rose');
    Object.assign(cmp as any, { value: 'mystery' });
    expect((cmp as any).resolveTone()).toBe('slate');
  });
});
