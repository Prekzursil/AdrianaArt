import { AdminThemeComponent } from './admin-theme.component';

/** Golden WU theme-current-hex-helpers. */
describe('AdminThemeComponent current/hex helpers (golden WU)', () => {
  function bare(overrides: Record<string, unknown> = {}): AdminThemeComponent {
    const cmp = Object.create(AdminThemeComponent.prototype) as AdminThemeComponent;
    Object.assign(cmp as any, {
      values: () => ({ primary: '17 24 39' }),
      busy: () => false,
      dirty: () => false,
      hasContrastFailures: () => false,
      ...overrides,
    });
    return cmp;
  }

  it('currentValue / hexFor read token map', () => {
    const cmp = bare();
    expect(cmp.currentValue('primary')).toBe('17 24 39');
    expect(cmp.currentValue('missing')).toBe('');
    expect(cmp.hexFor('primary')).toMatch(/^#[0-9a-f]{6}$/i);
  });

  it('fmt / publishDisabled / track helpers', () => {
    const cmp = bare();
    expect(cmp.fmt(4.56)).toBe(4.6);
    expect(cmp.publishDisabled).toBe(false);
    expect(
      bare({ busy: () => true }).publishDisabled,
    ).toBe(true);
    expect(cmp.trackControl(0, { name: 'primary' } as any)).toBe('primary');
    expect(cmp.trackVersion(0, { version: 3 } as any)).toBe(3);
  });
});
