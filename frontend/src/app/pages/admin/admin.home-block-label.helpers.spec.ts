import { AdminComponent } from './admin.component';

/** Golden WU admin-home-block-label — homeBlockLabel. */
describe('AdminComponent homeBlockLabel (golden WU)', () => {
  it('returns translated label when present, otherwise the raw type', () => {
    const cmp = Object.create(AdminComponent.prototype) as AdminComponent;
    (cmp as any).t = (key: string) =>
      key === 'adminUi.home.sections.blocks.cta' ? 'Call to action' : key;
    expect(cmp.homeBlockLabel({ type: 'cta' } as any)).toBe('Call to action');
    expect(cmp.homeBlockLabel({ type: 'mystery' } as any)).toBe('mystery');
  });
});
