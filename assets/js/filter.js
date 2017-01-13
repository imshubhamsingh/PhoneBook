/* ------------------------------------------- Custom filter -------------------------------------------- */

app.filter('paragraph', function () {
    return function (input) {
        return (input) ? input.replace(/\n/g, '<br />') : input
    }
})

