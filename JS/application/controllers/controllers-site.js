'use strict';

var controllersSite = angular.module( 'controllersSite' , [] );

/* Kontroller produktów */
controllersSite.controller( 'siteProducts' , [ '$scope' , '$http' , 'cartSrv' , function( $scope , $http , cartSrv ){
	// Pobieranie z bazy danych produktów
	$http.get( 'php/site/products/get' ).
	success( function( data ){
		$scope.products = data;
	}).error( function(){
		console.log( 'Błąd połączenia z baza danych' );
	});
	// Dodawanie produktu do koszyka
	$scope.addToCart = function ( product ) {
		cartSrv.add( product );
	};
	// Zliczanie ile w koszyku jest produktu
	$scope.checkCart = function ( product ) {
		if ( cartSrv.show().length )
		{
			angular.forEach( cartSrv.show() , function( item ){
				if ( item.id == product.id )
				{
					product.qty = item.qty;
				}
			});
		}
	}

}]);

// Kotnroller pojedynczego produktu
controllersSite.controller( 'siteProduct' , [ '$scope' , '$http' , '$routeParams' , 'cartSrv' , function( $scope , $http , $routeParams , cartSrv ){
	//Zmienna przechowujaca id produktu
	var id = $routeParams.id;
	// Pobieranie z bazy danych produktu
	$http.post( 'php/site/products/get/' + id ).
	success( function( data ){
		$scope.product = data;
	}).error( function(){
		console.log( 'Błąd połączenia z baza danych' );
	});
	// Dodawanie produktu do koszyka
	$scope.addToCart = function ( product ) {
		cartSrv.add( product );
	};
	// Zliczanie ile w koszyku jest produktu
	$scope.checkCart = function ( product ) {
		if ( cartSrv.show().length )
		{
			angular.forEach( cartSrv.show() , function( item ){
				if ( item.id == product.id )
				{
					product.qty = item.qty;
				}
			});
		}
	}

	// Fukcja pobierająca zdjęcia z bazy danych 
	function getImages() {
		$http.get( 'php/site/products/getImages/' + id ).
		success( function( data ){
			$scope.images = data; 
		}).error( function(){
			console.log( 'Błąd połączenia z baza danych' );
		});
	}
	getImages();

}]);

// Kontroller zamówień
controllersSite.controller( 'siteOrders' , [ '$scope' , '$http' , 'checkToken' , function( $scope , $http , checkToken ){
	// Pobieranie zamówień z bazy danych
	$http.post( 'php/site/orders/get/' , {

		token: checkToken.raw(),
		payload: checkToken.payload()

	}).success( function( data ){

		$scope.orders = data;

		angular.forEach( $scope.orders , function( order , key ){
			var parsed = JSON.parse( order.items );
			$scope.orders[key].items = parsed;
		});

	}).error( function(){
		console.log( 'Błąd połączenia z baza danych' );
	});

}]);

// Kontroller koszyka
controllersSite.controller( 'cartCtrl' , [ '$scope' , '$http' , '$filter' , 'cartSrv' , 'checkToken' , function( $scope , $http , $filter , cartSrv , checkToken ){

	$scope.cart = cartSrv.show();

	$scope.emptyCart = function () {
		cartSrv.empty();
	};

	$scope.total = function () {
		var total = 0;
		angular.forEach( $scope.cart , function ( item ) {
			total += item.qty * item.price;
		});
		total = $filter( 'number' )( total , 2 );
		return total;
	};

	$scope.removeItem = function ( $index ) {
		$scope.cart.splice( $index , 1 );
		cartSrv.update( $scope.cart );
	};

	$scope.setOrder = function ( $event ) {

		$event.preventDefault();
	
		if ( !checkToken.loggedIn() )
		{
			$scope.alert = { type : 'warning' , msg : 'Musisz być zalogowany, żeby złożyć zamówienie.' };
			return false;
		}


		$http.post( 'php/site/orders/create/' , {

			token: checkToken.raw(),
			payload: checkToken.payload(),
			items: $scope.cart,
			total: $scope.total()

		}).success( function( data ){

			cartSrv.empty();
			$scope.alert = { type : 'success' , msg : 'Zamówienie złożone. Aby wrócić do strony głównej kliknij w ten link ' };


		}).error( function(){
			console.log( 'Błąd połączenia z baza danych' );
		});

	};

	$scope.$watch( function (){
		cartSrv.update( $scope.cart );
	});

}]);

//kontroller logowania
controllersSite.controller( 'login' , [ '$scope' , '$http' , 'store' , 'checkToken' , '$location' , function( $scope , $http , store , checkToken , $location ){

	if ( checkToken.loggedIn() )
		$location.path( '/home' );

	$scope.user = {};

	$scope.formSubmit = function ( user ) {

		$http.post( 'php/site/user/login/' , {
			email : user.email,
			password : user.password
		}).success( function( data ){

			$scope.submit = true;
			$scope.error = data.error;
			
			if ( !data.error )
			{
				store.set( 'token' , data.token );
				location.reload();
			}
			
		}).error( function(){
			console.log( 'Błąd połączenia z baza danych' );
		});

	};

}]);

//kontroller rejestracji
controllersSite.controller( 'register' , [ '$scope' , '$http' , function( $scope , $http ){

	$scope.user = {};

	$scope.formSubmit = function ( user ) {

		$http.post( 'php/site/user/create/' , {
			user : user,
			name : user.name,
			email : user.email,
			password : user.password,
			passconf : user.passconf
		}).success( function( errors ){

			$scope.submit = true;
			$scope.user = {};
			
			if ( errors )
			{
				$scope.errors = errors;
			}
			else
			{
				$scope.errors = {};
				$scope.success = true;
			}
			
		}).error( function(){
			console.log( 'Błąd połączenia z baza danych' );
		});


	};

}]);
