import { AdminReturnsComponent } from './admin-returns.component';

/** Golden WU returns-return-label-filename — returnLabelFileName. */
describe('AdminReturnsComponent returnLabelFileName (golden WU)', () => {
  it('prefers selected name else translated fallback', () => {
    const cmp = Object.create(AdminReturnsComponent.prototype) as AdminReturnsComponent;
    (cmp as any).returnLabelSelectedName = () => 'label.pdf';
    (cmp as any).translate = { instant: () => 'no-file' };
    expect(cmp.returnLabelFileName()).toBe('label.pdf');
    (cmp as any).returnLabelSelectedName = () => '';
    expect(cmp.returnLabelFileName()).toBe('no-file');
  });
});
