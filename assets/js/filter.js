/* ------------------------------------------- Custom filter -------------------------------------------- */

angular.module('phonebook.customFilter',[]).filter('paragraph', function () {
    return function (input) {
        return (input) ? input.replace(/\n/g, '<br />') : input
    }
})

