import { SkeletonComponent } from './skeleton.component';

/** Golden WU skeleton-row-width — rowWidth. */
describe('SkeletonComponent rowWidth (golden WU)', () => {
  it('tapers trailing rows when width is 100%', () => {
    const cmp = Object.create(SkeletonComponent.prototype) as SkeletonComponent;
    Object.assign(cmp as any, { rows: 1, width: '100%' });
    expect(cmp.rowWidth(0)).toBe('100%');
    Object.assign(cmp as any, { rows: 3, width: '80%' });
    expect(cmp.rowWidth(2)).toBe('80%');
    Object.assign(cmp as any, { rows: 3, width: '100%' });
    expect(cmp.rowWidth(2)).toBe('72%');
    expect(cmp.rowWidth(1)).toBe('88%');
    expect(cmp.rowWidth(0)).toBe('100%');
  });
});
