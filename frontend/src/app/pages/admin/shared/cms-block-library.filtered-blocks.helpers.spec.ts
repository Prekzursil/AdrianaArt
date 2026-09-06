import { CmsBlockLibraryComponent } from './cms-block-library.component';

/** Golden WU cms-block-library-filtered-blocks — filteredBlocks. */
describe('CmsBlockLibraryComponent filteredBlocks (golden WU)', () => {
  it('returns all blocks or filters by allowedTypes', () => {
    const cmp = Object.create(CmsBlockLibraryComponent.prototype) as CmsBlockLibraryComponent;
    const blocks = [{ type: 'text' }, { type: 'image' }, { type: 'hero' }] as any;
    Object.assign(cmp as any, { blocks, allowedTypes: null });
    expect(cmp.filteredBlocks()).toEqual(blocks);
    Object.assign(cmp as any, { allowedTypes: [] });
    expect(cmp.filteredBlocks()).toEqual(blocks);
    Object.assign(cmp as any, { allowedTypes: ['text', 'hero'] });
    expect(cmp.filteredBlocks().map((b: any) => b.type)).toEqual(['text', 'hero']);
  });
});
