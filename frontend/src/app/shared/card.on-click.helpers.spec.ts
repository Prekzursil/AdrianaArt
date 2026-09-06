import { CardComponent } from './card.component';

/** Golden WU card-on-click — onClick. */
describe('CardComponent onClick (golden WU)', () => {
  it('emits only for clickable non-interactive targets', () => {
    const cmp = Object.create(CardComponent.prototype) as CardComponent;
    let emits = 0;
    Object.assign(cmp as any, {
      clickable: false,
      action: { emit: () => { emits += 1; } },
    });
    const plain = { target: { closest: () => null } } as any;
    cmp.onClick(plain);
    expect(emits).toBe(0);
    Object.assign(cmp as any, { clickable: true });
    cmp.onClick(plain);
    expect(emits).toBe(1);
    const nested = { target: { closest: () => ({}) } } as any;
    cmp.onClick(nested);
    expect(emits).toBe(1);
  });
});
