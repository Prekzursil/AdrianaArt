import { AdminContentSchedulingComponent } from './admin-content-scheduling.component';

/** Golden WU content-scheduling-track-row — trackRow. */
describe('AdminContentSchedulingComponent trackRow (golden WU)', () => {
  it('returns the row key', () => {
    const cmp = Object.create(AdminContentSchedulingComponent.prototype) as AdminContentSchedulingComponent;
    expect(cmp.trackRow(0, { key: 'home' } as any)).toBe('home');
    expect(cmp.trackRow(2, { key: 'about' } as any)).toBe('about');
  });
});
