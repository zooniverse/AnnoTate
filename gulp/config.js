'use strict';

module.exports = {

    'analytics': {
        'src': 'build/index.html',
        'dest': 'build/',
        'containers': [
            {
                dataLayer: 'zooDataLayer',
                tag: 'GTM-WDW6V4',
                name: 'Zoo'
            },
            {
                dataLayer: 'dataLayer',
                tag: 'GTM-WQPJ9H',
                name: 'Tate'
            }
        ]
    },

    'browserify': {
        'bundleName': 'main.js',
        'entries': ['./app/modules/app.module.js'],
        'sourcemap': true
    },

    'dist': {
        'root': 'build'
    },

    'fonts': {
        'src': ['app/fonts/**/*'],
        'dest': 'build/fonts'
    },

    'gzip': {
        'src': 'build/**/*.{html,xml,json,css,js,js.map,ttf,otf}',
        'dest': 'build/',
        'options': {}
    },

    'images': {
        'src': 'app/images/**/*',
        'dest': 'build/images'
    },

    'modules': {
        'src': 'app/modules'
    },

    's3Paths': {
        'src': ['build/index.html', 'build/css/main.css', 'build/js/main.js']
    },

    'scripts': {
        'src': 'app/modules/**/*.js',
        'dest': 'build/js'
    },

    'serverport': 3000,

    'styles': {
        'watch': 'app/styles/**/*.styl',
        'src': 'app/styles/main.styl',
        'dest': 'build/css'
    },

    'views': {
        'watch': [
            'app/index.html',
            'app/modules/**/*.html'
        ]
    }

};
