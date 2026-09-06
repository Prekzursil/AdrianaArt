import { RecentlyViewedService } from './recently-viewed.service';

/** Golden WU recently-viewed-add — add. */
describe('RecentlyViewedService add (golden WU)', () => {
  it('dedupes by slug, prepends, writes, and returns sliced list', () => {
    const svc = Object.create(RecentlyViewedService.prototype) as RecentlyViewedService;
    const writes: any[] = [];
    Object.assign(svc as any, {
      maxItems: 2,
      read: () => [{ slug: 'a', id: 'a' }, { slug: 'b', id: 'b' }],
      write: (items: any[]) => writes.push(items),
    });
    const product = {
      id: 'b2',
      slug: 'b',
      name: 'Bee',
      base_price: 10,
      currency: 'EUR',
      images: [{ url: 'x' }],
    } as any;
    const out = svc.add(product);
    expect(out.map((i) => i.slug)).toEqual(['b', 'a']);
    expect(out[0]).toEqual({
      id: 'b2',
      slug: 'b',
      name: 'Bee',
      base_price: 10,
      currency: 'EUR',
      images: [{ url: 'x' }],
    });
    expect(writes[0]).toEqual(out);
  });
});
