import { processEnv } from './theme-source';

/** Golden WU process-env -- processEnv. */
describe('processEnv (golden WU)', () => {
  it('returns process.env when present, else undefined', () => {
    const had = Object.prototype.hasOwnProperty.call(globalThis, 'process');
    const prev = (globalThis as any).process;
    try {
      delete (globalThis as any).process;
      expect(processEnv()).toBeUndefined();
      (globalThis as any).process = { env: { A: '1' } };
      expect(processEnv()).toEqual({ A: '1' });
    } finally {
      if (had) (globalThis as any).process = prev;
      else delete (globalThis as any).process;
    }
  });
});
