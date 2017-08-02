angular.module('todolist').filter('completed', function() {
    return function(tasks,showCompleted) {
        var filtered = [];
        angular.forEach(tasks, function(task) {
            if(!!task.completed == showCompleted) {
                filtered.push(task);
            }
        });
        return filtered;
    }
})
