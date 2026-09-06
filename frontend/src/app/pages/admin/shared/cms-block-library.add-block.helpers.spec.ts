import { CmsBlockLibraryComponent } from './cms-block-library.component';

/** Golden WU cms-block-library-add-block — addBlock. */
describe('CmsBlockLibraryComponent addBlock (golden WU)', () => {
  it('emits type with current template', () => {
    const cmp = Object.create(CmsBlockLibraryComponent.prototype) as CmsBlockLibraryComponent;
    const emitted: any[] = [];
    Object.assign(cmp as any, {
      template: () => 'hero',
      add: { emit: (v: any) => emitted.push(v) },
    });
    cmp.addBlock('text' as any);
    expect(emitted).toEqual([{ type: 'text', template: 'hero' }]);
  });
});
