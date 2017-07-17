angular.module('todolist',[])
.service('api',function($q,$filter) {
    var tasks = [
        {
            id: 1,
            text: 'task no. 1',
            order: 1,
            completed: false
        },
        {
            id: 2,
            text: 'task no. 2',
            order: 2,
            completed: false
        },
        {
            id: 3,
            text: 'task no. 3',
            order: 3,
            completed: false
        }
    ];

    return {
        getAllTasks: function() {
            return tasks;
        },
        finishTask: function(id) {
            tasks.forEach(function(task) {
                if(task.id == id) {
                    task.completed = true;
                }
            });
        }
    };
})
.controller('ctrl',function($scope,$filter,api) {
    $scope.tasks = api.getAllTasks();

    $scope.finishTask = function(id) {
        //TODO check for existence
        api.finishTask(id);
        $scope.tasks = api.getAllTasks();
    }
})
