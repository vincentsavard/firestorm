"use strict";
var app = angular.module("firestorm", ["ngRoute"]);

app.constant("config", {
    api_url: "http://192.168.2.18/api"
});

app.config(function($routeProvider) {
    $routeProvider.when("/", {
	templateUrl: "firestorm/home/home.html"
    });

    $routeProvider.otherwise({redirectTo: "/"});
});

app.run(function ($rootScope, $http) {
    $http.defaults.headers.put = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, X-Requested-With'
    };
    $http.defaults.useXDomain = true;
});
