import { HomeComponent } from './home.component';

/** Golden WU — asFaqBlock / asTestimonialsBlock / focalPosition. */
describe('HomeComponent faq/testimonials/focal helpers (golden WU)', () => {
  function bare(): HomeComponent {
    return Object.create(HomeComponent.prototype) as HomeComponent;
  }

  it('asFaqBlock / asTestimonialsBlock gate on block.type', () => {
    const cmp = bare();
    expect(cmp.asFaqBlock({ type: 'faq' } as any)?.type).toBe('faq');
    expect(cmp.asFaqBlock({ type: 'cta' } as any)).toBeNull();
    expect(cmp.asTestimonialsBlock({ type: 'testimonials' } as any)?.type).toBe('testimonials');
    expect(cmp.asTestimonialsBlock({ type: 'faq' } as any)).toBeNull();
  });

  it('focalPosition clamps and defaults', () => {
    const cmp = bare();
    expect(cmp.focalPosition()).toBe('50% 50%');
    expect(cmp.focalPosition(10, 90)).toBe('10% 90%');
    expect(cmp.focalPosition(-5, 150)).toBe('0% 100%');
    expect(cmp.focalPosition(12.6, 33.4)).toBe('13% 33%');
  });
});
