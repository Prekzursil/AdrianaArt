import { AdminGdprComponent } from './admin-gdpr.component';

/** Golden WU — deletionsMetaText pagination label. */
describe('AdminGdprComponent deletionsMetaText (golden WU)', () => {
  function bare(): AdminGdprComponent {
    const cmp = Object.create(AdminGdprComponent.prototype) as AdminGdprComponent;
    (cmp as any).translate = {
      instant: (_key: string, meta: any) => `del ${meta.page}/${meta.total_pages}`,
    };
    return cmp;
  }

  it('returns empty without meta and formats with translate', () => {
    const cmp = bare();
    (cmp as any).deletionsMeta = () => null;
    expect(cmp.deletionsMetaText()).toBe('');
    (cmp as any).deletionsMeta = () => ({ page: 1, total_pages: 3 });
    expect(cmp.deletionsMetaText()).toBe('del 1/3');
  });
});
