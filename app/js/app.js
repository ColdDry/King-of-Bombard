/**
 * Created by XJX on 2016/10/8.
 */
'use strict'

var app = angular.module('kobApp', ['ngRoute']);

app.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/', {
        templateUrl: 'step0.html',
        controller: 'step0Ctrl'
    }).when('/main', {
        templateUrl: 'main.html',
        controller: 'mainCtrl'
    });
}]);

app.controller('majorCtrl', ['$scope', function ($scope) {

}]);

app.controller('step0Ctrl', ['$scope', function ($scope) {

}]);

app.controller('mainCtrl', ['$scope', '$timeout', '$interval', 'imgSrc', function ($scope, $timeout, $interval, imgSrc) {
    var quesRes = [
        {
            ques: 1,
            ans: 9,
            lineImg: 'img/001.png',
            point: '數線由0出發，越往右表示數值越大，上圖中每一格的距離都是1，射擊的靶在第九格，所以距離應填9。'
        },
        {
            ques: 2,
            ans: 7,
            lineImg: 'img/002.png',
            point: '數線0~5之間有5格，因此每一格代表1。數線上的數越往右數值越大，射擊的靶在5往右兩格，所以是7。'
        },
        {
            ques: 3,
            ans: 13,
            lineImg: 'img/003.png',
            point: '數線上0到15之間有15格，因此每一格距離都是1。數線上的數越往左數值越小，射擊的靶在15往左兩格，所以是13。'
        },
        {
            ques: 4,
            ans: 6,
            lineImg: 'img/004.png',
            point: '數線0到10之間有五格，因此每一格代表2。射擊標靶的位置是從0往右數三格，所以是6。'
        },
        {
            ques: 5,
            ans: 7,
            lineImg: 'img/005.png',
            point: '射擊標靶位在5到10之間，因此比較靠近5，可能是6或7。如果是6應該離5更近一些，因此設定7。'
        }
    ];
    var quesNow = 0;
    $scope.showFail = false;
    $scope.showShoot = true;
    $scope.showPoint = false;
    $scope.showCorrect = false;
    $scope.showComplete = false;
    $scope.srcLine = 'img/001.png';
    $scope.srcTank = 'img/tank.png';
    $scope.srcShoot = 'img/shoot.png';
    $scope.point = quesRes[quesNow].point;
    $scope.title = 1;
    var isPlayed = false;
    var isInt = /^[0-9]*[1-9][0-9]*$/; //判斷正整數的function

    $scope.onFire = function () {
        console.log('input:' + $scope.inputAns);
        if (isInt.test($scope.inputAns) && !isPlayed) {
            $scope.srcLine = quesRes[quesNow].lineImg;
            var count = 0;
            $interval(function () {
                $scope.srcTank = imgSrc.getTankImgs($scope.inputAns)[count];
                $scope.srcShoot = imgSrc.getShootImgs($scope.inputAns)[count];
                count++;
            }, 200, 8);
            $timeout(function () {
                $scope.srcLine = imgSrc.getLineImgs(quesRes[quesNow].ques, $scope.inputAns);
                $timeout(function () {
                    checkAns();
                }, 800);
            }, 1500);
            isPlayed = true;
        }
    };

    $scope.nextQues = function () {
        if (quesNow < 5) {
            quesNow++;
            $scope.title++;
            $scope.point = quesRes[quesNow].point;
            $scope.srcLine = quesRes[quesNow].lineImg;
            $scope.showShoot = true;
            $scope.showPoint = false;
            $scope.showFail = false;
            $scope.showCorrect = false;
            $scope.showComplete = false;
            $scope.srcTank = 'img/tank.png';
            $scope.srcShoot = 'img/shoot.png';
            $scope.inputAns = '';
            isPlayed = false;
        }
    };


    $scope.readPoint = function () {
        $scope.showFail = false;
        $scope.showShoot = false;
        $scope.showPoint = true;
        $scope.showCorrect = false;
        $scope.showComplete = false;
        isPlayed = false;
    };
    $scope.playAgain = function () {
        $scope.showShoot = true;
        $scope.showPoint = false;
        $scope.showFail = false;
        $scope.showCorrect = false;
        $scope.showComplete = false;
        $scope.inputAns = '';
        $scope.srcLine = 'img/001.png';
        $scope.srcTank = 'img/tank.png';
        $scope.srcShoot = 'img/shoot.png';
        isPlayed = false;
    };


    var checkAns = function () {
        if ($scope.inputAns == quesRes[quesNow].ans) {
            if(quesNow == 4){
                $scope.showFail = false;
                $scope.showShoot = false;
                $scope.showPoint = false;
                $scope.showComplete = true;
                $scope.showCorrect = false;
            }else {
                $scope.showFail = false;
                $scope.showShoot = false;
                $scope.showPoint = false;
                $scope.showComplete = false;
                $scope.showCorrect = true;
            }
        } else {
            $scope.showFail = true;
            $scope.showShoot = false;
            $scope.showPoint = false;
            $scope.showComplete = false;
            $scope.showCorrect = false;
        }
    }

}]);

app.factory('imgSrc', function () {
    var tanks = {
        tank1: [
            'img/tank1/tank1-0.png',
            'img/tank1/tank1-1.png',
            'img/tank1/tank1-2.png',
            'img/tank1/tank1-3.png',
            'img/tank1/tank1-4.png',
            'img/tank1/tank1-5.png',
            'img/tank1/tank1-6.png',
            'img/tank1/tank1-7.png'
        ],
        tank2: [
            'img/tank2/tank2-0.png',
            'img/tank2/tank2-1.png',
            'img/tank2/tank2-2.png',
            'img/tank2/tank2-3.png',
            'img/tank2/tank2-4.png',
            'img/tank2/tank2-5.png',
            'img/tank2/tank2-6.png',
            'img/tank2/tank2-7.png'
        ],
        tank3: [
            'img/tank3/tank3-0.png',
            'img/tank3/tank3-1.png',
            'img/tank3/tank3-2.png',
            'img/tank3/tank3-3.png',
            'img/tank3/tank3-4.png',
            'img/tank3/tank3-5.png',
            'img/tank3/tank3-6.png',
            'img/tank3/tank3-7.png'
        ],
        tank4: [
            'img/tank4/tank4-0.png',
            'img/tank4/tank4-1.png',
            'img/tank4/tank4-2.png',
            'img/tank4/tank4-3.png',
            'img/tank4/tank4-4.png',
            'img/tank4/tank4-5.png',
            'img/tank4/tank4-6.png',
            'img/tank4/tank4-7.png'
        ]
    };
    var shoots = {
        shoot1: [
            'img/shoot1/shoot1-0.png',
            'img/shoot1/shoot1-1.png',
            'img/shoot1/shoot1-2.png',
            'img/shoot1/shoot1-3.png',
            'img/shoot1/shoot1-4.png',
            'img/shoot1/shoot1-5.png',
            'img/shoot1/shoot1-6.png',
            'img/shoot1/shoot1-7.png'
        ],
        shoot2: [
            'img/shoot2/shoot2-0.png',
            'img/shoot2/shoot2-1.png',
            'img/shoot2/shoot2-2.png',
            'img/shoot2/shoot2-3.png',
            'img/shoot2/shoot2-4.png',
            'img/shoot2/shoot2-5.png',
            'img/shoot2/shoot2-6.png',
            'img/shoot2/shoot2-7.png'
        ],
        shoot3: [
            'img/shoot3/shoot3-0.png',
            'img/shoot3/shoot3-1.png',
            'img/shoot3/shoot3-2.png',
            'img/shoot3/shoot3-3.png',
            'img/shoot3/shoot3-4.png',
            'img/shoot3/shoot3-5.png',
            'img/shoot3/shoot3-6.png',
            'img/shoot3/shoot3-7.png'
        ],
        shoot4: [
            'img/shoot4/shoot4-0.png',
            'img/shoot4/shoot4-1.png',
            'img/shoot4/shoot4-2.png',
            'img/shoot4/shoot4-3.png',
            'img/shoot4/shoot4-4.png',
            'img/shoot4/shoot4-5.png',
            'img/shoot4/shoot4-6.png',
            'img/shoot4/shoot4-7.png'
        ]
    };
    return {
        getTankImgs: function (num) {
            if (num < 4) {
                return tanks.tank1;
            } else if (num < 8) {
                return tanks.tank2;
            } else if (num < 12) {
                return tanks.tank3;
            } else {
                return tanks.tank4;
            }
        },
        getShootImgs: function (num) {
            if (num < 4) {
                return shoots.shoot1;
            } else if (num < 8) {
                return shoots.shoot2;
            } else if (num < 12) {
                return shoots.shoot3;
            } else {
                return shoots.shoot4;
            }
        },
        getLineImgs: function (ques, num) {
            if (num < 16) {
                switch (ques) {
                    case 1:
                        return 'img/001_1' + num + '.png';
                        break;
                    case 2:
                        return 'img/002_1' + num + '.png';
                        break;
                    case 3:
                        return 'img/003_1' + num + '.png';
                        break;
                    case 4:
                        return 'img/004_1' + num + '.png';
                        break;
                    case 5:
                        return 'img/005_1' + num + '.png';
                        break;
                }
            } else {
                return 'img/001.png';
            }
        }
    }
});