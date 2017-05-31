require.config({
    baseUrl: '',
    paths: {
        'jquery': 'lib/jquery',
        'angular': 'lib/angular',
        'bootstrap': 'lib/bootstrap',
        'angularRoute': 'lib/angular-route',
        'app': 'js/app'
    },
    shim: {
        'jquery': {
            'exports': '$'
        },
        'angular': {
            'exports': 'angular'
        },
        'bootstrap': ['jquery'],
        'angularRoute': ['angular']
    },
    deps: ['app'],
    priority: ["angular"],
});