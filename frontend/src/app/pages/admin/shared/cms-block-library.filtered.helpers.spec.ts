import { CmsBlockLibraryComponent } from './cms-block-library.component';

/** Golden WU cms-block-filtered-helpers. */
describe('CmsBlockLibraryComponent filteredBlocks (golden WU)', () => {
  function bare(overrides: Record<string, unknown> = {}): CmsBlockLibraryComponent {
    const cmp = Object.create(CmsBlockLibraryComponent.prototype) as CmsBlockLibraryComponent;
    Object.assign(cmp as any, {
      blocks: [{ type: 'hero' }, { type: 'text' }, { type: 'gallery' }],
      allowedTypes: null,
      ...overrides,
    });
    return cmp;
  }

  it('filteredBlocks returns all when allowlist empty', () => {
    expect(bare().filteredBlocks().map((b: any) => b.type)).toEqual(['hero', 'text', 'gallery']);
    expect(bare({ allowedTypes: [] }).filteredBlocks().length).toBe(3);
  });

  it('filteredBlocks respects allowedTypes set', () => {
    const cmp = bare({ allowedTypes: ['text', 'gallery'] });
    expect(cmp.filteredBlocks().map((b: any) => b.type)).toEqual(['text', 'gallery']);
  });
});
