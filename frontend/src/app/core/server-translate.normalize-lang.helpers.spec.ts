import { ServerTranslateLoader } from './server-translate.loader';

/** Golden WU server-translate-normalize-lang — normalizeLang. */
describe('ServerTranslateLoader normalizeLang (golden WU)', () => {
  it('maps ro to ro; everything else to en', () => {
    const loader = Object.create(ServerTranslateLoader.prototype) as ServerTranslateLoader;
    expect((loader as any).normalizeLang('ro')).toBe('ro');
    expect((loader as any).normalizeLang('  RO  ')).toBe('ro');
    expect((loader as any).normalizeLang('en')).toBe('en');
    expect((loader as any).normalizeLang('')).toBe('en');
    expect((loader as any).normalizeLang('fr')).toBe('en');
  });
});
