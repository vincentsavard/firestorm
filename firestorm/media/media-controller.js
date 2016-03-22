"use strict";
var app = angular.module("firestorm");

app.controller("MediaController", function($scope, $http, config) {
    $scope.init = function() {
	$scope.is_playing = false;
	$scope.updateStatus()
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

    $scope.load = function(media_id) {
	$http({
	    method: "POST",
	    url: config.api_url + "/player/load/" + media_id
	}).then(function(response) {
	    $scope.updateStatus()
	}, function(error) {
	    $scope.error = error;
	});
    };

    $scope.play = function() {
	$http({
	    method: "POST",
	    url: config.api_url + "/player/play"
	}).then(function(response) {
	    $scope.updateStatus()
	}, function(error) {
	    $scope.error = error;
	});
    };
    
    $scope.pause = function() {
	$http({
	    method: "POST",
	    url: config.api_url + "/player/pause"
	}).then(function(response) {
	    $scope.updateStatus()
	}, function(error) {
	    $scope.error = error;
	});
    };
    
    $scope.stop = function() {
	$http({
	    method: "POST",
	    url: config.api_url + "/player/stop"
	}).then(function(response) {
	    $scope.updateStatus()
	}, function(error) {
	    $scope.error = error;
	});
    };

    $scope.updateStatus = function() {
	$http({
	    method: "GET",
	    url: config.api_url + "/player/"
	}).then(function(response) {
	    $scope.loaded_media = response.data.loaded_media;
	    $scope.is_playing = response.data.is_playing;
	}, function(error) {
	    $scope.error = error;
	});
    };

    $scope.extractNameFromPath = function(path) {
	if (path) {
	    return path.split("/").slice(-1)[0];
	}
    };
    
    $scope.init();
});
