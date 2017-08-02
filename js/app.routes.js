angular.module('todolist').config(function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/');
    $stateProvider.state('table', {
        url: '/',
        templateUrl: 'views/table.html',
        controller: 'table'
    }).state('new', {
        url: '/new',
        templateUrl: 'views/edit.html',
        controller: 'new'
    }).state('edit', {
        url: '/edit/:id',
        templateUrl: 'views/edit.html',
        controller: 'edit'
    });
})
