import { AdminGdprComponent } from './admin-gdpr.component';

/** Golden WU — exportsMetaText pagination label. */
describe('AdminGdprComponent exportsMetaText (golden WU)', () => {
  function bare(): AdminGdprComponent {
    const cmp = Object.create(AdminGdprComponent.prototype) as AdminGdprComponent;
    (cmp as any).translate = {
      instant: (_key: string, meta: any) => `page ${meta.page}/${meta.total_pages}`,
    };
    return cmp;
  }

  it('returns empty without meta and formats with translate', () => {
    const cmp = bare();
    (cmp as any).exportsMeta = () => null;
    expect(cmp.exportsMetaText()).toBe('');
    (cmp as any).exportsMeta = () => ({ page: 2, total_pages: 5 });
    expect(cmp.exportsMetaText()).toBe('page 2/5');
  });
});
