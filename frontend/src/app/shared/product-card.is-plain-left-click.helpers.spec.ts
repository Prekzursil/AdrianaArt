import { ProductCardComponent } from './product-card.component';

/** Golden WU product-card-is-plain-left-click — isPlainLeftClick. */
describe('ProductCardComponent isPlainLeftClick (golden WU)', () => {
  it('accepts only unmodified primary button clicks', () => {
    const cmp = Object.create(ProductCardComponent.prototype) as ProductCardComponent;
    const mk = (partial: Partial<MouseEvent>) => partial as MouseEvent;
    expect((cmp as any).isPlainLeftClick(mk({ button: 0 }))).toBe(true);
    expect((cmp as any).isPlainLeftClick(mk({ button: 1 }))).toBe(false);
    expect((cmp as any).isPlainLeftClick(mk({ button: 0, metaKey: true }))).toBe(false);
    expect((cmp as any).isPlainLeftClick(mk({ button: 0, ctrlKey: true }))).toBe(false);
    expect((cmp as any).isPlainLeftClick(mk({ button: 0, shiftKey: true }))).toBe(false);
    expect((cmp as any).isPlainLeftClick(mk({ button: 0, altKey: true }))).toBe(false);
  });
});
