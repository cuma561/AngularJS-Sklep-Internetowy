'use strict';

var controllersNavigation = angular.module( 'controllersNavigation' , [] );


controllersNavigation.controller( 'navigation' , [ '$scope' , '$location' , 'cartSrv' , 'checkToken' , 'store' , function( $scope , $location , cartSrv , checkToken , store ){

	$scope.navigation = function () {

		if ( /^\/admin/.test( $location.path() ) )
		{

			if ( !checkToken.isAdmin() )
			{	
				window.location.href = '#/home?alert=noAdmin';
			}

			return 'page/admin/navigation.html';

		}
		else
		{
			if ( $location.search().alert == 'noAdmin' )
				$scope.noAdmin = true;
			else
				$scope.noAdmin = false;


			if ( checkToken.loggedIn() )
				$scope.loggedIn = true;
			else
				$scope.loggedIn = false;


			if ( checkToken.isAdmin() )
				$scope.isAdmin = true;
			else
				$scope.isAdmin = false;

			return 'page/site/navigation.html';
		}


	};


	$scope.isActive = function ( path ) {
		return $location.path() === path;
	};

	$scope.$watch(function(){
		$scope.cart = cartSrv.show().length;
	});

	$scope.logout = function () {
		checkToken.del();
		location.reload();
	};



}]);


