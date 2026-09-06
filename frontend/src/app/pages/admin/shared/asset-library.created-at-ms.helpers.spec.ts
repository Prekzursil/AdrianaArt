import { AssetLibraryComponent } from './asset-library.component';

/** Golden WU asset-library-created-at-ms — createdAtMs. */
describe('AssetLibraryComponent createdAtMs (golden WU)', () => {
  it('parses ISO timestamps and falls back to 0', () => {
    const cmp = Object.create(AssetLibraryComponent.prototype) as AssetLibraryComponent;
    expect((cmp as any).createdAtMs('2020-01-01T00:00:00.000Z')).toBe(Date.parse('2020-01-01T00:00:00.000Z'));
    expect((cmp as any).createdAtMs('not-a-date')).toBe(0);
    expect((cmp as any).createdAtMs(null)).toBe(0);
  });
});
