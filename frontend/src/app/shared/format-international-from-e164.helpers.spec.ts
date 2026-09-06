import { formatInternationalFromE164 } from './phone';

describe('formatInternationalFromE164 (golden WU)', () => {
  it('formats parsed E.164; returns trimmed raw when unparsable', () => {
    expect(formatInternationalFromE164('+40722123456')).toMatch(/^\+40/);
    expect(formatInternationalFromE164('  raw  ')).toBe('raw');
    expect(formatInternationalFromE164('')).toBe('');
  });
});
