import { ButtonComponent } from './button.component';

/** Golden WU button-classes — classes. */
describe('ButtonComponent classes (golden WU)', () => {
  it('composes variant, size, and disabled utilities', () => {
    const cmp = Object.create(ButtonComponent.prototype) as ButtonComponent;
    Object.assign(cmp as any, { variant: 'primary', size: 'md', disabled: false });
    expect(cmp.classes).toContain('bg-slate-900');
    expect(cmp.classes).toContain('px-4');
    Object.assign(cmp as any, { variant: 'secondary', size: 'sm', disabled: true });
    expect(cmp.classes).toContain('bg-white');
    expect(cmp.classes).toContain('px-3');
    expect(cmp.classes).toContain('opacity-60');
    expect(cmp.classes).toContain('pointer-events-none');
  });
});
