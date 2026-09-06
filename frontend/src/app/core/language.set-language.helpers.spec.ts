import { LanguageService } from './language.service';

/** Golden WU language-set-language — setLanguage. */
describe('LanguageService setLanguage (golden WU)', () => {
  it('sets signal, uses translate, applies document lang, and persists when asked', () => {
    const svc = Object.create(LanguageService.prototype) as LanguageService;
    const store: Record<string, string> = {};
    const calls: any = { lang: null, used: null, applied: null };
    Object.assign(svc as any, {
      languageSignal: { set: (v: any) => (calls.lang = v) },
      translate: { use: (v: any) => (calls.used = v) },
      applyDocumentLanguage: (v: any) => (calls.applied = v),
      auth: { isAuthenticated: () => false },
    });
    (globalThis as any).localStorage = {
      setItem: (k: string, v: string) => {
        store[k] = v;
      },
    };
    svc.setLanguage('ro', { persist: true, syncBackend: false });
    expect(calls).toEqual({ lang: 'ro', used: 'ro', applied: 'ro' });
    expect(store['lang']).toBe('ro');
  });
});
