angular.module('todolist',[])
.service('api',function($http) {
    return {
        getAllTasks: function() {
            return [
                {
                    text: 'task no. 1',
                    order: 1
                },
                {
                    text: 'task no. 2',
                    order: 2
                },
                {
                    text: 'task no. 3',
                    order: 3
                }
            ];
        }
    };
})
.controller('ctrl',function($scope,$filter,api) {
    $scope.tasks = api.getAllTasks();
})

