angular.module('CafeApp4_Message').controller('storeController', function ($scope, $state, $rootScope, $ionicHistory,
    $ionicSlideBoxDelegate,AccountManager, ProductManager,TransactionManager,CouponManager, CafeProxy) {

    var self = this;

    $scope.$on('$ionicView.beforeEnter', function () {
        self.account = AccountManager.get();
        self.products = ProductManager.list();
    });

    $scope.$on('$ionicView.afterEnter', function () {
        var elems = document.getElementsByClassName('buyButton');
        var disabled = (self.account.id) ? false : true;
        for (var key in elems) {
            elems[key].disabled = disabled;
        };

        $ionicSlideBoxDelegate.$getByHandle('ProductSlideBox').update();
    });

    $scope.$on('ctrl:store:updateSlide', function () {
        $ionicSlideBoxDelegate.$getByHandle('ProductSlideBox').update();
    });

    this.buy = function (product) {
        CafeProxy.buyCoupon(self.account.id, product.id, function (buyData) {
            if (buyData.error)
            {
                $rootScope.message = buyData.error;
                $state.go('tab.card');
                return;
            }

            AccountManager.setBalance(buyData.transaction.balance);
            self.account = AccountManager.get();

            CouponManager.add(buyData.coupon);
            TransactionManager.add(buyData.transaction);

            $ionicHistory.clearCache().then(function () {
                $state.go('tab.coupon');
            });

        });
    };
});