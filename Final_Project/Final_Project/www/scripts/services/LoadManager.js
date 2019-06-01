angular.module('Final_Project').factory('LoadManager', function ($q, TransactionManager, CardManager, ProductManager) {

    var deferred = $q.defer();

    var promises = [
        TransactionManager.load(),
        CardManager.load(),
        ProductManager.load()
    ];

    $q.all(promises).then(function () {
        deferred.resolve();
    });

    return {
        ready: function () {
            return deferred.promise;
        }
    };
});