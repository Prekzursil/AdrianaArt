import { ARCHETYPES } from './token-taxonomy';

/** Golden WU archetypes -- ARCHETYPES. */
describe('ARCHETYPES (golden WU)', () => {
  it('orders home / listing / detail', () => {
    expect(ARCHETYPES).toEqual(['home', 'listing', 'detail']);
  });
});
