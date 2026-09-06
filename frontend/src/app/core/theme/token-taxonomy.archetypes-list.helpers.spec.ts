import { ARCHETYPES } from './token-taxonomy';

/** Golden WU archetypes-list -- ARCHETYPES. */
describe('ARCHETYPES (golden WU)', () => {
  it('pins home/listing/detail in canonical order', () => {
    expect(ARCHETYPES).toEqual(['home', 'listing', 'detail']);
    expect(ARCHETYPES.length).toBe(3);
  });
});
