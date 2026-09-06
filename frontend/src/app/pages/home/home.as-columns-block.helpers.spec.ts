import { HomeComponent } from './home.component';

describe('HomeComponent asColumnsBlock (golden WU)', () => {
  it('returns columns blocks only', () => {
    const cmp = Object.create(HomeComponent.prototype) as any;
    const columns = { type: 'columns', items: [] };
    expect(cmp.asColumnsBlock(columns)).toBe(columns);
    expect(cmp.asColumnsBlock({ type: 'faq' })).toBeNull();
  });
});
