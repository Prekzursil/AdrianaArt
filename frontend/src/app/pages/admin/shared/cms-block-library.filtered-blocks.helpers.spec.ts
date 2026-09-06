import { CmsBlockLibraryComponent } from './cms-block-library.component';

/** Golden WU — filteredBlocks respects allowedTypes. */
describe('CmsBlockLibraryComponent filteredBlocks (golden WU)', () => {
  function bare(): CmsBlockLibraryComponent {
    const cmp = Object.create(CmsBlockLibraryComponent.prototype) as CmsBlockLibraryComponent;
    (cmp as any).blocks = [
      { type: 'hero' },
      { type: 'rich_text' },
      { type: 'gallery' },
    ];
    return cmp;
  }

  it('returns all when allowedTypes empty/null, else filters', () => {
    const cmp = bare();
    (cmp as any).allowedTypes = null;
    expect(cmp.filteredBlocks().map((b: any) => b.type)).toEqual(['hero', 'rich_text', 'gallery']);
    (cmp as any).allowedTypes = [];
    expect(cmp.filteredBlocks().map((b: any) => b.type)).toEqual(['hero', 'rich_text', 'gallery']);
    (cmp as any).allowedTypes = ['hero', 'gallery'];
    expect(cmp.filteredBlocks().map((b: any) => b.type)).toEqual(['hero', 'gallery']);
  });
});
