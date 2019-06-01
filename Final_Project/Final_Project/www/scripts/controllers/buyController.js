angular.module('Final_Project').controller('buyController', function ($scope, $state, $rootScope, $ionicHistory,
    $ionicSlideBoxDelegate, AccountManager, ProductManager, TransactionManager, CardManager, CardProxy) {

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
        CardProxy.buyCard(self.account.id, product.id, self.card, function (buyData) {
            if (buyData.error) {
                $rootScope.message = buyData.error;
                $state.go('tab.bonus');
                return;
            }

            AccountManager.setBalance(buyData.transaction.balance);
            AccountManager.setCard(self.account.card += self.card);
            self.account = AccountManager.get();           

            CardManager.add(buyData.card);
            TransactionManager.add(buyData.transaction);

            $ionicHistory.clearCache();

            var elem = angular.element(document.getElementById('buyFliper'));
            elem.addClass('flipped');
        });
    };

    this.flip = function () {
        var elem = angular.element(document.getElementById('buyFliper'));
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