import { HomeComponent } from './home.component';

describe('HomeComponent columnsGridClasses (golden WU)', () => {
  const cmp = Object.create(HomeComponent.prototype) as HomeComponent;

  it('joins base grid classes with columns_count x breakpoint matrix', () => {
    expect(cmp.columnsGridClasses({ columns_count: 2, breakpoint: 'md' } as any)).toBe(
      'grid gap-6 grid-cols-1 md:grid-cols-2',
    );
    expect(cmp.columnsGridClasses({ columns_count: 3, breakpoint: 'lg' } as any)).toBe(
      'grid gap-6 grid-cols-1 lg:grid-cols-3',
    );
    expect(cmp.columnsGridClasses({ columns_count: 3, breakpoint: 'sm' } as any)).toBe(
      'grid gap-6 grid-cols-1 sm:grid-cols-3',
    );
  });
});
