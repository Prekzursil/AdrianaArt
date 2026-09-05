# Chk56 SEAL — CONDITIONAL

- Spec: `frontend/src/app/pages/checkout/checkout-coupon-payment.arms.spec.ts`
- Target: payment availability, coupon describe/shortfall, courier delivery estimates
- INNER: **3 SUCCESS** (focused `ng test --include='**/checkout-coupon-payment.arms.spec.ts'`)
- N=3:
  1. `payment availability: isPaymentMethodAvailable gates cod/netopia by country and stripe by flag`
  2. `coupon helpers: describeCouponOffer, describeCouponReasons, minSubtotalShortfall`
  3. `courier estimate: courierEstimateKey and courierEstimateParams for home vs locker`
- `make verify`: **skipped** (per WU; INNER only)
- Draft PR: pending after push
- tip: see branch HEAD after this seal commit
