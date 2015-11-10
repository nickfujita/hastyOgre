'use strict';

angular.module('fbApi.main', [])

.controller('MainController', function ($scope, Main) {


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

});
