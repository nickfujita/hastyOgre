
'use strict';

angular.module('fbApi.nav', [])

.controller('NavController', function ($scope) {

	$scope.sortCategory = 'attending_count';
  $scope.sortOrder = true;
  $scope.days = 14;

  $scope.maleRatio = 'attending_count*((demographics.genderSummary.female>0 ? demographics.genderSummary.female : 1)/(demographics.genderSummary.male>0 ? demographics.genderSummary.male : 1))';
  $scope.femaleRatio = 'attending_count*((demographics.genderSummary.male>0 ? demographics.genderSummary.male : 1)/(demographics.genderSummary.female>0 ? demographics.genderSummary.female : 1))';

  $scope.openMenu = function($mdOpenMenu, ev) {
    $scope.originatorEv = ev;
    $mdOpenMenu(ev);
  };

  $scope.updateSort = function(category) {
    console.log('CURRENT: '+$scope.sortCategory + ' - ' + $scope.sortOrder);

    var originalCategory = category;
    var currentCategory = $scope.sortCategory;
    var currentOrder = $scope.sortOrder;

    if(category === 'gender') {

      if(currentCategory === $scope.maleRatio) {
        currentCategory = $scope.femaleRatio;
      } else {
        currentCategory = $scope.maleRatio;
      }

    } else {
    	if(currentCategory === category) {
    		currentOrder = !currentOrder;
    	} else {
    		currentCategory = category;
    		currentOrder = $scope.sortCategory === 'start_time' ? false : true;
    	}
    }

    $scope.sortCategory = currentCategory;
    $scope.sortOrder = currentOrder;
  	console.log('NEW: '+$scope.sortCategory + ' - ' + $scope.sortOrder);
  };

  $scope.changeDate = function(range) {
    switch(range) {
      case 'today':
        $scope.days = 1;
        break;
      case '3days':
        $scope.days = 3;
        break;
      case 'week':
        $scope.days = 7;
        break;
      case '2weeks':
        $scope.days = 14;
        break;
      case 'month':
        $scope.days = 30;
        break;
      case 'year':
        $scope.days = 365;
        break;
      default:
        $scope.days = 1000;
        break;
    };
    console.log($scope.days);
  };

});
