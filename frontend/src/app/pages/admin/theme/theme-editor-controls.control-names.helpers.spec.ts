import { ALL_CONTROLS, controlNames } from './theme-editor-controls';

describe('controlNames (golden WU)', () => {
  it('returns every editor control name in render order', () => {
    expect(controlNames()).toEqual(ALL_CONTROLS.map((c) => c.name));
    expect(controlNames().length).toBeGreaterThan(0);
    expect(controlNames()).toContain('--background');
    expect(controlNames()).toContain('--font-body');
    expect(controlNames()).toContain('--space-md');
  });
});
