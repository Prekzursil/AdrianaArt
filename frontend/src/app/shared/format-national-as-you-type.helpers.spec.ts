import { formatNationalAsYouType } from './phone';

describe('formatNationalAsYouType (golden WU)', () => {
  it('strips non-digits and formats RO national; empty -> empty', () => {
    expect(formatNationalAsYouType('RO', '')).toBe('');
    expect(formatNationalAsYouType('RO', '07xx')).toBe('07');
    const formatted = formatNationalAsYouType('RO', '0722123456');
    expect(formatted.replace(/\D/g, '')).toBe('0722123456');
    expect(formatted.length).toBeGreaterThan('0722123456'.length - 1);
  });
});
