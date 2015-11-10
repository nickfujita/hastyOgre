'use strict';

angular.module('fbApi.nav', [])

.controller('NavController', function ($scope) {

	$scope.sortCategory = 'attending_count';
  $scope.sortOrder = true;

  $scope.openMenu = function($mdOpenMenu, ev) {
    $scope.originatorEv = ev;
    $mdOpenMenu(ev);
  };

  $scope.updateSort = function(category) {
  	if($scope.sortCategory === category) {
  		$scope.sortOrder = !$scope.sortOrder;
  	} else {
  		$scope.sortCategory = category;
  		$scope.sortOrder = $scope.sortCategory === 'start_time' ? false : true;
  	}
  	console.log($scope.sortCategory + ' - ' + $scope.sortOrder);
  };

  $scope.changeDate = function(range) {

  };

});
