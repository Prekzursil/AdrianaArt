import { AccountNotificationsInboxComponent } from "./account-notifications-inbox.component";

/** Golden WU account-notifications-current-list — currentList. */
describe("AccountNotificationsInboxComponent currentList (golden WU)", () => {
  it("switches between active and hidden lists by tab", () => {
    const cmp = Object.create(AccountNotificationsInboxComponent.prototype) as AccountNotificationsInboxComponent;
    (cmp as any).activeNotifications = () => [{ id: "a" }];
    (cmp as any).hiddenNotifications = () => [{ id: "h" }];
    (cmp as any).tab = "active";
    expect(cmp.currentList()).toEqual([{ id: "a" }] as any);
    (cmp as any).tab = "hidden";
    expect(cmp.currentList()).toEqual([{ id: "h" }] as any);
  });
});
