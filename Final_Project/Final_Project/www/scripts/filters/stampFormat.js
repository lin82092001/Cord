angular.module('Final_Project').filter('stampFormat', function () {
    return function (stampString) {
        if (!stampString)
            return;
        return moment(stampString).format('YYYY/MM/DD HH:mm:ss');
    };
});