/**
 * Created by XJX on 2016/10/8.
 */
'use strict'

var app = angular.module('kobApp', ['ngRoute']);

app.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/', {
        templateUrl: 'step0.html',
        controller: 'step0Ctrl'
    }).when('/step1-1',{
        templateUrl:'step1-1.html',
        controller:'step11Ctrl'
    });
}]);

app.controller('majorCtrl', ['$scope', function ($scope) {

}]);

app.controller('step0Ctrl', ['$scope', function ($scope) {

}]);

app.controller('step11Ctrl', ['$scope', function ($scope) {

}]);