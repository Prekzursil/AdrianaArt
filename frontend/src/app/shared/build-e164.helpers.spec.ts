import { buildE164 } from './phone';

describe('buildE164 (golden WU)', () => {
  it('returns E.164 for valid national digits; null otherwise', () => {
    expect(buildE164('RO', '0722 123 456')).toBe('+40722123456');
    expect(buildE164('RO', '')).toBeNull();
    expect(buildE164('RO', 'abc')).toBeNull();
    expect(buildE164('RO', '12')).toBeNull();
  });
});
