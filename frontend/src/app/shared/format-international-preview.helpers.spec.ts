import { formatInternationalPreview } from './phone';

describe('formatInternationalPreview (golden WU)', () => {
  it('formats via buildE164 or null when invalid', () => {
    const preview = formatInternationalPreview('RO', '0722123456');
    expect(preview).toMatch(/^\+40/);
    expect(formatInternationalPreview('RO', '')).toBeNull();
    expect(formatInternationalPreview('RO', '00')).toBeNull();
  });
});
