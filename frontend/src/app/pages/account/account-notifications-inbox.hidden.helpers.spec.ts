import { AccountNotificationsInboxComponent } from "./account-notifications-inbox.component";

/** Golden WU account-notifications-hidden — hiddenNotifications. */
describe("AccountNotificationsInboxComponent hiddenNotifications (golden WU)", () => {
  it("keeps only dismissed items", () => {
    const cmp = Object.create(AccountNotificationsInboxComponent.prototype) as AccountNotificationsInboxComponent;
    (cmp as any).items = [
      { id: "1", dismissed_at: null },
      { id: "2", dismissed_at: "2026-01-01" },
    ];
    expect(cmp.hiddenNotifications().map((n: any) => n.id)).toEqual(["2"]);
  });
});
