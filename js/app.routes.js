angular.module('todolist').config(function($stateProvider, $urlRouterProvider) {
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
