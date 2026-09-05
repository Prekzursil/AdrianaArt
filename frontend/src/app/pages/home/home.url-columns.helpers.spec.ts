import { HomeComponent } from './home.component';

/** Golden WU home-url-columns — isExternalHttpUrl/columnsGridClasses/focalPosition. */
describe('HomeComponent url/columns/focal helpers (golden WU)', () => {
  function createCmp() {
    return Object.create(HomeComponent.prototype) as HomeComponent;
  }

  it('isExternalHttpUrl accepts http(s) and rejects others', () => {
    const cmp = createCmp();
    expect(cmp.isExternalHttpUrl(null)).toBe(false);
    expect(cmp.isExternalHttpUrl('')).toBe(false);
    expect(cmp.isExternalHttpUrl('/local')).toBe(false);
    expect(cmp.isExternalHttpUrl(' HTTP://x ')).toBe(true);
    expect(cmp.isExternalHttpUrl('https://x')).toBe(true);
  });

  it('columnsGridClasses maps count+breakpoint tokens', () => {
    const cmp = createCmp();
    expect(cmp.columnsGridClasses({ columns_count: 2, breakpoint: 'md' } as any)).toBe(
      'grid gap-6 grid-cols-1 md:grid-cols-2',
    );
    expect(cmp.columnsGridClasses({ columns_count: 3, breakpoint: 'lg' } as any)).toBe(
      'grid gap-6 grid-cols-1 lg:grid-cols-3',
    );
  });

  it('focalPosition clamps and defaults', () => {
    const cmp = createCmp();
    expect(cmp.focalPosition()).toBe('50% 50%');
    expect(cmp.focalPosition(3.6, 99.4)).toBe('4% 99%');
    expect(cmp.focalPosition(-10, 500)).toBe('0% 100%');
  });
});
