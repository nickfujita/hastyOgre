'use strict';

angular.module('fbApi', [
  'fbApi.services',
  'fbApi.main',
  'fbApi.nav',
  'ui.router',
  'ngMaterial',
  'ngAnimate'
])
//, $urlRouterProvider, $httpProvider
.config(function ($stateProvider, $urlRouterProvider) {
  $stateProvider
  .state('dashboard', {
    url: '/dashboard',
    templateUrl: '/views/nav.html',
    controller: 'NavController',
    controllerAs: 'nav'
  })
  .state('dashboard.main', {
    url: '/main',
    templateUrl: '/views/main.html',
    controller: 'MainController',
    controllerAs: 'main'
  });

  $urlRouterProvider.otherwise('/dashboard/main');

});

