import { AdminInventoryComponent } from "./admin-inventory.component";

/** Golden WU admin-inventory-is-selected — isSelected. */
describe("AdminInventoryComponent isSelected (golden WU)", () => {
  it("uses selected set + rowKey", () => {
    const cmp = Object.create(AdminInventoryComponent.prototype) as AdminInventoryComponent;
    (cmp as any).rowKey = (row: any) => String(row.id);
    (cmp as any).selected = new Set(["a"]);
    expect(cmp.isSelected({ id: "a" } as any)).toBe(true);
    expect(cmp.isSelected({ id: "b" } as any)).toBe(false);
  });
});
