angular.module('todolist').service('mockapi',function($q,$filter) {
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
