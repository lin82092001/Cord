angular.module('CafeApp2_Model').controller('couponController', function ($scope,$ionicSlideBoxDelegate,
 AccountManager,CouponManager,CafeProxy) {

    var self = this;

    var updateSlideBox = function () {
        $ionicSlideBoxDelegate.$getByHandle('CouponUsedSlideBox').update();
        $ionicSlideBoxDelegate.$getByHandle('CouponUnUsedSlideBox').update();
    };

    var slideToFirst = function () {
        $ionicSlideBoxDelegate.$getByHandle('CouponUsedSlideBox').slide(0);
        $ionicSlideBoxDelegate.$getByHandle('CouponUnUsedSlideBox').slide(0);
    };

    $scope.$on('$ionicView.beforeEnter', function () {
        self.account = AccountManager.get();
        self.coupons = CouponManager.list();
    });

    $scope.$on('$ionicView.afterEnter', function () {
        updateSlideBox();
    });

    this.redeem = function (coupon) {
        CafeProxy.redeemCoupon(coupon.id, function (coupon) {
            CouponManager.update(coupon);

            updateSlideBox();
            slideToFirst();

            var elem = angular.element(document.getElementById('couponFliper'));
            elem.addClass('flipped');
        });
    };

    this.flip = function () {
        var elem = angular.element(document.getElementById('couponFliper'));
        if (elem.hasClass('flipped')) {
            elem.removeClass('flipped');
        } else {
            elem.addClass('flipped');
        }
    };

    this.stopPropagation = function ($event) {
        $event.stopPropagation();
    };
});