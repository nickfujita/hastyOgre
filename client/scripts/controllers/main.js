'use strict';

angular.module('fbApi.main', [])

.controller('MainController', function ($scope, Main) {
  // // Your code here
  $scope.places = [
    '73276865566',
    '656252977718976',
    '108101985909667',
    '50112151664',
    '12432941001',
    '17295379437',
    '46770758868',
    '161650243927961',
    '232150210312273',
    '34700327700',
    '34363100821',
    '151727344869643',
    '161319500581565',
    '50285729149'
  ];
  $scope.events = [];
  $scope.eventDetails = [];

  $scope.$watch('eventDetails', function() {
    // $(".scroll_on_hover").mouseover(function() {
    //   $(this).removeClass("ellipsis");
    //   var maxscroll = $(this).width();
    //   var speed = maxscroll * 15;
    //   $(this).animate({
    //       scrollLeft: maxscroll
    //   }, speed, "linear");
    // });

    // $(".scroll_on_hover").mouseout(function() {
    //   $(this).stop();
    //   $(this).addClass("ellipsis");
    //   $(this).animate({
    //       scrollLeft: 0
    //   }, 'slow');
    // });
  });

  $scope.txtScrlIn = function(event) {
    console.log(this);
    console.log($(this));
    debugger;
    $(this).removeClass("ellipsis");
    // var maxscroll = $(this).width();
    // var speed = maxscroll * 15;
    // $(this).animate({
    //     scrollLeft: maxscroll
    // }, speed, "linear");
  };

  $scope.txtScrlOut = function($event) {
    // $(this).stop();
    $(this).addClass("ellipsis");
    // $(this).animate({
    //     scrollLeft: 0
    // }, 'slow');
  };

  $scope.getEvents = function (place) {
    Main.getEvents(place)
    .then(function (data) {
      console.log(data);
      $scope.events = $scope.events.concat(data);
      console.log($scope.events);
      // $scope.getEventDetails();
    })
    .catch(function (error) {
      console.error(error);
    });
  };

  $scope.getEventDetails = function() {
    $scope.events.forEach(function(event) { 
      Main.getEventDetails(event)
      .then(function(data) {
        console.log(data);
        $scope.eventDetails.push(data);
      })
      .catch(function (error) {
        console.error(error);
      });
    });
  };

  $scope.places.forEach(function(place) {
    console.log(place);
    $scope.getEvents(place);
  });

  $scope.enhance = function(event) {
    Main.getAttendees(event)
    .then(function(res) {
      console.log(res.data);
    })
    .catch(function (error) {
      console.error(error);
    });
  };

});
