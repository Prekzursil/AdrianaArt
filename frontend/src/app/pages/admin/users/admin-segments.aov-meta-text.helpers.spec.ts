import { AdminSegmentsComponent } from './admin-segments.component';

/** Golden WU — aovMetaText pagination label. */
describe('AdminSegmentsComponent aovMetaText (golden WU)', () => {
  function bare(): AdminSegmentsComponent {
    const cmp = Object.create(AdminSegmentsComponent.prototype) as AdminSegmentsComponent;
    (cmp as any).translate = {
      instant: (_key: string, meta: any) => `a ${meta.page}/${meta.total_pages}`,
    };
    return cmp;
  }

  it('returns empty without meta and formats with translate', () => {
    const cmp = bare();
    (cmp as any).aovMeta = () => null;
    expect(cmp.aovMetaText()).toBe('');
    (cmp as any).aovMeta = () => ({ page: 1, total_pages: 2 });
    expect(cmp.aovMetaText()).toBe('a 1/2');
  });
});
