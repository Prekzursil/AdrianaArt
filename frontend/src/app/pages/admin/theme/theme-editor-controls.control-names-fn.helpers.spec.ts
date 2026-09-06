import { ALL_CONTROLS, controlNames } from './theme-editor-controls';

/** Golden WU control-names-fn -- controlNames. */
describe('controlNames (golden WU)', () => {
  it('returns ALL_CONTROLS names including --background', () => {
    expect(controlNames()).toEqual(ALL_CONTROLS.map((c) => c.name));
    expect(controlNames()).toContain('--background');
  });
});
