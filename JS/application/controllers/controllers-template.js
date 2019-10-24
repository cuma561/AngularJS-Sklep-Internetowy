/* Kontroller pobierania  i przechowywania w localStorage szablonów CSS */
var controllersTemplate = angular.module("controllersTemplate",[]);

controllersTemplate.controller('templateCtrl',['$scope','store' ,function($scope,store){

	$scope.template = store.get( 'template' );

	$scope.selectTemplate = function( name )
	{
		store.set( 'template' , name );
	}
}]);
