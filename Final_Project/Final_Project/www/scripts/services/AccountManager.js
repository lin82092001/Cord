angular.module('Final_Project').factory('AccountManager', function () {
    return {
        set: function (account) {
            localStorage.accountId = account.id;
            localStorage.accountName = account.name;
            localStorage.accountPswd = account.pswd;
            localStorage.accountBalance = account.balance;
            localStorage.accountCard = account.card;
        },
        setBalance: function (balance) {
            localStorage.accountBalance = balance;
        },
        setCard: function (card) {
            localStorage.accountCard = card;
        },
        get: function () {
            return {
                id: localStorage.accountId ? parseInt(localStorage.accountId) : "",
                name: localStorage.accountName ? localStorage.accountName : "",
                balance: localStorage.accountBalance ? parseInt(localStorage.accountBalance) : "",
                card: localStorage.accountCard ? parseInt(localStorage.accountCard) : ""
            };
        },
        clear: function () {
            localStorage.accountId = "";
            localStorage.accountName = "";
            localStorage.accountPswd = "";
            localStorage.accountBalance = "";
            localStorage.accountCard = "";
        }
    };
});