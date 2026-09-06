import { AdminComponent } from './admin.component';

/** Golden WU admin-build-tags — buildTags. */
describe('AdminComponent buildTags (golden WU)', () => {
  function createCmp(isBestseller: boolean, detailTags: string[] | null) {
    const cmp = Object.create(AdminComponent.prototype) as AdminComponent;
    (cmp as any).form = { is_bestseller: isBestseller };
    (cmp as any).productDetail = detailTags == null ? null : { tags: detailTags };
    return cmp;
  }

  it('unions bestseller flag with productDetail tags', () => {
    expect(createCmp(false, null).buildTags()).toEqual([]);
    expect(createCmp(true, null).buildTags()).toEqual(['bestseller']);
    expect(createCmp(false, ['sale', 'new']).buildTags()).toEqual(['sale', 'new']);
    expect(createCmp(true, ['sale', 'bestseller']).buildTags()).toEqual(['bestseller', 'sale']);
  });
});
