'use strict';

angular.module('fbApi.services', [])

.factory('Main', function ($http) {

  var getEvents = function () {

    return $http({
      method: 'GET',
      url: '/api/events'
    })
    .then(function (res) {
      console.log(res)
      return res.data;
    })
    .catch(function (err) {
      console.error(err);
    })
    ;

  };

  return {
    getEvents: getEvents
  };

});
