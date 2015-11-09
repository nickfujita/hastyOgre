'use strict';

angular.module('fbApi', [
  'fbApi.services',
  'fbApi.main',
  'ui.router',
  'ngMaterial',
  'ngAnimate'
])
//, $urlRouterProvider, $httpProvider
.config(function ($stateProvider, $urlRouterProvider) {
  $stateProvider
  .state('default', {
    url: '/',
    templateUrl: '/views/main.html',
    controller: 'MainController'
  });

  $urlRouterProvider.otherwise('/');

});

