import { HomeComponent } from './home.component';

/** Golden WU home-as-text-block — asTextBlock. */
describe('HomeComponent asTextBlock (golden WU)', () => {
  it('returns block when type is text else null', () => {
    const cmp = Object.create(HomeComponent.prototype) as HomeComponent;
    const text = { type: 'text', body: 'hi' } as any;
    expect(cmp.asTextBlock(text)).toBe(text);
    expect(cmp.asTextBlock({ type: 'gallery' } as any)).toBeNull();
  });
});
