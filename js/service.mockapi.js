angular.module('todolist').service('mockapi',function($q,$filter) {
    var tasks = [
        {
            id: 1,
            text: 'task no. 1',
            completed: 0,
            important: 0
        },
        {
            id: 2,
            text: 'task no. 2',
            completed: 0,
            important: 0
        },
        {
            id: 3,
            text: 'task no. 3',
            completed: 0,
            important: 0
        },
        {
            id: 4,
            text: 'important',
            completed: 0,
            important: 1
        },
        {
            id: 5,
            text: 'important and done',
            completed: 1,
            important: 1
        }
    ];
    var nextID = 6;

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
                    if('text' in data) {
                        task.text = data.text;
                    }

                    if('important' in data) {
                        task.important = data.important;
                    }
                    
                    if('completed' in data) {
                        task.completed = data.completed;
                    }
                }
            });
            return $q.when();
        },
        newTask: function(data) {
            var task = {
                id: nextID,
                text: data.text,
                completed: 0,
                important: data.important
            }

            tasks.push(task);

            nextID++;
            return $q.when();
        },
        finishTask: function(id) {
            tasks.forEach(function(task) {
                if(task.id == id) {
                    task.completed = 1;
                }
            });
            return $q.when();
        }
    };
})
