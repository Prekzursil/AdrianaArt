import { AdminContentSchedulingComponent } from './admin-content-scheduling.component';

/** Golden WU content-scheduling-kind-badge — kindBadgeClass. */
describe('AdminContentSchedulingComponent kindBadgeClass (golden WU)', () => {
  it('maps known kinds and defaults', () => {
    const cmp = Object.create(
      AdminContentSchedulingComponent.prototype,
    ) as AdminContentSchedulingComponent;
    // Assert by reading implementation via live method — stub nothing.
    const blog = cmp.kindBadgeClass('blog' as any);
    const page = cmp.kindBadgeClass('page' as any);
    const other = cmp.kindBadgeClass('unknown' as any);
    expect(typeof blog).toBe('string');
    expect(blog).not.toEqual(page);
    expect(other.length).toBeGreaterThan(0);
  });
});
