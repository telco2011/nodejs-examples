var app = angular.module('GridApplication', ['ngGrid']);
app.controller('GridController', ['$http','$scope','$log',function($http,$scope,$log) {
	
	$http.get('/users.json').success(function(data){
		$log.log(data);
		$scope.myData = data;
	}).error(function(error){
		$log.error(error);
	});
    
	$scope.itemSelected = [];

    $scope.gridOptions = { 
        data: 'myData',
        enableCellSelection: true,
        enableRowSelection: true,
        enableCellEdit: true,
        showFooter: true,
        multiSelect: false,
        selectedItems: $scope.itemSelected,
        columnDefs: [{field: 'name', displayName: 'Name', enableCellEdit: true}, 
                     {field:'age', displayName:'Age', enableCellEdit: true}]
    };
}]);