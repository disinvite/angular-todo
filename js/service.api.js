angular.module('todolist').service('api',function($http) {
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