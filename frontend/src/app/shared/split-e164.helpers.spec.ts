import { splitE164 } from './phone';

describe('splitE164 (golden WU)', () => {
  it('splits valid E.164; invalid -> null country + empty national', () => {
    const ok = splitE164('+40722123456');
    expect(ok.country).toBe('RO');
    expect(ok.nationalNumber).toBe('722123456');
    expect(splitE164('')).toEqual({ country: null, nationalNumber: '' });
    expect(splitE164('not-a-phone')).toEqual({ country: null, nationalNumber: '' });
  });
});
