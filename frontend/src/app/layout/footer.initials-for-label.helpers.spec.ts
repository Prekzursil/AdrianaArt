import { FooterComponent } from './footer.component';

/** Golden WU footer-initials-for-label — initialsForLabel. */
describe('FooterComponent initialsForLabel (golden WU)', () => {
  it('builds two-character initials with MS fallback', () => {
    const cmp = Object.create(FooterComponent.prototype) as any;
    expect(cmp.initialsForLabel('')).toBe('MS');
    expect(cmp.initialsForLabel('  Ada  ')).toBe('AD');
    expect(cmp.initialsForLabel('Ada Lovelace')).toBe('AL');
    expect(cmp.initialsForLabel('mary ann evans')).toBe('MA');
  });
});
