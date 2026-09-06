import { ShopComponent } from './shop.component';

describe('ShopComponent canSaveCreateCategory (golden WU)', () => {
  function make(partial: Record<string, unknown>) {
    const cmp = Object.create(ShopComponent.prototype) as ShopComponent;
    Object.assign(cmp as any, {
      createSaving: false,
      createNameRo: '',
      createNameEn: '',
      ...partial,
    });
    return cmp;
  }
  it('requires both names and rejects while saving', () => {
    expect(make({ createNameRo: 'a', createNameEn: 'b' }).canSaveCreateCategory()).toBe(true);
    expect(make({ createNameRo: ' a ', createNameEn: ' ' }).canSaveCreateCategory()).toBe(false);
    expect(make({ createNameRo: 'a', createNameEn: 'b', createSaving: true }).canSaveCreateCategory()).toBe(false);
  });
});
