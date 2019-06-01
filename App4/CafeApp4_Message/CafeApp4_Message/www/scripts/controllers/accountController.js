angular.module('CafeApp4_Message').controller('accountController', function ($scope, AccountManager,
    TransactionManager, CouponManager, CafeProxy, MessageProxy, MessageCordova) {

    var self = this;

    $scope.$on('$ionicView.beforeEnter', function () {
        self.account = AccountManager.get();
    });

    this.login = function () {
        if (!self.name) {
            alert("請輸入姓名");
            return;
        }

        CafeProxy.loginAccount(self.name, function (account) {
            AccountManager.set(account);
            self.account = AccountManager.get();
            self.name = "";

            CafeProxy.getTransactions(account.id, function (transactions) {
                transactions.forEach(function (transaction) {
                    TransactionManager.add(transaction);
                });
            });

            CafeProxy.getCoupons(account.id, function (coupons) {
                coupons.forEach(function (coupon) {
                    CouponManager.add(coupon);
                });
            });

            MessageProxy.registerToken(account.id, MessageCordova.getDeviceType(),
			MessageCordova.getDeviceToken(), function () { });
        });
    };

    this.logout = function () {
        self.account = {};

        AccountManager.clear();
        TransactionManager.clear();
        CouponManager.clear();
    };

});