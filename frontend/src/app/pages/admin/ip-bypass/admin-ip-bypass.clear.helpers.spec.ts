import { signal } from '@angular/core';
import { of, throwError } from 'rxjs';
import { AdminIpBypassComponent } from './admin-ip-bypass.component';

/** Golden WU ip-bypass-clear-helpers. */
describe('AdminIpBypassComponent clear (golden WU)', () => {
  function bare(clearImpl: any): AdminIpBypassComponent {
    const cmp = Object.create(AdminIpBypassComponent.prototype) as AdminIpBypassComponent;
    Object.assign(cmp as any, {
      busy: signal(false),
      token: 'tok',
      auth: { clearAdminIpBypass: () => clearImpl },
      toast: { info: jasmine.createSpy('info') },
      translate: { instant: (k: string) => k },
    });
    return cmp;
  }

  it('clear no-ops when busy', () => {
    const cmp = bare(of(null));
    (cmp as any).busy.set(true);
    cmp.clear();
    expect((cmp as any).token).toBe('tok');
  });

  it('clear succeeds and clears token', () => {
    const cmp = bare(of(null));
    cmp.clear();
    expect((cmp as any).token).toBe('');
    expect((cmp as any).busy()).toBe(false);
    expect((cmp as any).toast.info).toHaveBeenCalled();
  });

  it('clear still clears token on error', () => {
    const cmp = bare(throwError(() => new Error('x')));
    cmp.clear();
    expect((cmp as any).token).toBe('');
    expect((cmp as any).busy()).toBe(false);
  });
});
