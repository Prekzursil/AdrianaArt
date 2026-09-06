import { StructuredDataService } from './structured-data.service';

/** Golden WU structured-data-clear-route-schemas — clearRouteSchemas. */
describe('StructuredDataService clearRouteSchemas (golden WU)', () => {
  it('removes every managed script node', () => {
    const removed: string[] = [];
    const nodes = [
      { id: 'a', remove: () => removed.push('a') },
      { id: 'b', remove: () => removed.push('b') },
    ];
    const svc = Object.create(StructuredDataService.prototype) as StructuredDataService;
    Object.assign(svc as any, {
      managedSelector: 'script[data-ms]',
      document: { querySelectorAll: () => nodes },
    });
    svc.clearRouteSchemas();
    expect(removed).toEqual(['a', 'b']);
  });
});
