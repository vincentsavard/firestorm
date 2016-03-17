"use strict";
var app = angular.module("firestorm");

app.controller("MediaController", function($scope, $http, config) {
    $scope.init = function() {
	$scope.status = "No media loaded";
	$scope.listMedias();
    };

    $scope.update = function() {
	$http({
	    method: "POST",
	    url: config.api_url + "/media/update"
	}).then(function(response) {
	    $scope.listMedias();
	}, function(error) {
	    $scope.error = error;
	});
    };

    $scope.listMedias = function() {
	$http({
	    method: "GET",
	    url: config.api_url + "/media/"
	}).then(function(response) {
	    $scope.medias = response.data;
	}, function(error) {
	    $scope.error = error;
	});
    };

    $scope.load = function(media_id, media_title) {
	$http({
	    method: "POST",
	    url: config.api_url + "/player/load/" + media_id
	}).then(function(response) {
	    $scope.loaded_media_id = media_id;
	    $scope.loaded_media_title = media_title;
	}, function(error) {
	    $scope.loaded_media_id = -1;
	    $scope.loaded_media_title = "";
	    $scope.error = error;
	});
    };

    $scope.play = function() {
	$http({
	    method: "POST",
	    url: config.api_url + "/player/play"
	}).then(function(response) {
	    $scope.status = "Playing";
	}, function(error) {
	    $scope.status = "Error";
	    $scope.error = error;
	});
    };
    
    $scope.pause = function() {
	$http({
	    method: "POST",
	    url: config.api_url + "/player/pause"
	}).then(function(response) {
	    $scope.status = "Paused";
	}, function(error) {
	    $scope.status = "Error";
	    $scope.error = error;
	});
    };
    
    $scope.stop = function() {
	$http({
	    method: "POST",
	    url: config.api_url + "/player/stop"
	}).then(function(response) {
	    $scope.status = "Stopped";
	}, function(error) {
	    $scope.status = "Error";	    	    
	    $scope.error = error;
	});
    };

    $scope.extractNameFromPath = function(path) {
	return path.split("/").slice(-1)[0];
    };
    
    $scope.init();
});
