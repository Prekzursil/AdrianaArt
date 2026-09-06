import { colorControlNames } from './theme-editor-controls';

describe('colorControlNames (golden WU)', () => {
  it('returns only color-kind control names', () => {
    const names = colorControlNames();
    expect(names).toContain('--background');
    expect(names).toContain('--accent');
    expect(names).not.toContain('--font-body');
    expect(names).not.toContain('--space-md');
    expect(names).not.toContain('--font-size-base');
  });
});
