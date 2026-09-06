import { AdminComponent } from "./admin.component";

describe("AdminComponent findReplacePayloadKey (golden WU)", () => {
  function bare(): AdminComponent {
    return Object.create(AdminComponent.prototype) as AdminComponent;
  }

  it("stable-json serializes find/replace payload", () => {
    const cmp = bare() as any;
    expect(
      cmp.findReplacePayloadKey({
        find: "a",
        replace: "b",
        key_prefix: null,
        case_sensitive: true,
      }),
    ).toBe(JSON.stringify({ find: "a", replace: "b", key_prefix: null, case_sensitive: true }));
  });
});
