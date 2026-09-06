import { AdminSegmentsComponent } from './admin-segments.component';

/** Golden WU — repeatMetaText pagination label. */
describe('AdminSegmentsComponent repeatMetaText (golden WU)', () => {
  function bare(): AdminSegmentsComponent {
    const cmp = Object.create(AdminSegmentsComponent.prototype) as AdminSegmentsComponent;
    (cmp as any).translate = {
      instant: (_key: string, meta: any) => `r ${meta.page}/${meta.total_pages}`,
    };
    return cmp;
  }

  it('returns empty without meta and formats with translate', () => {
    const cmp = bare();
    (cmp as any).repeatMeta = () => null;
    expect(cmp.repeatMetaText()).toBe('');
    (cmp as any).repeatMeta = () => ({ page: 4, total_pages: 9 });
    expect(cmp.repeatMetaText()).toBe('r 4/9');
  });
});
