import { errorPageMessage } from './error.helpers';

describe('errorPageMessage (golden WU)', () => {
  it('maps known kinds and falls back to generic', () => {
    expect(errorPageMessage('network')).toContain('network');
    expect(errorPageMessage('server')).toContain('server');
    expect(errorPageMessage('timeout')).toContain('timed out');
    expect(errorPageMessage('generic')).toContain('logged');
    expect(errorPageMessage('weird')).toBe(errorPageMessage('generic'));
    expect(errorPageMessage(undefined)).toBe(errorPageMessage('generic'));
  });
});
