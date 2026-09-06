import { CmsBlockLibraryComponent } from './cms-block-library.component';

/** Golden WU cms-block-library-on-drag-end — onDragEnd. */
describe('CmsBlockLibraryComponent onDragEnd (golden WU)', () => {
  it('emits dragActive false', () => {
    const cmp = Object.create(CmsBlockLibraryComponent.prototype) as CmsBlockLibraryComponent;
    const emitted: boolean[] = [];
    Object.assign(cmp as any, {
      dragActive: { emit: (v: boolean) => emitted.push(v) },
    });
    cmp.onDragEnd();
    expect(emitted).toEqual([false]);
  });
});
