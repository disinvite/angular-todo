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
    var keys = ['text','order','completed'];

    return {
        getAllTasks: function() {
            return tasks;
        },
        updateTask: function(id,data) {
            tasks.forEach(function(task) {
                if(task.id == id) {
                    keys.forEach(function(key) {
                        if(key in data) {
                            task[key] = data[key];
                        }
                    });
                }
            });
        }
    };
})
.controller('ctrl',function($scope,$filter,api) {
    $scope.tasks = api.getAllTasks();
    $scope.editing = null;
    $scope.form = {};

    function findTask(id) {
        return $filter('filter')($scope.tasks,{id:id})[0];
    }
    
    $scope.editTask = function(id) {
        $scope.editing = id;
        $scope.form = angular.copy(findTask(id));
    }

    $scope.updateTask = function() {
        api.updateTask($scope.editing,$scope.form);
    }

    $scope.finishTask = function(id) {
        //TODO check for existence
        api.updateTask(id, {completed: true});
        $scope.tasks = api.getAllTasks();
    }
})
