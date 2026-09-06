import { compiledDefault } from './theme-editor-controls';

describe('compiledDefault (golden WU)', () => {
  it('returns taxonomy compiled defaults and empty string for unknown tokens', () => {
    expect(compiledDefault('--background')).toBeTruthy();
    expect(typeof compiledDefault('--background')).toBe('string');
    expect(compiledDefault('--definitely-not-a-token')).toBe('');
  });
});
