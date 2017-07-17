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
    var nextID = 4;

    function maxOrder() {
        var max = null;
        tasks.forEach(function(task) {
            if(!max || task.order > max)  {
                max = task.order;
            }
        });
        return max;
    }

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
        },
        newTask: function(data) {
            var task = {
                id: nextID,
                text: data.text,
                order: maxOrder() + 1,
                completed: false
            }

            tasks.push(task);

            nextID++;
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

    $scope.save = function() {
        if($scope.editing) {
            api.updateTask($scope.editing,$scope.form);
        } else {
            api.newTask($scope.form);
        }
    }

    $scope.finishTask = function(id) {
        //TODO check for existence
        api.updateTask(id, {completed: true});
    }
})
