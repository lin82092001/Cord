angular.module('Final_Project').factory('TransactionManager', function ($indexedDB, $q) {

    var transactions = {};

    return {
        load: function () {
            var deferred = $q.defer();

            $indexedDB.openStore('Transaction', function (store) {
                store.getAll().then(function (items) {
                    if (items.length === 0) {
                        deferred.resolve();
                        return;
                    }

                    items.forEach(function (item) {
                        transactions[item.id] = item;
                    });

                    deferred.resolve();
                });
            });

            return deferred.promise;
        },

        add: function (transaction) {
            if (!transactions[transaction.id]) {
                $indexedDB.openStore('Transaction', function (store) {
                    store.insert(transaction);
                });
                transactions[transaction.id] = transaction;
            }
        },

        list: function () {
            return transactions;
        },

        clear: function () {
            $indexedDB.openStore('Transaction', function (store) {
                store.clear();
            });
            transactions = {};
        }
    };
});