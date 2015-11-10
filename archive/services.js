'use strict';

angular.module('fbApi.services', [])

.factory('Main', function ($http) {
// Your code here

  var getEvents = function (placeId) {
    var url = 'https://graph.facebook.com/'+placeId+'/events?access_token=CAAXVt6C9TTUBAAOC4iwYSmdq3uJNlXdmsRmDyVffOY5Vg4pLPyy0ardblOT7AcrBUCPWMykt9XWbQ4xefATJLH04WBgQMGG8ZBqCHz4ZCaiw4ZAiO0GtJZAfZCgUinOX1qV4MFZBbJN23ZAdtUgzO6Je5uFTpRrzbdv7CaK8Hv8KSYfXR3jfCFXQTYaAU6ZBTI3oXCSMBZClcrQZDZD&fields=id,name,place,start_time,cover,attending_count,maybe_count,declined_count,noreply_count&limit=10';

    return $http({
      method: 'GET',
      url: url
    })
    .then(function (resp) {
      return resp.data.data;
    });

  };

  var getEventDetails = function(event) {
    var url = 'https://graph.facebook.com/'+event.id+'?access_token=CAAXVt6C9TTUBAAOC4iwYSmdq3uJNlXdmsRmDyVffOY5Vg4pLPyy0ardblOT7AcrBUCPWMykt9XWbQ4xefATJLH04WBgQMGG8ZBqCHz4ZCaiw4ZAiO0GtJZAfZCgUinOX1qV4MFZBbJN23ZAdtUgzO6Je5uFTpRrzbdv7CaK8Hv8KSYfXR3jfCFXQTYaAU6ZBTI3oXCSMBZClcrQZDZD';

    return $http({
      method: 'GET',
      url: url
    })
    .then(function (resp) {
      return resp;
    });
  };

  var getAttendees = function(event) {
    var url = 'https://graph.facebook.com/'+event.id+'/attending?access_token=CAAXVt6C9TTUBAAOC4iwYSmdq3uJNlXdmsRmDyVffOY5Vg4pLPyy0ardblOT7AcrBUCPWMykt9XWbQ4xefATJLH04WBgQMGG8ZBqCHz4ZCaiw4ZAiO0GtJZAfZCgUinOX1qV4MFZBbJN23ZAdtUgzO6Je5uFTpRrzbdv7CaK8Hv8KSYfXR3jfCFXQTYaAU6ZBTI3oXCSMBZClcrQZDZD';

    return $http({
      method: 'GET',
      url: url
    })
    .then(function (resp) {
      return resp;
    });
  };

  return {
    getEvents: getEvents,
    getEventDetails: getEventDetails,
    getAttendees: getAttendees
  };

});
