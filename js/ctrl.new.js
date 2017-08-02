angular.module('todolist').controller('new', ['$scope','$state','$stateParams','mockapi', function($scope,$state,$stateParams,api) {
    $scope.form = {};
    $scope.edittext = 'New Task';

    $scope.save = function() {
        api.newTask($scope.form);
        $state.go('table');
    }

    $scope.cancel = function() {
        $state.go('table');
    }
}])
