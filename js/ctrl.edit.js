angular.module('todolist').controller('edit', ['$scope','$state','$stateParams','api', function($scope,$state,$stateParams,api) {
    $scope.form = {};
    $scope.edittext = 'Editing Task';
    var id = $stateParams.id;
    
    api.getTask(id).then(function(response) {
        $scope.form = angular.copy(response.data);
    });
    
    $scope.save = function() {
        api.updateTask(id,$scope.form);
        $state.go('table');
    }

    $scope.cancel = function() {
        $state.go('table');
    }
}])
