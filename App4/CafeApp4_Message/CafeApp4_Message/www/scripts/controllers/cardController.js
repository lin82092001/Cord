angular.module('CafeApp4_Message').controller('cardController', function ($scope, $rootScope, $ionicSlideBoxDelegate,
    AccountManager, TransactionManager, CafeProxy) {

    var self = this;

    $scope.$on('$ionicView.beforeEnter', function () {
        self.account = AccountManager.get();
        self.transactions = TransactionManager.list();

        if ($rootScope.message) {
            self.message = $rootScope.message;
            delete $rootScope.message;
        }
        else {
            self.message = "";
        }
    });

    $scope.$on('$ionicView.afterEnter', function () {
        var elem = document.getElementById('addBalanceButton');
        elem.disabled = (self.account.id) ? false : true;

        $ionicSlideBoxDelegate.$getByHandle('TransactionSlideBox').update();
    });

    this.transactionsSize = function () {
        return Object.keys(self.transactions).length;
    };

    this.add = function () {
        if (!self.amount) {
            self.message = "請輸入金額";
            return;
        }

        self.message = "";

        CafeProxy.addTransaction(self.account.id, parseInt(self.amount), function (transaction) {
            AccountManager.setBalance(transaction.balance);
            self.account = AccountManager.get();
            self.amount = "";

            TransactionManager.add(transaction);

            $ionicSlideBoxDelegate.$getByHandle('TransactionSlideBox').update();

            var elem = angular.element(document.getElementById('cardFliper'));
            elem.addClass('flipped');
        });
    };

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