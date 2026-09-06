import { BlogPostComponent } from "./blog-post.component";

/** Golden WU blog-post-is-future-iso — isFutureIso. */
describe("BlogPostComponent isFutureIso (golden WU)", () => {
  it("true only for finite timestamps > now+1s", () => {
    const cmp = Object.create(BlogPostComponent.prototype) as BlogPostComponent;
    expect((cmp as any).isFutureIso(null)).toBe(false);
    expect((cmp as any).isFutureIso("nope")).toBe(false);
    const past = new Date(Date.now() - 60_000).toISOString();
    const future = new Date(Date.now() + 60_000).toISOString();
    expect((cmp as any).isFutureIso(past)).toBe(false);
    expect((cmp as any).isFutureIso(future)).toBe(true);
  });
});
