'use strict';

angular.module('fbApi.main', [])

.controller('MainController', function ($scope, Main) {

  // $scope.sortCategory = 'attending_count';
  // $scope.sortOrder = true;
  // $scope.today = new Date();
  
  $scope.getEvents = function () {
    Main.getEvents()
    .then(function (data) {
      $scope.events = data;
    })
    .catch(function (error) {
      console.error(error);
    });
  };

  $scope.getEvents();

  $scope.getRatio = function (a, total) {
    var temp = 5*Math.round(((a/total)*100)/5)
    return temp;
  };

})


.filter('dateFilter', function(){
  var filter = function(items, field, days){
    var timeStart = Date.now();
    var timeEnd = Date.now() + (days * 86400000); // 1 day in ms
    if(items) {
      return items.filter(function(item){
        var itemDate = new Date(item[field]);
        return (itemDate > timeStart && itemDate < timeEnd);
      });
    } else {
      return items;
    }
  };

  // filter.$stateful = true;

  return filter;

});





















  // $scope.$watch('eventDetails', function() {
  //   // $(".scroll_on_hover").mouseover(function() {
  //   //   $(this).removeClass("ellipsis");
  //   //   var maxscroll = $(this).width();
  //   //   var speed = maxscroll * 15;
  //   //   $(this).animate({
  //   //       scrollLeft: maxscroll
  //   //   }, speed, "linear");
  //   // });

  //   // $(".scroll_on_hover").mouseout(function() {
  //   //   $(this).stop();
  //   //   $(this).addClass("ellipsis");
  //   //   $(this).animate({
  //   //       scrollLeft: 0
  //   //   }, 'slow');
  //   // });
  // });

  // $scope.txtScrlIn = function(event) {
  //   console.log(this);
  //   console.log($(this));
  //   // debugger;
  //   $(this).removeClass("ellipsis");
  //   // var maxscroll = $(this).width();
  //   // var speed = maxscroll * 15;
  //   // $(this).animate({
  //   //     scrollLeft: maxscroll
  //   // }, speed, "linear");
  // };

  // $scope.txtScrlOut = function($event) {
  //   // $(this).stop();
  //   $(this).addClass("ellipsis");
  //   // $(this).animate({
  //   //     scrollLeft: 0
  //   // }, 'slow');
  // };