# Chk56 Select — checkout coupon / payment / courier arms

Existing `checkout.component.spec.ts`, `guest-flow.spec.ts`, and open PR #752 (chk55)
cover placeOrder submit paths plus step gates / country normalize / shipping guards.
Payment availability, coupon describe helpers, and courier estimate keys were still
uncovered. N=3 NEW arms:

1. Payment availability — `isPaymentMethodAvailable` gates cod/netopia by RO country,
   paypal by currency, stripe by enabled flag
2. Coupon helpers — `describeCouponOffer`, `describeCouponReasons`, `minSubtotalShortfall`
3. Courier estimate — `courierEstimateKey` / `courierEstimateParams` for home vs locker

Spec: `frontend/src/app/pages/checkout/checkout-coupon-payment.arms.spec.ts`

Branch: cursor/golden-wu-checkout-coupon-payment-coverage-4739
