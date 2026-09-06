import { HomeComponent } from './home.component';

/** Golden WU home-as-testimonials-block — asTestimonialsBlock. */
describe('HomeComponent asTestimonialsBlock (golden WU)', () => {
  function bare(): HomeComponent {
    return Object.create(HomeComponent.prototype) as HomeComponent;
  }

  it('returns testimonials blocks and null otherwise', () => {
    const cmp = bare();
    const ok = { type: 'testimonials', items: [] } as any;
    const other = { type: 'hero' } as any;
    expect(cmp.asTestimonialsBlock(ok)).toBe(ok);
    expect(cmp.asTestimonialsBlock(other)).toBeNull();
  });
});
