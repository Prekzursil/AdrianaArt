import { LoginComponent } from './login.component';

/** Golden WU login-on-submit -- onSubmit. */
describe('LoginComponent onSubmit (golden WU)', () => {
  it('returns early on guard', () => {
    const cmp = Object.create(LoginComponent.prototype) as LoginComponent;
    Object.assign(cmp as any, {
      toast: { error: jasmine.createSpy('e'), success: jasmine.createSpy('s') },
      t: (k: string) => k,
      load: jasmine.createSpy('load'),
      save: jasmine.createSpy('save'),
      form: {},
      draft: jasmine.createSpy('draft').and.returnValue(null),
      original: jasmine.createSpy('original').and.returnValue(null),
      selectedIds: jasmine.createSpy('selectedIds').and.returnValue(new Set()),
      items: jasmine.createSpy('items').and.returnValue([]),
      notifications: jasmine.createSpy('notifications').and.returnValue([]),
      filter: jasmine.createSpy('filter').and.returnValue('all'),
      page: jasmine.createSpy('page').and.returnValue(1),
      busy: jasmine.createSpy('busy').and.returnValue(false),
      theme: { setPreference: jasmine.createSpy('sp') },
      documentClick: jasmine.createSpy('dc'),
      router: { navigate: jasmine.createSpy('nav'), navigateByUrl: jasmine.createSpy('nbu') },
      route: { snapshot: { queryParamMap: { get: () => null } } },
      auth: { login: jasmine.createSpy('login'), register: jasmine.createSpy('register') },
      api: {},
      analytics: { track: jasmine.createSpy('track') },
      captcha: { reset: jasmine.createSpy('reset'), token: jasmine.createSpy('token').and.returnValue(null) },
      loading: jasmine.createSpy('loading').and.returnValue(false),
      error: jasmine.createSpy('error').and.returnValue(null),
      status: jasmine.createSpy('status').and.returnValue('idle'),
    });
    expect(() => (cmp as any).onSubmit({ valid: false, submitted: false } as any)).not.toThrow();
  });
});
