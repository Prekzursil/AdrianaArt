import { AdminComponent } from './admin.component';

/** Golden WU admin-is-ready — isReady. */
describe('AdminComponent isReady (golden WU)', () => {
  function bare(initialized: boolean): AdminComponent {
    const cmp = Object.create(AdminComponent.prototype) as AdminComponent;
    Object.assign(cmp as any, { initialized });
    return cmp;
  }

  it('mirrors initialized flag', () => {
    expect(bare(false).isReady()).toBe(false);
    expect(bare(true).isReady()).toBe(true);
  });
});
