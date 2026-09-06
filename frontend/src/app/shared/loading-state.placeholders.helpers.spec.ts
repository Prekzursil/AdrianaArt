import { LoadingStateComponent } from './loading-state.component';

/** Golden WU loading-state-placeholders — placeholders. */
describe('LoadingStateComponent placeholders (golden WU)', () => {
  it('builds a 0..n-1 index list and clamps rows to at least 1', () => {
    const cmp = Object.create(LoadingStateComponent.prototype) as LoadingStateComponent;
    Object.assign(cmp as any, { rows: 3 });
    expect(cmp.placeholders).toEqual([0, 1, 2]);
    Object.assign(cmp as any, { rows: 0 });
    expect(cmp.placeholders).toEqual([0]);
    Object.assign(cmp as any, { rows: -5 });
    expect(cmp.placeholders).toEqual([0]);
  });
});
