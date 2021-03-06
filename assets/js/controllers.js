/* ---------------------------------------- Controllers ------------------------------------------------- */
var dependencies = ['ngAnimate', 'ngSanitize', 'mgcrea.ngStrap', 'chieffancypants.loadingBar','phonebook.service']
/* Contact List Controller */
angular.module('phonebook.Controller',dependencies).controller('indexCtl', function ($scope, $rootScope, service, $alert, $modal, $aside, cfpLoadingBar, $timeout) {
    $scope.start = function () {
        cfpLoadingBar.start()
    }
    $scope.complete = function () {
        cfpLoadingBar.complete()
    }
    $scope.start()
    $scope.fakeIntro = true
    $timeout(function () {
        $scope.complete()
        $scope.fakeIntro = false
    }, 750)

    $rootScope.pass = false

    $scope.showFavAside = function () {
        var aside = $aside({
            scope: $scope,
            templateUrl: '/views/asideFavorite.html',
            show: false,
            animation: 'am-slide-left',
            placement: 'custom',
            backdropAnimation: 'am-fade',
            backdrop: true,
            html: true
        })
        aside.$promise.then(function () {
            aside.show()
            $scope.contactsFav = $scope.contacts.filter(function (contact) {
                return (contact.FAVORITE === '1' && contact.SECURE === '0')
            })
        })
    }

    $scope.delete = function () {
        $scope.title = 'Success !'
        $scope.content = 'The Contact was successfully deleted.'
        $scope.class = 'alert-success'
        var deletionAlert = $alert({
            scope: $scope,
            templateUrl: '/views/alert.html',
            duration: 3,
            placement: 'top',
            container: 'body',
            animation: 'am-fade-and-slide-top',
            keyboard: true,
            show: false
        })
        deletionAlert.$promise.then(function () {
            service.deleteContact($scope.contacts[$scope.index])
            $scope.contacts.splice($scope.index, 1)
            deletionAlert.show()
        })
    }

    service.getPasscode().then(function (response1) {
        if (response1.data.length !== 0) {
            var passcode = response1.data[0].PASSCODE
            $scope.showSecureAside = function () {
                var aside = $aside({
                    scope: $scope,
                    templateUrl: '/views/asideSecure.html',
                    show: false,
                    animation: 'am-slide-right',
                    placement: 'custom',
                    backdropAnimation: 'am-fade',
                    backdrop: true,
                    html: true
                })
                aside.$promise.then(function () {
                    aside.show()
                    $scope.password = ''
                    $scope.actualPass = ''
                    $scope.attempt = ''
                    $scope.showSecured = false
                    $scope.setPassword = function (pass) {
                        $scope.actualPass = $scope.actualPass + pass
                        $scope.password = $scope.password + '*'
                        $scope.attempt = ''
                    }
                    $scope.remove = function () {
                        $scope.password = $scope.password.substring(0, $scope.password.length - 1)
                        $scope.actualPass = $scope.actualPass.substring(0, $scope.actualPass.length - 1)
                    }
                    $scope.check = function () {
                        if ($scope.actualPass === passcode) {
                            $scope.attempt = 'right'
                            $scope.showSecured = true
                            $rootScope.pass = true
                        } else {
                            $scope.attempt = 'wrong'
                            $scope.password = ''
                            $scope.actualPass = ''
                        }
                    }
                    service.showContactList().then(function (response) {
                        $scope.secured = response.data.filter(function (contact) {
                            return (contact.SECURE === '1')
                        })
                    })
                })
            }
        }
    })

    function getlist () {
        service.showContactList().then(function (response) {
            $scope.contacts = response.data.filter(function (contact) {
                return (contact.SECURE === '0')
            })
            if ($scope.contacts.length === '0') {
                $scope.noContact = true
            } else {
                $scope.noContact = false
            }

            $scope.showModal = function (index) {
                var myDialog = $modal({
                    scope: $scope,
                    templateUrl: '/views/modal.html',
                    show: false,
                    animation: 'am-fade-and-slide-top',
                    placement: 'custom',
                    backdropAnimation: 'am-fade',
                    backdrop: true,
                    html: true
                })
                myDialog.$promise.then(function () {
                    myDialog.show()
                    $scope.index = index
                })
            }
        })
    }

    getlist()

    $scope.favorite = function (index) {
        service.favoritesContact($scope.contacts[index])
        $scope.contacts[index].FAVORITE = ($scope.contacts[index].FAVORITE === '0') ? '1' : '0'
    }
})

/* Add Contact Controller */
angular.module('phonebook.Controller').controller('addCtl', function ($scope, $rootScope, $alert, service, $timeout, cfpLoadingBar) {
    $scope.start = function () {
        cfpLoadingBar.start()
    }
    $scope.complete = function () {
        cfpLoadingBar.complete()
    }
    $scope.start()
    $scope.fakeIntro = true
    $timeout(function () {
        $scope.complete()
        $scope.fakeIntro = false
    }, 750)
    $scope.submit = function () {
        $scope.title = 'Success !'
        $scope.class = 'alert-success'
        $scope.content = 'The Contact is successfully added.'
        var addAlert = $alert({
            scope: $scope,
            templateUrl: '/views/alert.html',
            duration: 3,
            placement: 'top',
            container: 'body',
            animation: 'am-fade-and-slide-top',
            keyboard: true,
            show: false
        })
        addAlert.$promise.then(function () {
            service.insertData($scope.contact)
            $scope.contact = null
            addAlert.show()
        })
    }
})

/* Contact Information Controller */
angular.module('phonebook.Controller').controller('infoCtl', function ($scope, $location, $rootScope, $routeParams, $modal, $alert, service, $timeout, cfpLoadingBar) {
    $scope.start = function () {
        cfpLoadingBar.start()
    }
    $scope.complete = function () {
        cfpLoadingBar.complete()
    }
    $scope.start()
    $scope.fakeIntro = true
    $timeout(function () {
        $scope.complete()
        $scope.fakeIntro = false
    }, 750)

    $scope.contactCheck = {
        secureContactInfo: '../../views/modalSecure.html',
        contactInfo: '../../views/contactInfo.html'
    }
    service.getPasscode().then(function (response1) {
        if (response1.data.length !== 0) {
            var passcode = response1.data[0].PASSCODE
            service.contactDetails($routeParams.id).then(function (response) {
                $scope.contact = response.data[0]
                if ($scope.contact.SECURE === '1' && $rootScope.pass === undefined || $rootScope === false) {
                    $scope.showSecured = true
                    $scope.password = ''
                    $scope.actualPass = ''
                    $scope.attempt = ''
                    $scope.setPassword = function (pass) {
                        $scope.actualPass = $scope.actualPass + pass
                        $scope.password = $scope.password + '*'
                        $scope.attempt = ''
                    }
                    $scope.remove = function () {
                        $scope.password = $scope.password.substring(0, $scope.password.length - 1)
                        $scope.actualPass = $scope.actualPass.substring(0, $scope.actualPass.length - 1)
                    }
                    $scope.check = function () {
                        if ($scope.actualPass === passcode) {
                            $scope.attempt = 'right'
                            $scope.showSecured = false
                            $rootScope.pass = true
                        } else {
                            $scope.attempt = 'wrong'
                            $scope.password = ''
                            $scope.actualPass = ''
                        }
                    }
                } else {
                    $scope.showSecured = false
                }
            })
        }
    })
    $scope.showModal = function () {
        var myDialog = $modal({
            scope: $scope,
            templateUrl: '/views/modal.html',
            show: false,
            animation: 'am-fade-and-slide-top',
            placement: 'custom',
            backdropAnimation: 'am-fade',
            backdrop: true,
            html: true
        })
        myDialog.$promise.then(function () {
            myDialog.show()
        })
    }
    $scope.delete = function () {
        $scope.title = 'Success !'
        $scope.content = 'The Contact was successfully deleted.'
        $scope.class = 'alert-success'
        var deletionAlert = $alert({
            scope: $scope,
            templateUrl: '/views/alert.html',
            duration: 3,
            placement: 'top',
            container: 'body',
            animation: 'am-fade-and-slide-top',
            keyboard: true,
            show: false
        })
        deletionAlert.$promise.then(function () {
            service.deleteContact($scope.contact)
            deletionAlert.show()
            $location.path('/')
        })
    }
    $scope.favorite = function () {
        service.favoritesContact($scope.contact)
        $scope.contact.FAVORITE = ($scope.contact.FAVORITE === '0') ? '1' : '0'
    }
    $scope.secure = function () {
        service.secureContact($scope.contact)
        $scope.contact.SECURE = ($scope.contact.SECURE === '0') ? '1' : '0'
    }
})

/* About Page Controller */
angular.module('phonebook.Controller').controller('aboutCtl', function ($scope, $rootScope, service, $alert, $http, $timeout, cfpLoadingBar) {
    $scope.start = function () {
        cfpLoadingBar.start()
    }
    $scope.complete = function () {
        cfpLoadingBar.complete()
    }
    $scope.start()
    $scope.fakeIntro = true
    $timeout(function () {
        $scope.complete()
        $scope.fakeIntro = false
    }, 750)
    var alert = $alert({
        scope: $scope,
        templateUrl: '/views/alert.html',
        duration: 3,
        placement: 'top',
        container: 'body',
        animation: 'am-fade-and-slide-top',
        keyboard: true,
        show: false
    })
    service.getPasscode().then(function (response1) {
        if (response1.data.length !== 0) {
            var passcode = response1.data[0].PASSCODE
            $scope.changePasscode = function () {
                if (passcode === $scope.currPass) {
                    service.changePasscode($scope.newPass)
                    $scope.title = 'Success !'
                    $scope.class = 'alert-success'
                    $scope.content = 'Passcode is successfully changed.'
                    alert.$promise.then(function () {
                        alert.show()
                        passcode = $scope.currPass
                    })
                } else {
                    $scope.title = 'Failure !'
                    $scope.class = 'alert-danger'
                    $scope.content = "Current Passcode doesn't match"

                    alert.$promise.then(function () {
                        alert.show()
                    })
                }
                $scope.currPass = null
                $scope.newPass = null
            }
        }
    })

    service.sampleData().then(function (response) {
        if (response.data[0].COUNT < 10) {
            $scope.samplelist = false
            $scope.sampleData = function () {
                $http({
                    method: 'POST',
                    url: '../../php/sampleData.php'
                }).then(function () {
                    $scope.samplelist = true

                    $scope.title = 'Success !'
                    $scope.class = 'alert-success'
                    $scope.content = 'Sample data added.'

                    alert.$promise.then(function () {
                        alert.show()
                    })
                })
            }
        } else {
            $scope.samplelist = true
        }
    })
})