import { compiledDefault } from './theme-editor-controls';

/** Golden WU compiled-default-fn -- compiledDefault. */
describe('compiledDefault (golden WU)', () => {
  it('resolves seed compiled defaults for editable tokens', () => {
    expect(compiledDefault('--background')).toBe('255 255 255');
    expect(compiledDefault('--font-size-base')).toContain('rem');
    expect(compiledDefault('--not-a-real-token')).toBe('');
  });
});
