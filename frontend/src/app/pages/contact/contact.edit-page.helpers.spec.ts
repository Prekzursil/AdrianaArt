import { ContactComponent } from "./contact.component";

/** Golden WU contact-edit-page — editPage. */
describe("ContactComponent editPage (golden WU)", () => {
  it("navigates to admin content pages with edit=contact", () => {
    const cmp = Object.create(ContactComponent.prototype) as ContactComponent;
    const calls: Array<{ cmds: any; extras: any }> = [];
    (cmp as any).router = {
      navigate: (cmds: any, extras?: any) => {
        calls.push({ cmds, extras });
        return Promise.resolve(true);
      },
    };
    cmp.editPage();
    expect(calls[0].cmds).toEqual(["/admin/content/pages"]);
    expect(calls[0].extras).toEqual({ queryParams: { edit: "contact" } });
  });
});
