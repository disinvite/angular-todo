angular.module('todolist',['ui.router','ngAnimate'])
.run(function($http, $templateCache) {
    $http.get('views/edit.html', { cache: $templateCache });
    $http.get('views/table.html', { cache: $templateCache });
});