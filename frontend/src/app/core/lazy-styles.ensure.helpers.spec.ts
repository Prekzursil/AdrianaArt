import { LazyStylesService } from './lazy-styles.service';

/** Golden WU lazy-styles-ensure — ensure. */
describe('LazyStylesService ensure (golden WU)', () => {
  it('resolves immediately when stylesheet link already exists', async () => {
    const svc = Object.create(LazyStylesService.prototype) as LazyStylesService;
    Object.assign(svc as any, {
      document: {
        querySelector: () => ({ rel: 'stylesheet' }),
      },
      inflight: new Map(),
    });
    await expect(svc.ensure('x', '/x.css')).resolves.toBeUndefined();
  });
});
