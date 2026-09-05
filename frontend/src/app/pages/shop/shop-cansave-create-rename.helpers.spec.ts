import { ShopComponent } from './shop.component';

describe('ShopComponent create/rename save gates (golden WU #771 sidecar)', () => {
  function make(overrides: Record<string, unknown> = {}): any {
    const proto = Object.create(ShopComponent.prototype);
    Object.assign(
      proto,
      {
        createSaving: false,
        createNameRo: '',
        createNameEn: '',
        createError: 'x',
        creatingCategoryParentSlug: 'parent',
        renameLoading: false,
        renameSaving: false,
        renameNameRo: '',
        renameNameEn: '',
      },
      overrides,
    );
    return proto;
  }

  describe('canSaveCreateCategory', () => {
    it('requires both trimmed names and blocks while saving', () => {
      expect(make({ createNameRo: 'A', createNameEn: 'B' }).canSaveCreateCategory()).toBe(true);
      expect(make({ createNameRo: '  ', createNameEn: 'B' }).canSaveCreateCategory()).toBe(false);
      expect(make({ createNameRo: 'A', createNameEn: '' }).canSaveCreateCategory()).toBe(false);
      expect(
        make({ createSaving: true, createNameRo: 'A', createNameEn: 'B' }).canSaveCreateCategory(),
      ).toBe(false);
    });
  });

  describe('canSaveRename', () => {
    it('requires both trimmed names and blocks while loading/saving', () => {
      expect(make({ renameNameRo: 'A', renameNameEn: 'B' }).canSaveRename()).toBe(true);
      expect(make({ renameNameRo: 'A', renameNameEn: '  ' }).canSaveRename()).toBe(false);
      expect(make({ renameLoading: true, renameNameRo: 'A', renameNameEn: 'B' }).canSaveRename()).toBe(
        false,
      );
      expect(make({ renameSaving: true, renameNameRo: 'A', renameNameEn: 'B' }).canSaveRename()).toBe(
        false,
      );
    });
  });

  describe('cancelCreateCategory', () => {
    it('clears create draft fields', () => {
      const c = make({
        creatingCategoryParentSlug: 'p',
        createSaving: true,
        createError: 'e',
        createNameRo: 'ro',
        createNameEn: 'en',
      });
      c.cancelCreateCategory();
      expect(c.creatingCategoryParentSlug).toBeNull();
      expect(c.createSaving).toBe(false);
      expect(c.createError).toBe('');
      expect(c.createNameRo).toBe('');
      expect(c.createNameEn).toBe('');
    });
  });
});
