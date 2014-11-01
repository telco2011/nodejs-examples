var angularTodo = angular.module('angularTodo', [])
    .controller('mainController', ['$scope', '$http', function($scope, $http) {
        $scope.formData = {};

        // Cuando se cargue la página, pide del API todos los TODOs
        $http.get('/api/todos')
            .success(function(data) {

                $scope.todos = data;
                console.log('SUCCESS GET: ' + data)
            })
            .error(function(data) {
                console.error('ERROR: ' + data);
            });

        // Cuando se añade un nuevo TODO, manda el texto a la API
        $scope.createTodo = function(){
            $http.post('/api/todos', $scope.formData)
                .success(function(data) {
                    $scope.formData = {};
                    if (data.indexOf('ERROR') <= 0) {
                        $scope.todos = data;
                        console.log('SUCCESS CREATE: ' + data);
                    } else {
                        console.error(data);    
                    }
                })
                .error(function(data) {
                    console.error('ERROR: ' + data);
                });
        };

        // Borra un TODO despues de checkearlo como acabado
        $scope.deleteTodo = function(id) {
            $http.delete('/api/todos/' + id)
                .success(function(data) {
                    $scope.todos = data;
                    console.log('SUCCESS DELETE: ' + data);
                })
                .error(function(data) {
                    console.error('ERROR: ' + data);
                });
        };
    }]);