# SELECT — cart stock/promo helpers (N=3)

Targets on `CartComponent`:

1. `isLowStock(item)`
2. `isMaxQuantity(item)`
3. `quotePromoSavings()` (includes private `couponShippingDiscount` arms)

Avoids open delivery-price and clear-promo-delivery slices.
