angular.module('todolist',['ui.router','ngAnimate'])
.config(function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/');
    $stateProvider.state('table', {
        url: '/',
        templateUrl: 'table.html',
        controller: 'table'
    }).state('new', {
        url: '/new',
        templateUrl: 'edit.html',
        controller: 'new'
    }).state('edit', {
        url: '/edit/:id',
        templateUrl: 'edit.html',
        controller: 'edit'
    });
})
.service('mockapi',function($q,$filter) {
    var tasks = [
        {
            id: 1,
            text: 'task no. 1',
            completed: false
        },
        {
            id: 2,
            text: 'task no. 2',
            completed: false
        },
        {
            id: 3,
            text: 'task no. 3',
            completed: false
        }
    ];
    var keys = ['text','order','completed'];
    var nextID = 4;

    function findTask(id) {
        return $filter('filter')(tasks,{id:id})[0];
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
.controller('table', ['$scope','$state','api', function($scope,$state,api) {
    $scope.tasks = [];
    $scope.showCompleted = false;

    api.getAllTasks().then(function(response) {
        $scope.tasks = response.data.tasks;
    });

    $scope.newTask = function() {
        $state.go('new');
    }

    $scope.editTask = function(id) {
        $state.go('edit',{id:id});
    }

    $scope.finishTask = function(id) {
        //TODO check for existence
        api.updateTask(id, {completed: true});
        
        api.getAllTasks().then(function(response) {
            $scope.tasks = response.data.tasks;
        });
    }
}])
.controller('new', ['$scope','$state','$stateParams','api', function($scope,$state,$stateParams,api) {
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
.controller('edit', ['$scope','$state','$stateParams','api', function($scope,$state,$stateParams,api) {
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
.filter('completed', function() {
    return function(tasks,showCompleted) {
        var filtered = [];
        angular.forEach(tasks, function(task) {
            if(!!task.completed == showCompleted) {
                filtered.push(task);
            }
        });
        return filtered;
    }
});
