import { CaptchaTurnstileComponent } from './captcha-turnstile.component';

/** Golden WU captcha-turnstile-reset — reset. */
describe('CaptchaTurnstileComponent reset (golden WU)', () => {
  it('resets widget and emits null token when widgetId is set', () => {
    const cmp = Object.create(CaptchaTurnstileComponent.prototype) as CaptchaTurnstileComponent;
    let resets: any[] = [];
    let emits: Array<null | undefined> = [];
    const prev = (window as any).turnstile;
    (window as any).turnstile = {
      reset: (id: string) => {
        resets.push(id);
      },
    };
    Object.assign(cmp as any, {
      widgetId: null,
      tokenChange: { emit: (v: null) => emits.push(v) },
    });
    cmp.reset();
    expect(resets).toEqual([]);
    expect(emits).toEqual([]);
    Object.assign(cmp as any, { widgetId: 'w-1' });
    cmp.reset();
    expect(resets).toEqual(['w-1']);
    expect(emits).toEqual([null]);
    (window as any).turnstile = prev;
  });
});
