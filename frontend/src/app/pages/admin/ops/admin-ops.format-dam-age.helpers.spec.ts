import { AdminOpsComponent } from './admin-ops.component';

/** Golden WU ops-format-dam-age — formatDamAge. */
describe('AdminOpsComponent formatDamAge (golden WU)', () => {
  it('formats null/seconds/minutes/hours', () => {
    const cmp = Object.create(AdminOpsComponent.prototype) as AdminOpsComponent;
    expect(cmp.formatDamAge(null)).toBe('n/a');
    expect(cmp.formatDamAge(undefined)).toBe('n/a');
    expect(cmp.formatDamAge(45)).toBe('45s');
    expect(cmp.formatDamAge(120)).toBe('2m');
    expect(cmp.formatDamAge(7200)).toBe('2h');
  });
});
