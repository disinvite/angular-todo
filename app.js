angular.module('todolist',[])
.service('api',function($http) {
    return {
        getAllTasks: function() {
            return [
                'task no. 1',
                'task no. 2',
                'task no. 3'
            ];
        }
    };
})
.controller('ctrl',function($scope,$filter,api) {
    $scope.tasks = api.getAllTasks();
})

