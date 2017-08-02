angular.module('todolist').service('mockapi',function($q,$filter) {
    var tasks = [
        {
            id: 1,
            text: 'task no. 1',
            completed: false,
            important: 0
        },
        {
            id: 2,
            text: 'task no. 2',
            completed: false,
            important: 0
        },
        {
            id: 3,
            text: 'task no. 3',
            completed: false,
            important: 0
        }
    ];
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
                completed: false,
                important: data.important | false
            }

            tasks.push(task);

            nextID++;
            return $q.when();
        }
    };
})
