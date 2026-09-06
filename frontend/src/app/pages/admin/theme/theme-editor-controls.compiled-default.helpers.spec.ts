import { compiledDefault } from './theme-editor-controls';

/** Golden WU compiled-default -- compiledDefault. */
describe('compiledDefault (golden WU)', () => {
  it('returns taxonomy compiled defaults for editable tokens', () => {
    expect(compiledDefault('--accent')).toBe('79 70 229');
    expect(compiledDefault('--background')).toBe('255 255 255');
    expect(compiledDefault('--not-real')).toBe('');
  });
});
