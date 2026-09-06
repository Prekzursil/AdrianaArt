import { HomeComponent } from './home.component';

describe('HomeComponent asFaqBlock (golden WU)', () => {
  it('returns faq blocks only', () => {
    const cmp = Object.create(HomeComponent.prototype) as any;
    const faq = { type: 'faq', items: [] };
    expect(cmp.asFaqBlock(faq)).toBe(faq);
    expect(cmp.asFaqBlock({ type: 'columns' })).toBeNull();
  });
});
