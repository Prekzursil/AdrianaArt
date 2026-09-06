import { ContactComponent } from './contact.component';

/** Golden WU contact-focal-position — focalPosition. */
describe('ContactComponent focalPosition (golden WU)', () => {
  function bare(): ContactComponent {
    return Object.create(ContactComponent.prototype) as ContactComponent;
  }

  it('clamps and defaults to 50% 50%', () => {
    const cmp = bare();
    expect(cmp.focalPosition()).toBe('50% 50%');
    expect(cmp.focalPosition(0, 100)).toBe('0% 100%');
    expect(cmp.focalPosition(-10, 150)).toBe('0% 100%');
    expect(cmp.focalPosition(33.6, 66.4)).toBe('34% 66%');
  });
});
