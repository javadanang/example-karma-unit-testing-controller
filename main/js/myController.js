var app = angular.module('myApp', []);

app.controller('myController', ['$scope', 'backendService', 
        function($ctrlScope, $backend) {
    $ctrlScope.counter = 0;
    
    $ctrlScope.incrementCounter = function() {
        $ctrlScope.counter += $backend.step();
    }
    
    $ctrlScope.resetCounter = function() {
        $ctrlScope.counter = $backend.init();
    }
}]);
/*
angular.module('myApp').factory('backendService', function () {
    return {
        init: function() {
            return 1;
        },
        step: function() {
            return 5;
        },
        echo: function(msg) {
            return 'echo[' + msg + ']';
        }
    };
});
*/
