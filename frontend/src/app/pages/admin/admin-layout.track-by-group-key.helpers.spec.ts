import { AdminLayoutComponent } from './admin-layout.component';

/** Golden WU admin-layout-track-by-group-key — trackByGroupKey. */
describe('AdminLayoutComponent trackByGroupKey (golden WU)', () => {
  it('returns group.key', () => {
    const cmp = Object.create(AdminLayoutComponent.prototype) as AdminLayoutComponent;
    expect(cmp.trackByGroupKey(1, { key: 'commerce' } as any)).toBe('commerce');
  });
});
