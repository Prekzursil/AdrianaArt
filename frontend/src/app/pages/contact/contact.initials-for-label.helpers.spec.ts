import { ContactComponent } from './contact.component';

describe('ContactComponent initialsForLabel (golden WU)', () => {
  it('builds up to two initials from the label words', () => {
    const cmp = Object.create(ContactComponent.prototype) as any;
    expect(cmp.initialsForLabel('')).toBe('');
    expect(cmp.initialsForLabel('  Ada  ')).toBe('A');
    expect(cmp.initialsForLabel('Ada Lovelace')).toBe('AL');
    expect(cmp.initialsForLabel('mary ann evans')).toBe('MA');
  });
});
