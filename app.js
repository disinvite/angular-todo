angular.module('todolist',[])
.service('mockapi',function($q,$filter) {
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

    function findTask(id) {
        return $filter('filter')(tasks,{id:id})[0];
    }
    
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
            return $q.when({"data": {"tasks": tasks}});
        },
        getTask: function(id) {
            return $q.when({"data": findTask(id)});
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
            return $q.when();
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
            return $q.when();
        }
    };
})
.service('api',function($http) {
    return {
        getAllTasks: function() {
            return $http.get('/gs/api/tasks');
        },
        getTask: function(id) {
            return $http.get('/gs/api/task/' + id);
        },
        updateTask: function(id,data) {
            return $http.put('/gs/api/task/' + id,data);
        },
        newTask: function(data) {
            return $http.post('/gs/api/tasks',data);
        }
    };
})
.controller('ctrl', ['$scope','$filter','mockapi', function($scope,$filter,api) {
    $scope.tasks = [];
    $scope.editing = null;
    $scope.form = {};
    
    api.getAllTasks().then(function(response) {
        $scope.tasks = response.data.tasks;
    });

    $scope.newTask = function() {
        $scope.editing = 'new';
        $scope.form = {};
    }

    $scope.editTask = function(id) {
        api.getTask(id).then(function(response) {
            $scope.editing = id;
            $scope.form = angular.copy(response.data);
        });
    }

    $scope.save = function() {
        if($scope.editing === 'new') {
            api.newTask($scope.form);
        } else if ($scope.editing !== null) {
            api.updateTask($scope.editing,$scope.form);
        }
        $scope.editing = null;
        
        api.getAllTasks().then(function(response) {
            $scope.tasks = response.data.tasks;
        });
    }

    $scope.finishTask = function(id) {
        //TODO check for existence
        api.updateTask(id, {completed: true});
        
        api.getAllTasks().then(function(response) {
            $scope.tasks = response.data.tasks;
        });
    }
}])
.filter('notCompleted', function() {
    return function(tasks) {
        var filtered = [];
        angular.forEach(tasks, function(task) {
            if(!!!task.completed) {
                filtered.push(task);
            }
        });
        return filtered;
    }
});
