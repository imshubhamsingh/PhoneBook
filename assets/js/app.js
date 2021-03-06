/* global angular */

angular.module('phoneBook', ['ngRoute','phonebook.directive','phonebook.customFilter','phonebook.Controller'])
    .controller('appCtrl', function ($scope, $rootScope, $location) {
        $scope.startSearch = function () {
            $location.path('/')
        }
        $scope.path = $location.path()
        $scope.search = $rootScope.contacts
        $scope.pageClass = function (path) {
            return (path === $location.path()) ? 'active' : ''
        }
    })
    .config(function ($routeProvider, $locationProvider, cfpLoadingBarProvider) {
    // remove hash from URL
    $locationProvider.html5Mode({
        enabled: true,
        requireBase: false
    })

    // for angular-loader
    cfpLoadingBarProvider.includeSpinner = false

    $routeProvider
        .when('/', {
            controller: 'indexCtl',
            templateUrl: '../../views/contactList.html'
        })
        .when('/add-contact', {
            controller: 'addCtl',
            templateUrl: '../../views/addContact.html'
        })
        .when('/contact-' + ':id', {
            controller: 'infoCtl',
            templateUrl: '../../views/contactCheck.html'
        })
        .when('/about', {
            controller: 'aboutCtl',
            templateUrl: '../../views/about.html'
        })
        .otherwise({
            redirectTo: '/'
        })
})









