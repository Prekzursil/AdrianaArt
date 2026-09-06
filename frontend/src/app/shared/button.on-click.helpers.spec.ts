import { ButtonComponent } from './button.component';

/** Golden WU button-on-click — onClick. */
describe('ButtonComponent onClick (golden WU)', () => {
  it('emits action for enabled button type', () => {
    const cmp = Object.create(ButtonComponent.prototype) as ButtonComponent;
    let emits = 0;
    let prevented = 0;
    const event = {
      preventDefault: () => {
        prevented += 1;
      },
      stopPropagation: () => undefined,
    } as MouseEvent;
    Object.assign(cmp as any, {
      disabled: true,
      type: 'button',
      action: { emit: () => { emits += 1; } },
    });
    cmp.onClick(event);
    expect(prevented).toBe(1);
    expect(emits).toBe(0);
    Object.assign(cmp as any, { disabled: false });
    cmp.onClick(event);
    expect(emits).toBe(1);
    Object.assign(cmp as any, { type: 'submit' });
    cmp.onClick(event);
    expect(emits).toBe(1);
  });
});
