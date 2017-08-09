angular.module('todolist').service('api',function($http) {
    return {
        getAllTasks: function() {
            return $http.get('http://localhost:57772/gs/api/tasks');
        },
        getTask: function(id) {
            return $http.get('http://localhost:57772/gs/api/task/' + id);
        },
        updateTask: function(id,data) {
            return $http.put('http://localhost:57772/gs/api/task/' + id, data);
        },
        newTask: function(data) {
            return $http.post('http://localhost:57772/gs/api/tasks', data);
        },
        finishTask: function(id) {
            return $http.put('http://localhost:57772/gs/api/task/' + id, {completed: 1});
        }
    };
})
