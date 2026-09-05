import { ShopComponent } from './shop.component';

/** Golden WU shop-create-category — N=3 canSaveCreateCategory / cancelCreateCategory / isCreatingRootCategory. */
describe('ShopComponent create-category helpers (golden WU)', () => {
  function createCmp(overrides: Record<string, unknown> = {}): ShopComponent {
    const cmp = Object.create(ShopComponent.prototype) as ShopComponent;
    (cmp as any).creatingCategoryParentSlug = null;
    (cmp as any).createSaving = false;
    (cmp as any).createError = 'err';
    (cmp as any).createNameRo = '';
    (cmp as any).createNameEn = '';
    Object.assign(cmp as any, overrides);
    return cmp;
  }

  it('canSaveCreateCategory requires idle createSaving and both trimmed names', () => {
    expect(createCmp({ createNameRo: 'Ro', createNameEn: 'En' }).canSaveCreateCategory()).toBe(
      true,
    );
    expect(
      createCmp({ createSaving: true, createNameRo: 'Ro', createNameEn: 'En' }).canSaveCreateCategory(),
    ).toBe(false);
    expect(createCmp({ createNameRo: '  ', createNameEn: 'En' }).canSaveCreateCategory()).toBe(
      false,
    );
    expect(createCmp({ createNameRo: 'Ro', createNameEn: '' }).canSaveCreateCategory()).toBe(
      false,
    );
  });

  it('cancelCreateCategory clears create draft state', () => {
    const cmp = createCmp({
      creatingCategoryParentSlug: 'mugs',
      createSaving: true,
      createError: 'boom',
      createNameRo: 'Ro',
      createNameEn: 'En',
    });
    cmp.cancelCreateCategory();
    expect((cmp as any).creatingCategoryParentSlug).toBeNull();
    expect((cmp as any).createSaving).toBe(false);
    expect((cmp as any).createError).toBe('');
    expect((cmp as any).createNameRo).toBe('');
    expect((cmp as any).createNameEn).toBe('');
  });

  it('isCreatingRootCategory is true only when parent slug is empty string', () => {
    expect(createCmp().isCreatingRootCategory()).toBe(false);
    expect(createCmp({ creatingCategoryParentSlug: 'mugs' }).isCreatingRootCategory()).toBe(false);
    expect(createCmp({ creatingCategoryParentSlug: '' }).isCreatingRootCategory()).toBe(true);
  });
});
