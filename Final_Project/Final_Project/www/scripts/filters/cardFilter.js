angular.module('Final_Project').filter('cardFilter', function () {
    return function (cards, isUsed) {
        return Object.keys(cards).map(function (key) {
            return cards[key];
        }).filter(function (card) {
            return (isUsed && card.buyStamp) || (!isUsed && !card.buyStamp);
        });
    };
});