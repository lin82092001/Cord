angular.module('CafeApp2_Model').filter('couponFilter', function () {
    return function (coupons, isUsed) {
        return Object.keys(coupons).map(function (key) {
            return coupons[key];
        }).filter(function (coupon) {
            return (isUsed && coupon.redeemStamp) || (!isUsed && !coupon.redeemStamp);
        });
    };
});