import { AssetLibraryComponent } from './asset-library.component';

/** Golden WU asset-library-focal-object-position — focalObjectPosition. */
describe('AssetLibraryComponent focalObjectPosition (golden WU)', () => {
  it('formats focalDraftX/Y as object-position percents', () => {
    const cmp = Object.create(AssetLibraryComponent.prototype) as AssetLibraryComponent;
    (cmp as any).focalDraftX = 25;
    (cmp as any).focalDraftY = 75;
    expect(cmp.focalObjectPosition()).toBe('25% 75%');
  });
});
