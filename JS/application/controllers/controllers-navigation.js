'use strict';

var controllersNavigation = angular.module( 'controllersNavigation' , [] );

//Kontroller nawigacji
controllersNavigation.controller( 'navigation' , [ '$scope' , '$location' , 'cartSrv' , 'checkToken' , 'store' , function( $scope , $location , cartSrv , checkToken , store ){
	// Sprawdznie czy jestes administratorem czy zwyklym userem jezeli jestes admin to po przejscu na panel admina pojawia sie 
	// nawigacja z admina a jezeli nie to pojawia sie nawigacja z usera
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

	// Dodawanie klasy active do pojedynczego elementu nawigacji
	$scope.isActive = function ( path ) {
		return $location.path() === path;
	};
	// Wyświetlanie koszyka
	$scope.$watch(function(){
		$scope.cart = cartSrv.show().length;
	});
	// Funkcja wylogowywania ze sklepu
	$scope.logout = function () {
		checkToken.del();
		location.reload();
	};



}]);


