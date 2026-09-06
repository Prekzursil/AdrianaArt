import { CmsPageBlocksComponent } from './cms-page-blocks.component';

/** Golden WU cms-page-blocks-columns-grid-classes — columnsGridClasses. */
describe('CmsPageBlocksComponent columnsGridClasses (golden WU)', () => {
  it('returns empty for non-columns and matrix classes for columns', () => {
    const cmp = Object.create(CmsPageBlocksComponent.prototype) as CmsPageBlocksComponent;
    expect(cmp.columnsGridClasses({ type: 'text' } as any)).toBe('');
    const two = cmp.columnsGridClasses({ type: 'columns', columns_count: 2, breakpoint: 'md' } as any);
    expect(two).toContain('grid');
    expect(two).toContain('md:grid-cols-2');
    const three = cmp.columnsGridClasses({ type: 'columns', columns_count: 3, breakpoint: 'lg' } as any);
    expect(three).toContain('lg:grid-cols-3');
  });
});
