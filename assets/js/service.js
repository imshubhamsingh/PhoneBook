/* -------------------------------------------- Factory ------------------------------------------------ */

/* All services need in Controller */
app.factory('service', function ($http) {
    return {
        insertData: function (contact) {
            $http({
                method: 'POST',
                url: '../../php/addContact.php',
                data: contact

            }).then(function (response) {})
        },
        showContactList: function () {
            return $http({
                method: 'POST',
                url: '../../php/contactList.php'
            })
        },
        deleteContact: function (contact) {
            $http({
                method: 'POST',
                url: '../../php/deleteContact.php',
                data: contact

            }).then(function (response) {})
        },
        contactDetails: function (id) {
            return $http({
                method: 'POST',
                url: '../../php/contactDetails.php',
                data: {
                    ID: id
                }
            })
        },
        contactUpdate: function (id, detail, value) {
            return $http({
                method: 'POST',
                url: '../../php/contactUpdate.php',
                data: {
                    ID: id,
                    detail: detail,
                    value: value
                }

            })
        },
        favoritesContact: function (contact) {
            $http({
                method: 'POST',
                url: '../../php/favoritesContact.php',
                data: contact

            }).then(function (response) {})
        },
        secureContact: function (contact) {
            $http({
                method: 'POST',
                url: '../../php/secureContact.php',
                data: contact

            }).then(function (response) {})
        },
        changePasscode: function (passcode) {
            $http({
                method: 'POST',
                url: '../../php/changePasscode.php',
                data: {
                    PASSCODE: passcode
                }

            }).then(function (response) {})
        },
        getPasscode: function () {
            return $http({
                method: 'POST',
                url: '../../php/getPasscode.php'
            })
        },
        sampleData: function () {
            return $http({
                method: 'POST',
                url: '../../php/contactCount.php'
            })
        }
    }
})
