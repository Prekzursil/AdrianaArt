import { AssetLibraryComponent } from './asset-library.component';

/** Golden WU asset-library-prev — prev. */
describe('AssetLibraryComponent prev (golden WU)', () => {
  it('decrements page only when above one', () => {
    const cmp = Object.create(AssetLibraryComponent.prototype) as AssetLibraryComponent;
    let reloads = 0;
    Object.assign(cmp as any, {
      page: 1,
      reload: () => {
        reloads += 1;
      },
    });
    cmp.prev();
    expect((cmp as any).page).toBe(1);
    expect(reloads).toBe(0);
    Object.assign(cmp as any, { page: 3 });
    cmp.prev();
    expect((cmp as any).page).toBe(2);
    expect(reloads).toBe(1);
  });
});
