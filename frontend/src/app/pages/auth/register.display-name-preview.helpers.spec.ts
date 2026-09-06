import { RegisterComponent } from './register.component';

describe('RegisterComponent displayNamePreview (golden WU)', () => {
  it('empty / partial / full hint keys', () => {
    const cmp = Object.create(RegisterComponent.prototype) as RegisterComponent;
    (cmp as any).translate = {
      instant: (k: string, p?: Record<string, string>) => (p ? `${k}:${JSON.stringify(p)}` : k),
    };
    (cmp as any).displayName = '  ';
    (cmp as any).username = '';
    expect(cmp.displayNamePreview()).toBe('auth.displayNameHintEmpty');

    (cmp as any).displayName = 'Ada';
    (cmp as any).username = '';
    expect(cmp.displayNamePreview()).toBe('auth.displayNameHintPartial');

    (cmp as any).displayName = ' Ada ';
    (cmp as any).username = ' ada ';
    expect(cmp.displayNamePreview()).toBe('auth.displayNameHint:{"name":"Ada","username":"ada"}');
  });
});
