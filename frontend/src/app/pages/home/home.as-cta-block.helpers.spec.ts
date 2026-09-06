import { HomeComponent } from './home.component';

/** Golden WU home-as-cta-block — asCtaBlock. */
describe('HomeComponent asCtaBlock (golden WU)', () => {
  it('returns cta blocks only', () => {
    const cmp = Object.create(HomeComponent.prototype) as HomeComponent;
    const cta = { type: 'cta', label: 'Go' } as any;
    expect(cmp.asCtaBlock(cta)).toBe(cta);
    expect(cmp.asCtaBlock({ type: 'gallery' } as any)).toBeNull();
  });
});
