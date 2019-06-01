angular.module('Final_Project').controller('accountController', function ($scope, AccountManager,
    TransactionManager, CardManager, CardProxy) {

    var self = this;

    $scope.$on('$ionicView.beforeEnter', function () {
        self.account = AccountManager.get();
    });

    this.login = function () {
        if (!(self.name && self.pswd)) {
            alert("請輸入帳號與密碼");
            return;
        }

        CardProxy.loginAccount(self.name, self.pswd, function (account) {
            AccountManager.set(account);
            self.account = AccountManager.get();
            self.name = "";
            self.pswd = "";

            CardProxy.getTransactions(account.id, function (transactions) {
                transactions.forEach(function (transaction) {
                    TransactionManager.add(transaction);
                });
            });

            CardProxy.getCards(account.id, function (cards) {
                cards.forEach(function (card) {
                    CardManager.add(card);
                });
            });

        });
    };

    this.logout = function () {
        self.account = {};

        AccountManager.clear();
        TransactionManager.clear();
        CardManager.clear();
    };

});