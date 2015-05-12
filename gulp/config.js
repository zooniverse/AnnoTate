'use strict';

module.exports = {

    'browserify': {
        'bundleName': 'main.js',
        'entries': ['./app/modules/app.module.js'],
        'sourcemap' : true
    },

    'deploy': {
        'preview': {
            'Bucket': 'zooniverse-static',
            'Prefix': 'preview.zooniverse.org/annotate/',
        }
    }

    'dist': {
        'root': 'build'
    },

    'fonts': {
        'src' : ['app/fonts/**/*'],
        'dest': 'build/fonts'
    },

    'gzip': {
        'src': 'build/**/*.{html,xml,json,css,js,js.map,ttf,otf}',
        'dest': 'build/',
        'options': {}
    },

    'images': {
        'src' : 'app/images/**/*',
        'dest': 'build/images'
    },

    'modules': {
        'src': 'app/modules'
    },

    'scripts': {
        'src' : 'app/modules/**/*.js',
        'dest': 'build/js'
    },

    'serverport': 3000,

    'styles': {
        'watch': 'app/styles/**/*.styl',
        'src': 'app/styles/main.styl',
        'dest': 'build/css'
    },

    'test': {
        'karma': 'test/karma.conf.js',
        'protractor': 'test/protractor.conf.js'
    },

    'views': {
        'watch': [
            'app/index.html',
            'app/modules/**/*.html'
        ]
    }

};
