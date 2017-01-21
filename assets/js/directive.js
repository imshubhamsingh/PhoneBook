/* --------------------------------------- Custom Directive ---------------------------------------------- */

angular.module('phonebook.directive',['phonebook.service']).directive('editable', function ($routeParams, $alert, service) {
    return {
        restrict: 'AE',
        templateUrl: '../../views/editable.html',
        scope: {
            value: '=editable',
            field: '@fieldType',
            lbl: '@labelText'
        },
        controller: function ($scope) {
            $scope.editor = {
                showing: false,
                value: $scope.value,
                fieldName: $scope.lbl
            }
            $scope.toggleEditor = function () {
                $scope.editor.showing = !$scope.editor.showing
            }
            $scope.title = 'Success !'
            $scope.content = 'Contact Updated'
            $scope.class = 'alert-success'
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
            $scope.field = ($scope.field) ? $scope.field : 'text'
            $scope.save = function () {
                service.contactUpdate($routeParams.id, $scope.editor.fieldName, $scope.editor.value).then(function () {
                    service.contactDetails($routeParams.id).then(function (response) {
                        $scope.contact = response.data[0]
                        if ($scope.editor.fieldName === 'NAME') $scope.value = $scope.contact.NAME
                        if ($scope.editor.fieldName === 'PHONE') $scope.value = $scope.contact.PHONE
                        if ($scope.editor.fieldName === 'ADDRESS') $scope.value = $scope.contact.ADDRESS
                        if ($scope.editor.fieldName === 'EMAIL') $scope.value = $scope.contact.EMAIL
                        if ($scope.editor.fieldName === 'WEBSITE') $scope.value = $scope.contact.WEBSITE
                        if ($scope.editor.fieldName === 'NOTES') $scope.value = $scope.contact.NOTES
                    })
                    alert.$promise.then(function () {
                        alert.show()
                        $scope.toggleEditor()
                    })
                })
            }
        }
    }
})
