import { ARCHETYPES } from './token-taxonomy';

/** Golden WU archetypes-pin -- ARCHETYPES. */
describe('ARCHETYPES (golden WU)', () => {
  it('pins home, listing, and detail', () => {
    expect(ARCHETYPES).toEqual(['home', 'listing', 'detail']);
  });
});
