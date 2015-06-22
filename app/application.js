var path = require('path');
var kpio = require('keepass.io');
var Lazy = require('./app/Lazy.js');

var database = new kpio.Database();
var databasePath = '/var/www/lazy/Fidesio.kdbx';

var roots = [
    'Fidesio/fidesio/thot - 192.168.0.210/basty',
    'Fidesio/fidesio/thot - 192.168.0.210/aker'
];

var lazy = angular.module('lazy', [
    // 'ngRoute'
]);

lazy.config(function() {

});

lazy.run(function() {

});

lazy.controller('NodeController', function($scope, $q) {
    $scope.node = {};
    $scope.info = '';

    $scope.showPassword = function() {
        console.log(this);
    };

    $scope.goToPrevious = function() {
        $scope.goTo($scope.node._$previous);
    };

    $scope.goTo = function(node) {
        if (typeof node._$previous === 'undefined') {
            node._$previous = $scope.node;
            delete node._$previous.$$hashKey;
        }

        node.loadData(database.getBasicApi());
        console.log(node.data);
        $scope.info = node.data;
        $scope.node = node;
    };

    var deferred = $q.defer();

    database.addCredential(new kpio.Credentials.Password('fidesio'));
    database.loadFile(databasePath, function(err) {
        if (err) {
            return deferred.reject(err);
        }

        var finder = new Lazy.Finder.KeePass();
        var builder = new Lazy.Node.Builder.KeePass();
        var node = builder.build(database.getBasicApi().getGroupTree());

        return deferred.resolve(node.children[0]);
    });

    deferred.promise.then(
        function(node) { $scope.node = node; },
        function() { alert('error occured'); }
    );
});
