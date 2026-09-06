import { ContactComponent } from './contact.component';

describe('ContactComponent initialsForLabel (golden WU)', () => {
  it('builds two-character initials with MS fallback', () => {
    const cmp = Object.create(ContactComponent.prototype) as any;
    expect(cmp.initialsForLabel('')).toBe('MS');
    expect(cmp.initialsForLabel('  Ada  ')).toBe('AD');
    expect(cmp.initialsForLabel('Ada Lovelace')).toBe('AL');
    expect(cmp.initialsForLabel('mary ann evans')).toBe('MA');
  });
});
