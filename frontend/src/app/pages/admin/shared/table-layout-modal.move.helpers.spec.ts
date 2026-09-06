import { TableLayoutModalComponent } from './table-layout-modal.component';

/** Golden WU table-layout-modal-move — move. */
describe('TableLayoutModalComponent move (golden WU)', () => {
  it('swaps adjacent draftOrder entries within bounds', () => {
    const cmp = Object.create(TableLayoutModalComponent.prototype) as TableLayoutModalComponent;
    Object.assign(cmp as any, { draftOrder: ['a', 'b', 'c'] });
    cmp.move(0, -1);
    expect((cmp as any).draftOrder).toEqual(['a', 'b', 'c']);
    cmp.move(2, 1);
    expect((cmp as any).draftOrder).toEqual(['a', 'b', 'c']);
    cmp.move(0, 1);
    expect((cmp as any).draftOrder).toEqual(['b', 'a', 'c']);
  });
});
