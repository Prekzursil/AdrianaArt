import { SkeletonComponent } from './skeleton.component';

/** Golden WU skeleton-row-indexes — rowIndexes. */
describe('SkeletonComponent rowIndexes (golden WU)', () => {
  it('builds a non-negative index list from rows', () => {
    const cmp = Object.create(SkeletonComponent.prototype) as SkeletonComponent;
    Object.assign(cmp as any, { rows: 3 });
    expect(cmp.rowIndexes()).toEqual([0, 1, 2]);
    Object.assign(cmp as any, { rows: -2 });
    expect(cmp.rowIndexes()).toEqual([]);
    Object.assign(cmp as any, { rows: 2.9 });
    expect(cmp.rowIndexes()).toEqual([0, 1]);
  });
});
