/**
 * Created by XJX on 2016/10/8.
 */
'use strict'

var app = angular.module('kobApp', ['ngRoute']);

app.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/', {
        templateUrl: 'step0.html',
        controller: 'step0Ctrl'
    });
}]);

app.controller('majorCtrl', ['$scope', function ($scope) {

}]);

app.controller('step0Ctrl', ['$scope', function ($scope) {
    $scope.hello = 'hello World!';
}]);