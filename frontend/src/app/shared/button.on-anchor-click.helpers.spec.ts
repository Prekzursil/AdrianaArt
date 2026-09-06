import { ButtonComponent } from './button.component';

/** Golden WU button-on-anchor-click — onAnchorClick. */
describe('ButtonComponent onAnchorClick (golden WU)', () => {
  it('blocks navigation only when disabled', () => {
    const cmp = Object.create(ButtonComponent.prototype) as ButtonComponent;
    let prevented = 0;
    let stopped = 0;
    const event = {
      preventDefault: () => {
        prevented += 1;
      },
      stopPropagation: () => {
        stopped += 1;
      },
    } as MouseEvent;
    Object.assign(cmp as any, { disabled: false });
    cmp.onAnchorClick(event);
    expect(prevented).toBe(0);
    Object.assign(cmp as any, { disabled: true });
    cmp.onAnchorClick(event);
    expect(prevented).toBe(1);
    expect(stopped).toBe(1);
  });
});
