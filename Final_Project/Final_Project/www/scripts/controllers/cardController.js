angular.module('Final_Project').controller('cardController', function ($scope, $ionicSlideBoxDelegate,
 AccountManager, CardManager, CardProxy) {

    var self = this;

    var updateSlideBox = function () {
        $ionicSlideBoxDelegate.$getByHandle('CardUsedSlideBox').update();
        $ionicSlideBoxDelegate.$getByHandle('CardUnUsedSlideBox').update();
    };

    var slideToFirst = function () {
        $ionicSlideBoxDelegate.$getByHandle('CardUsedSlideBox').slide(0);
        $ionicSlideBoxDelegate.$getByHandle('CardUnUsedSlideBox').slide(0);
    };

    $scope.$on('$ionicView.beforeEnter', function () {
        self.account = AccountManager.get();
        self.coupons = CardManager.list();
    });

    $scope.$on('$ionicView.afterEnter', function () {
        updateSlideBox();
    });

    //this.redeem = function (card) {
    //    CardProxy.redeemCoupon(card.id, function (card) {
    //        CouponManager.update(card);

    //        updateSlideBox();
    //        slideToFirst();

    //        var elem = angular.element(document.getElementById('cardFliper'));
    //        elem.addClass('flipped');
    //    });
    //};

    this.flip = function () {
        var elem = angular.element(document.getElementById('cardFliper'));
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