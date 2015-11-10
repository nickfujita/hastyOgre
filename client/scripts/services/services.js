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

  var getAttendees = function () {

    return $http({
      method: 'GET',
      url: '/api/attendees'
    })
    .then(function (res) {
      return res.data;
    })
    .catch(function (err) {
      console.error(err);
    })
    ;

  };

  return {
    getEvents: getEvents,
    getAttendees: getAttendees
  };

});
