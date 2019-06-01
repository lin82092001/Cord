angular.module('CafeApp0_Hello').controller('helloController', function () {

    this.deviceType = device.platform;

    this.flip = function () {
        var elem = angular.element(document.getElementById('layoutFliper'));
        if (elem.hasClass('flipped')) {
            elem.removeClass('flipped');
        } else {
            elem.addClass('flipped');
        }
    };

});