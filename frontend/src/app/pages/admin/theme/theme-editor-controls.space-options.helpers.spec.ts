import { SPACE_OPTIONS } from './theme-editor-controls';

/** Golden WU space-options -- SPACE_OPTIONS. */
describe('SPACE_OPTIONS (golden WU)', () => {
  it('ships rem spacing steps including 1rem', () => {
    expect(SPACE_OPTIONS.length).toBeGreaterThanOrEqual(8);
    expect(SPACE_OPTIONS.some((o) => o.value === '1rem')).toBe(true);
    expect(SPACE_OPTIONS.every((o) => o.value.endsWith('rem'))).toBe(true);
  });
});
