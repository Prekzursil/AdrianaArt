import { AssetLibraryComponent } from './asset-library.component';

/** Golden WU asset-library-apply-tag-filter — applyTagFilter. */
describe('AssetLibraryComponent applyTagFilter (golden WU)', () => {
  it('sets tag and reloads when non-empty', () => {
    const cmp = Object.create(AssetLibraryComponent.prototype) as AssetLibraryComponent;
    let reloads: boolean[] = [];
    Object.assign(cmp as any, {
      tag: '',
      reload: (reset?: boolean) => {
        reloads.push(!!reset);
      },
    });
    cmp.applyTagFilter('   ');
    expect((cmp as any).tag).toBe('');
    expect(reloads).toEqual([]);
    cmp.applyTagFilter('  hero  ');
    expect((cmp as any).tag).toBe('hero');
    expect(reloads).toEqual([true]);
  });
});
