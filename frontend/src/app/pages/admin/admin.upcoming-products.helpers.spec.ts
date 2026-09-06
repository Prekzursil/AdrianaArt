import { AdminComponent } from './admin.component';

/** Golden WU admin-upcoming-products — upcomingProducts. */
describe('AdminComponent upcomingProducts (golden WU)', () => {
  function createCmp(products: Array<{ id: string; publish_at?: string | null }>) {
    const cmp = Object.create(AdminComponent.prototype) as AdminComponent;
    (cmp as any).products = products;
    return cmp;
  }

  it('filters future publish_at and sorts ascending', () => {
    const past = new Date(Date.now() - 86_400_000).toISOString();
    const soon = new Date(Date.now() + 86_400_000).toISOString();
    const later = new Date(Date.now() + 172_800_000).toISOString();
    const cmp = createCmp([
      { id: 'later', publish_at: later },
      { id: 'past', publish_at: past },
      { id: 'none', publish_at: null },
      { id: 'soon', publish_at: soon },
    ]);
    expect(cmp.upcomingProducts().map((p) => p.id)).toEqual(['soon', 'later']);
  });
});
