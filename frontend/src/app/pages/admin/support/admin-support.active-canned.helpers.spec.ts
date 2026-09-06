import { AdminSupportComponent } from './admin-support.component';

/** Golden WU support-active-canned — activeCannedResponses. */
describe('AdminSupportComponent activeCannedResponses (golden WU)', () => {
  it('filters to active canned responses', () => {
    const cmp = Object.create(AdminSupportComponent.prototype) as AdminSupportComponent;
    (cmp as any).cannedResponses = () => [
      { id: 'a', is_active: true },
      { id: 'b', is_active: false },
      null,
      { id: 'c', is_active: true },
    ];
    expect(cmp.activeCannedResponses().map((t: any) => t.id)).toEqual(['a', 'c']);
  });
});
