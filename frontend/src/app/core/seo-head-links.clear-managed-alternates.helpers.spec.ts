import { SeoHeadLinksService } from './seo-head-links.service';

/** Golden WU seo-head-links-clear-managed-alternates — clearManagedAlternates. */
describe('SeoHeadLinksService clearManagedAlternates (golden WU)', () => {
  it('removes managed alternate link nodes', () => {
    const removed: string[] = [];
    const nodes = [{ remove: () => removed.push('x') }, { remove: () => removed.push('y') }];
    const svc = Object.create(SeoHeadLinksService.prototype) as SeoHeadLinksService;
    Object.assign(svc as any, {
      managedAlternateSelector: 'link[data-ms-alt]',
      document: { querySelectorAll: () => nodes },
    });
    svc.clearManagedAlternates();
    expect(removed).toEqual(['x', 'y']);
  });
});
