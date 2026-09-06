import { AccountNotificationsInboxComponent } from "./account-notifications-inbox.component";

/** Golden WU account-notifications-active — activeNotifications. */
describe("AccountNotificationsInboxComponent activeNotifications (golden WU)", () => {
  it("filters out dismissed items", () => {
    const cmp = Object.create(AccountNotificationsInboxComponent.prototype) as AccountNotificationsInboxComponent;
    (cmp as any).items = [
      { id: "1", dismissed_at: null },
      { id: "2", dismissed_at: "2026-01-01" },
    ];
    expect(cmp.activeNotifications().map((n: any) => n.id)).toEqual(["1"]);
  });
});
