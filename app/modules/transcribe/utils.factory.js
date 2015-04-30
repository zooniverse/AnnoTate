'use strict';

require('./transcribe.module.js')
    .factory('transcribeUtils', transcribeUtils);

/**
 * @ngInject
 */
function transcribeUtils() {

    var factory = {
        arrayToMatrix: arrayToMatrix,
        matrixToArray: matrixToArray
    };

    return factory;

    // Converts an array to a matrix value for use in the transform attribute
    function arrayToMatrix(array) {
        return 'matrix(' + array.join(',') + ')';
    }

    // Converts a transform attribute matrix to an array
    function matrixToArray(matrix) {
        var array = matrix.substr(7, matrix.length - 1).split(',');
        array = array.map(function (value) {
            return parseFloat(value);
        });
        return array;
    }

}
