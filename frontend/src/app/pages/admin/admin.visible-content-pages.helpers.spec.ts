import { AdminComponent } from './admin.component';

/** Golden WU admin-visible-content-pages — visibleContentPages. */
describe('AdminComponent visibleContentPages (golden WU)', () => {
  it('filters hidden pages unless showHiddenPages is enabled', () => {
    const cmp = Object.create(AdminComponent.prototype) as AdminComponent;
    (cmp as any).contentPages = [
      { key: 'page.about', hidden: false },
      { key: 'page.secret', hidden: true },
    ];
    (cmp as any).showHiddenPages = false;
    expect(cmp.visibleContentPages().map((p: any) => p.key)).toEqual(['page.about']);
    (cmp as any).showHiddenPages = true;
    expect(cmp.visibleContentPages().map((p: any) => p.key)).toEqual([
      'page.about',
      'page.secret',
    ]);
  });
});
