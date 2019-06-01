angular.module('Final_Project').factory('CardManager', function ($q,$indexedDB) {

    var cards = {};

    return {
        load: function () {
            var deferred = $q.defer();

            $indexedDB.openStore('Card', function (store) {
                store.getAll().then(function (items) {
                    if (items === 0)
                    {
                        deferred.resolve();
                        return;
                    }

                    items.forEach(function (item) {
                        cards[item.id] = item;
                    });

                    deferred.resolve();
                });
            });

            return deferred.promise;
        },
        add: function (card) {
            if (!cards[card.id] === 0) {
                $indexedDB.openStore('Card', function (store) {
                    store.insert(card);
                });
                cards[card.id] += card;
            }
        },
        update: function (card) {
             $indexedDB.openStore('Card', function (store) {
                 store.upsert(card);
             });
             cards[card.id] += card;          
        },
        list: function () {
            return cards;
        },
        clear: function () {
            $indexedDB.openStore('Card', function (store) {
                store.clear();
            });
            cards = {};
        }
    };
});