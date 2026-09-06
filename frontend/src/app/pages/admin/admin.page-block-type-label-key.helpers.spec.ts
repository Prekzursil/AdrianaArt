import { AdminComponent } from './admin.component';

/** Golden WU admin-page-block-type-label-key — pageBlockTypeLabelKey. */
describe('AdminComponent pageBlockTypeLabelKey (golden WU)', () => {
  function bare(): AdminComponent {
    return Object.create(AdminComponent.prototype) as AdminComponent;
  }

  it('maps known block types and defaults to text', () => {
    const cmp = bare();
    expect(cmp.pageBlockTypeLabelKey('image')).toBe('adminUi.home.sections.blocks.image');
    expect(cmp.pageBlockTypeLabelKey('cta')).toBe('adminUi.home.sections.blocks.cta');
    expect(cmp.pageBlockTypeLabelKey('gallery')).toBe('adminUi.home.sections.blocks.gallery');
    expect(cmp.pageBlockTypeLabelKey('text')).toBe('adminUi.home.sections.blocks.text');
    expect(cmp.pageBlockTypeLabelKey('nope' as any)).toBe('adminUi.home.sections.blocks.text');
  });
});
