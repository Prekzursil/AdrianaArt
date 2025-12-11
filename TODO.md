# TODO / Roadmap

Below is a structured checklist you can turn into issues.

## Project & Infra
- [x] Initialize monorepo with `backend/`, `frontend/`, `infra/`.
- [x] Add `docker-compose.yml` for API, frontend, Postgres.
- [x] Add backend `.env.example` (DATABASE_URL, SECRET_KEY, STRIPE_SECRET_KEY, SMTP_*, FRONTEND_ORIGIN).
- [x] Add frontend `.env.example` (API_BASE_URL, STRIPE_PUBLISHABLE_KEY, APP_ENV).
- [x] Add `.gitignore` for Python, Node, env files, build artifacts.
- [x] GitHub Actions for backend (lint, tests, type-checks).
- [x] GitHub Actions for frontend (lint, tests, build).
- [x] CONTRIBUTING.md with branching, commit style, runbook.
- [x] ARCHITECTURE.md with high-level design and data flow.
- [x] CI: add deployment/release job (e.g., container build + push) once runtime code lands.
- [x] Create `frontend/.env.example` with `API_BASE_URL` and `APP_ENV`, and wire it into Angular so Docker and local runs share the same configuration.
- [x] Add `frontend/Dockerfile` (or update `infra/docker-compose.yml`) so the Docker `frontend` service builds and serves the Angular app correctly.
- [x] Add Angular dev-server proxy configuration (`proxy.conf.json`) to forward `/api` calls to the FastAPI backend in `start.sh`/`start.bat` flows.
- [x] Document Docker-based local dev flow in `infra/README.md` (ports, URLs, CORS expectations, Stripe webhook tunnelling).
- [ ] Introduce a `pre-commit` config (Black/ruff for Python, ESLint/Prettier for TS) and reference it in CONTRIBUTING.md.
- [ ] Add a top-level `Makefile` or `justfile` with shortcuts like `make dev`, `make test`, `make lint`, `make docker-up`.

## Backend - Core & Auth
- [x] Scaffold FastAPI app with versioned `/api/v1` router.
- [x] Settings via `pydantic-settings`.
- [x] SQLAlchemy engine/session for Postgres.
- [x] User model + Alembic migration.
- [x] Password hashing/verification.
- [x] Auth endpoints: register, login (access+refresh), refresh, logout.
- [x] JWT guard dependency + role guard for admin.
- [x] Tests for auth flows (register/login/refresh/invalid creds).
- [x] HTTP-only refresh token cookie issued on login/refresh and cleared on logout.

## Backend - Catalog & Products
- [x] Category model + migration; CRUD endpoints.
- [x] Product model + migration.
- [x] ProductImage model + association; multiple images per product.
- [x] ProductOption/ProductVariant models for simple variants (size/color).
- [x] Tag model + many-to-many between products/tags.
- [x] Slug field + unique index; slug generation helper.
- [x] Searchable fields: name, short description, tags.
- [x] Product status enum (draft/published/archived).
- [x] Soft delete for products (archived flag).
- [x] List products endpoint with pagination.
- [x] Filtering by category, price range, tag, text search.
- [x] Product detail endpoint by slug.
- [x] Related products by tag/category.
- [x] Recently viewed products service (per session).
- [x] Admin CRUD for products (create/update/delete).
- [x] Admin CRUD for categories.
- [x] Upload images for products (multipart form).
- [x] Image deletion endpoint.
- [x] Image reordering endpoint (sort order).
- [x] Stock quantity fields at product/variant level.
- [x] Derive “is in stock / low stock / sold out” helpers.
- [x] Admin batch update stock.
- [x] Product reviews model + CRUD (with moderation flag).
- [x] Aggregate rating on product (average, count).
- [x] Public endpoint for approved reviews per product.
- [x] Admin review moderation endpoints.
- [x] Product “featured” flag.
- [x] Featured products endpoint.
- [x] Recently added products endpoint for homepage.
- [x] JSON responses validated via Pydantic schemas.
- [x] Tests for catalog list/detail.
- [x] Related products/recommendations service (rule-based).
- [x] Recently viewed products service (per session).
- [x] Admin export products CSV.
- [x] Admin import products CSV with dry-run validation.
- [x] Product slug history/redirects on slug change.
- [x] Server-side pagination metadata (total pages/items).
- [x] Sort options: newest, price asc/desc, name asc/desc.
- [x] Backorder/preorder flag + estimated restock date.
- [x] Per-product shipping dimensions/weight fields.
- [x] Per-product metadata for SEO (meta title/description).
- [x] Rich text/markdown validation for product descriptions.
- [x] Admin audit log for product mutations.
- [x] Price and currency validation helpers.
- [x] Product feed (JSON/CSV) for marketing channels.
- [x] Featured collection endpoints.

## Backend - Cart & Checkout
- [x] Cart model (user or anonymous via session id).
- [x] CartItem model.
- [x] CRUD endpoints: get cart, add item, update quantity, remove item.
- [x] Cart item uniqueness per product/variant.
- [x] Cart belongs to user or guest (session token).
- [x] Merge guest cart into user cart on login.
- [x] Max quantity per item enforcement.
- [x] Reserve stock on checkout start (optional).
- [x] Cart subtotal/tax/shipping calculation helper.
- [x] Promo code model + validation hook.
- [x] Abandoned cart job (email reminder) scaffold.
- [x] Cart item note (gift message) support.
- [x] Cart cleanup job for stale guest carts.
- [x] Variant selection validation (options match product).
- [x] Cart analytics events (add/remove/update).
- [x] Stock validation in cart endpoints.
- [x] Cart API returns totals and line item information.

## Backend - Orders, Payment, Addresses
- [x] Address model + migration; CRUD /me/addresses.
- [x] Order + OrderItem models + migrations.
- [x] Service to build order from cart (price snapshot).
- [x] Stripe integration: PaymentIntent create, return client secret.
- [x] Stripe webhook for payment succeeded/failed; update status.
- [x] GET /me/orders and /me/orders/{id}.
- [x] Admin order list/filter + status/tracking update.
- [x] Order status enums and transitions (pending/paid/shipped/cancelled/refunded).
- [x] Order reference code generator.
- [x] Shipping method model (flat-rate, weight-based).
- [x] Tax calculation strategy (basic rules).
- [x] Payment failure retry flow.
- [x] Refund endpoint stub (manual).
- [x] Order timeline/audit log (status changes, notes).
- [x] Packing slip/invoice PDF stub.
- [x] Order item fulfillment tracking (shipped qty).
- [x] Address validation hooks (basic country/postcode).
- [x] Default shipping/billing address on user.
- [x] Admin: update tracking number and send email.
- [x] Ensure monetary values stored as Decimal in the database.

## Backend - CMS & Content
- [x] Content blocks model (key, lang, title, body, status).
- [x] CMS endpoints to fetch content by key/lang (for About, FAQ, Shipping, etc.).
- [x] Static page slugs for SEO (about/faq/shipping/returns/care).
- [x] Homepage hero content model.
- [x] Homepage sections model (featured collections, bestsellers, new arrivals).
- [x] Admin CRUD for content blocks.
- [x] Admin preview mode (draft vs published).
- [x] Content versioning metadata (last updated by/at).
- [x] Homepage content API aggregates hero + sections.
- [x] Sitemap endpoints (products, categories, static pages).
- [x] robots.txt endpoint.

## Backend - Email & Notifications
- [x] Email service abstraction (SMTP host/port/user/pass, from address).
- [x] Jinja2 templates for order confirmation email.
- [x] Template for shipping update email.
- [x] Template for password reset email.
- [x] Template for email verification.
- [x] Low stock alert email (admin notification).
- [x] Back in stock notification templates.
- [x] Background job stub for back-in-stock notifications.
- [x] Email sending in response to order events.
- [x] Email sending on password reset request.
- [x] Email sending on email verification.
- [x] Simple email preview endpoint (dev only, HTML/text).
- [x] Email send failures logged with enough context.
- [x] Localization of email templates (EN/RO).
- [x] Config flag to disable outbound email in local/dev.

## Backend - Security, Observability, Testing
- [x] CORS config for dev/prod.
- [x] Rate limiting on login/register/password reset.
- [x] Validate file types/sizes for uploads.
- [x] Structured logging with request ID.
- [x] Health/readiness endpoints.
- [x] Pytest suite for services (auth, catalog, cart, checkout).
- [x] Integration tests against temp Postgres.
- [x] mypy type-checking and fixes.
- [x] CI smoke test hitting health/readiness.
- [x] API rate limit tests.
- [x] Auth token expiry/refresh tests.
- [x] Negative tests for unauthorized/forbidden access.
- [x] Security headers middleware (HSTS, content type options, referrer policy).
- [x] Input validation and safe error messages.
- [x] Password reset token reuse prevention.
- [x] Email verification token expiration.
- [x] Admin-only endpoints protected and covered by tests.
- [x] Secrets loaded only from environment/.env; not committed.
- [x] Basic SQL injection protection via ORM usage.
- [x] Logging of important security events (login success/failure, password reset).
- [x] Rate limit storage kept in-memory (stateless deployments documented).
- [x] Dependency vulnerability scanning (pip/npm).
- [x] Backpressure handling (429) for expensive endpoints.
- [x] Maintenance mode toggle.
- [ ] Expose an endpoint to list active refresh sessions ("logged-in devices") per user and allow revoking individual sessions.
- [ ] Add a metrics endpoint (e.g., Prometheus) exporting counters/gauges from `metrics.py` for external monitoring.

## Frontend - Shell & Shared
- [x] Scaffold Angular app with routing + strict TS.
- [x] Tailwind CSS and design tokens.
- [x] Main layout (header/footer/responsive nav).
- [x] Shared components: button, input, card, modal, toast.
- [x] Global error handling / boundary route.
- [x] API service layer + interceptors.
- [x] Theme tokens (spacing, typography, colors).
- [x] Dark/light mode toggle.
- [x] Respect system `prefers-color-scheme` by default and keep theme state in localStorage (light/dark/system).
- [x] Add header theme switcher (light/dark/system) that updates the document root class and tokens in real time.
- [x] Audit shared components/layout for dark-mode contrast (backgrounds, cards, inputs, modals, toasts) and fix any hardcoded light colors.
- [x] Add unit/e2e checks for theme switching (default follows system; toggle persists across reloads).
- [x] Form validation utilities (error messages, async validation).
- [x] Toast/snackbar service and global overlay.
- [x] Loading spinner/skeleton components.
- [x] Page-level breadcrumb component.
- [x] Accessible modal focus trapping.
- [x] IntersectionObserver-based lazy image component.
- [x] Global HTTP error handler (401/403/500).
- [x] Responsive nav drawer with keyboard navigation.
- [x] Route guards for auth/admin.
- [x] ESLint/Prettier strict config.
- [ ] Replace hard-coded `/api/v1` in `ApiService` with an injectable `API_BASE_URL` token or config service, populated from environment/meta tags.
- [ ] Add a global route/API loading indicator (e.g., top progress bar) to reduce perceived latency on slow connections.
- [ ] Add a dev-only helper to highlight missing i18n keys (e.g., wrapper pipe or console warning) so untranslated strings are easy to spot.

## Frontend - Storefront
- [x] Homepage hero with "Shop now" CTA.
- [x] Featured products grid on homepage.
- [x] Category listing with grid + pagination.
- [x] Filter sidebar (category, price range, tags).
- [x] Search bar hitting /products.
- [x] Product card component (image, name, price, stock badge).
- [x] Product detail page with gallery, variants, quantity/add-to-cart.
- [x] Handmade uniqueness note.
- [x] Sort controls (price/name/newest).
- [x] Price range slider.
- [x] Tag chips filter.
- [x] Breadcrumbs for navigation.
- [x] “You may also like” / related products section.
- [x] Recently viewed on product page.
- [x] Empty state for no products found.
- [x] Error state for failed product load.
- [x] Mobile layout for cards/grids.
- [x] Product meta tags (title/description, Open Graph).
- [x] Schema.org structured data for products.
- [ ] Implement wishlist UI: heart icon on product cards and product detail, plus a `/wishlist` page backed by the wishlist API with empty-state messaging.
- [ ] Show backorder/preorder messaging and estimated restock date on product detail when `allow_backorder` and `restock_at` are set.
- [ ] Persist shop filters & sort order in query params and localStorage so returning users see the same listing state.
- [ ] Add an optional "Care instructions" section on product detail, pulling content from CMS/meta when present.

## Frontend - Cart & Checkout
- [x] Cart page showing items, quantities, subtotal.
- [x] Ability to update quantities/remove items.
- [x] Link to proceed to checkout.
- [x] Empty cart state.
- [x] Checkout page with shipping/billing form.
- [x] Order summary on checkout.
- [x] Apply promo code UI.
- [x] Shipping method selection.
- [x] Payment placeholder (to be wired to Stripe).
- [x] Validation messages on checkout form.
- [x] Success page with order summary.
- [x] Error page for failed payment.
- [x] Loading states for submitting checkout.
- [x] Persist cart in localStorage for guests.
- [x] Wire cart state to backend cart APIs (load/add/update/remove) instead of local-only.
- [x] Replace checkout payment placeholder with Stripe Elements + PaymentIntent from backend.
- [x] Submit checkout to backend to create order, validate stock/pricing, and handle failures.
- [x] Use backend shipping methods and promo validation instead of hardcoded values.
- [x] Persist/save checkout address via backend (guest or user) and reuse on account.
- [x] Add guest checkout API (session-based cart, guest address capture, optional account creation).
- [x] Tests: guest checkout with promo + shipping validates PaymentIntent amount and queues set-password email.
- [x] Tests: cart sync returns product metadata (name/slug/image/currency) and totals reflect shipping/promo.
- [x] Tests: payment intent amount derived from backend totals (seeded cart).
- [x] Frontend test: Checkout component calls /cart/sync, /payments/intent, /orders, and handles errors/retry.
- [x] Frontend test: CartStore add/remove via backend merges quantities and is resilient to errors.
- [x] Frontend test: ProductComponent “Add to cart” posts to backend and shows toast (mock CartStore).
- [x] E2E: guest checkout (add cart → sync → apply promo/shipping → mock pay → confirm order) with CHROME_BIN headless and --no-sandbox.
- [ ] Improve Stripe error handling in checkout: map common `card_error` / `payment_intent` failures to localized, user-friendly messages.
- [ ] Add inline validation and instant feedback for invalid promo codes and stale shipping methods before submitting the order.
- [ ] Introduce a reusable order summary component reused on checkout, success page, and account order detail for visual consistency.

## Frontend - Auth & Account
- [x] Login page with validation.
- [x] Registration page.
- [x] Password reset request + reset form.
- [x] Account dashboard (profile, address book, order history, order detail).
- [x] Change password form.
- [x] Email verification flow UI.
- [x] Address book CRUD UI.
- [x] Order history pagination + filters.
- [x] Saved payment method placeholder.
- [x] Profile avatar upload (optional).
- [x] Session timeout/logout messaging.
- [x] Wire login/register/password reset flows to backend auth endpoints (replace mocks).
- [x] Fetch real profile, addresses, and order history from backend; replace account dashboard mock data.
- [x] Persist auth tokens securely (localStorage/HttpOnly cookie strategy).
- [x] Show verified/unverified email state.
- [x] Allow resending verification email from account.
- [x] Account-level language preference control (RO/EN).
- [x] Frontend route guard for account pages.
- [x] Account-level success/error toasts when saving profile/address/password.

## Frontend - Admin Dashboard
- [x] Admin layout with side nav/top bar.
- [x] Admin product list (table with search/filter/sort/pagination).
- [x] Admin product create/edit form.
- [x] Admin product image upload (preview + reorder).
- [x] Admin order list (status filter, search by email/reference).
- [x] Admin order detail view.
- [x] Admin content pages list (About/FAQ/Shipping blocks).
- [x] Admin content block edit form with markdown/WYSIWYG.
- [x] Admin user list (role display).
- [x] Admin user role toggle (customer/admin).
- [x] Admin dashboard landing with key stats (orders, revenue, low stock).
- [x] Guarded admin routes (admin-only).
- [x] Link to admin from main nav for admin users.
- [x] Admin filter by category/tag for products.
- [x] Bulk publish/unpublish products.
- [x] Admin search by product name/sku/slug.
- [x] Admin export products to CSV (button).
- [x] Admin import products CSV (file picker + result report).
- [x] Admin back-in-stock notification toggle per product.
- [x] Admin low-stock threshold configuration.
- [x] Admin email template preview (order confirmation, shipping, etc.).
- [x] Admin impersonation stub (view as customer).
- [x] Admin marketing feed generation trigger.
- [x] Admin theme/branding settings stub.
- [x] Admin logs/audit trail viewer.
- [ ] Add an admin view for abandoned carts (from `run_abandoned_cart_job`), showing last activity, estimated value, and actions to resend reminders.
- [ ] Add inline help/tooltips in admin forms (products, content, SEO) describing recommended formats and limits for each field.

## UX, Performance, SEO & Accessibility
- [x] Mobile-first responsive design across pages(full mobile compatibility).
- [x] Loading skeletons/spinners for lists and details.
- [x] Toast notifications for key actions.
- [x] Image optimization (srcset/lazy loading/modern formats).
- [x] SEO meta tags per page; Open Graph; sitemap/robots.
- [x] Lighthouse perf + accessibility fixes.
- [x] Keyboard navigation, contrast, accessible labels.
- [x] Prefetch critical API calls on navigation.
- [x] Asset compression and caching headers guidance.
- [x] ARIA labels for form controls and buttons.
- [x] Focus styles consistent across components.
- [x] Skip-to-content link.
- [x] Motion-reduced animations option.
- [x] 404/500 error pages with helpful actions.
- [x] Structured data (JSON-LD) for products.
- [x] Breadcrumb structured data for SEO.
- [x] Perf budget and bundle analysis (Angular).

## Internationalization & Localization (RO/EN)
- [x] Pick frontend i18n strategy (Angular i18n vs ngx-translate) and set up RO/EN language switching.
- [x] Base translation files for `en` and `ro` (navigation, footer, auth, cart, checkout, admin).
- [x] Language toggle in header with persisted choice (localStorage/cookie).
- [x] Store preferred language on user profile and default to it after login.
- [x] Internationalize storefront text (home, shop, product detail, cart, checkout, account) – frontend strings wired to i18n.
- [x] Internationalize storefront shell text for home + shop pages (partial storefront i18n).
- [x] RO/EN translations for validation/error messages in forms (login, register, checkout, admin).
- [x] Internationalize admin dashboard labels/messages.
- [x] `product_translations` (or JSONB) for localized product name/short/long description per language.
- [x] `category_translations` (or JSONB) for localized category name/description per language.
- [x] Localized content blocks for static pages (About, FAQ, Shipping, etc.).
- [x] URL structure with `/en` and `/ro` prefixes where appropriate.
- [x] Locale-aware currency formatting.
- [x] Localized email templates (order confirmation, etc.).
- [x] i18n-aware sitemaps and canonical tags.

## Auth – Google OAuth & Account Linking
- [x] Backend Google OAuth client configuration (client ID/secret, redirect URI).
- [x] Endpoint to start Google OAuth (generate state, redirect URL).
- [x] Endpoint to handle Google OAuth callback (exchange code → tokens; fetch user info).
- [x] Create-or-link logic: if email doesn’t exist, create new user; if exists and not linked, offer link flow.
- [x] Store Google `sub` on user record.
- [x] Prevent linking if another account already linked to same Google `sub`.
- [x] Allow unlinking Google from account (with password confirmation).
- [x] Frontend “Continue with Google” on login/register.
- [x] Frontend callback route/page that handles code/state and calls backend.
- [x] Handle success (login + redirect) and errors (toast + fallback to login).
- [x] Show Google-linked state in account profile (badge).
- [x] Tests for Google OAuth callback (happy path, invalid state, missing email, domain restriction).
- [x] Document Google OAuth setup (console config, redirect URIs).
- [x] Optional domain restriction for admin accounts via Google (e.g., only specific @domain.ro).

## Admin Dashboard – CMS & UX Enhancements
- [x] Admin UI for editing homepage hero per language (headline, subtitle, CTA, hero image).
- [x] Admin UI for managing Collections (named groups of products to feature).
- [x] Drag-and-drop ordering for homepage sections (hero, collections, bestsellers, new arrivals).
- [x] Admin UI for global assets (logo, favicon, social preview image).
- [x] SEO settings in admin to set meta title/description per page per language.
- [x] WYSIWYG/markdown editor for About/FAQ/Shipping content with RO/EN tabs.
- [x] Live preview mode in admin for page changes before publishing.
- [x] Version metadata (“last updated by/at”) for content blocks.
- [x] Admin dashboard overview with key metrics (open orders, recent orders, low-stock, sales last 30d).
- [x] Admin tools for inline/bulk stock editing in product table.
- [x] Duplicate product action in admin (clone with images, mark draft).
- [x] Admin controls for bestseller/highlight badges on storefront cards.
- [x] Scheduling for product publish/unpublish; show upcoming scheduled products.
- [x] Admin maintenance mode toggle (customer-facing maintenance page, admin bypass).
- [x] Admin audit log page listing important events (login, product changes, content updates, Google linking).
- [ ] Add an admin view for abandoned carts (from `run_abandoned_cart_job`), showing last activity, estimated value, and actions to resend reminders.
- [ ] Add inline help/tooltips in admin forms (products, content, SEO) describing recommended formats and limits for each field.

## Data Portability & Backups (Extended)
- [x] CLI command `python -m app.cli export-data` exporting users (no passwords), products, categories, orders, addresses to JSON.
- [x] CLI command `import-data` to bootstrap a new DB from JSON exports with idempotent upserts.
- [x] Infra helper script to archive DB dump + JSON exports + media into timestamped `.tar.gz`.
- [x] Document “Move to a new server” flow in README (restore DB/media, run migrations, import as needed).
- [x] Example cron/systemd timer config for scheduled backups in production.
- [x] `check-backup` script to restore latest backup into disposable Docker container and hit `/api/v1/health`.
- [x] Admin-triggered “Download my data” export endpoint with auth/logging.

## Media & File Handling Improvements
- [x] `storage.save_upload` generates unique filenames (UUID + extension) to avoid collisions/traversal.
- [x] Server-side validation for uploaded image type and size across endpoints.
- [x] Store relative media paths and derive full URLs via MEDIA_ROOT/CDN base.
- [x] Thumbnail/preview generation for product images (small/medium/large).
- [x] Cleanup helper to remove orphaned media files.
- [x] Document how to point media to S3-compatible storage in production.

## Bugs / Technical Debt / Misc Features
- [x] Config option to enforce Decimal end-to-end for prices; tests for exact totals.
- [x] Pagination metadata (total items/pages) in product list API responses.
- [x] Standardize error response format across APIs.
- [x] Structured logging around cart/checkout (cart id, user id, request id).
- [x] Rate limiting on `/auth/login`, `/auth/register`, `/auth/google/*` with consistent 429 response.
- [x] Wishlist/save-for-later feature per user.
- [x] Recently viewed products widget using cookie/localStorage list (storefront).
- [x] Integration test covering register → login → add to cart → checkout (mock payment) → see order.
- [x] Smoke test for Google OAuth using mocked Google endpoint.
- [x] Metrics counters for signups, logins, failed logins, orders created, payment failures.
- [x] robots.txt and sitemap.xml generation (with i18n URLs).
- [x] Per-language canonical URLs for product pages.
- [x] Document “local-only dev” mode (SQLite + local media + Stripe test) and “prod-like” mode (Postgres + S3 + SMTP).
