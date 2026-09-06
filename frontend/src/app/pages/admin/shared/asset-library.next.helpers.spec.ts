import { AssetLibraryComponent } from './asset-library.component';

/** Golden WU asset-library-next — next. */
describe('AssetLibraryComponent next (golden WU)', () => {
  it('increments page only when below total', () => {
    const cmp = Object.create(AssetLibraryComponent.prototype) as AssetLibraryComponent;
    let reloads = 0;
    Object.assign(cmp as any, {
      page: 3,
      totalPages: () => 3,
      reload: () => {
        reloads += 1;
      },
    });
    cmp.next();
    expect((cmp as any).page).toBe(3);
    expect(reloads).toBe(0);
    Object.assign(cmp as any, { page: 2, totalPages: () => 4 });
    cmp.next();
    expect((cmp as any).page).toBe(3);
    expect(reloads).toBe(1);
  });
});
