import { HeaderComponent } from './header.component';

/** Golden WU header-unread-badge — unreadBadge. */
describe('HeaderComponent unreadBadge (golden WU)', () => {
  function bare(count: number): HeaderComponent {
    const cmp = Object.create(HeaderComponent.prototype) as HeaderComponent;
    Object.assign(cmp as any, { unreadCount: () => count });
    return cmp;
  }

  it('renders empty, count, or 9+ cap', () => {
    expect(bare(0).unreadBadge()).toBe('');
    expect(bare(-1).unreadBadge()).toBe('');
    expect(bare(3).unreadBadge()).toBe('3');
    expect(bare(9).unreadBadge()).toBe('9');
    expect(bare(10).unreadBadge()).toBe('9+');
  });
});
