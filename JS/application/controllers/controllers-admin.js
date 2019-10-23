'use strict';

var controllersAdmin = angular.module( 'controllersAdmin' , [ 'angularFileUpload' , 'myDirectives' ] );


controllersAdmin.controller( 'products' , [ '$scope' , '$http' , 'checkToken' , function( $scope , $http , checkToken ){
	
	$http.post( 'php/admin/products/get' , {
		token: checkToken.raw()
	}).success( function( data ){
		$scope.products = data;
	}).error( function(){
		console.log( 'Błąd połączenia z baza danych' );
	});

	$scope.delete = function ( product , $index ) {

		if ( !confirm( 'Czy na pewno chcesz usunąć ten produkt?' ) )
			return false;

		$scope.products.splice( $index , 1 );

		$http.post( 'php/admin/products/delete/' , {
			token: checkToken.raw(),
			product : product
		}).error( function(){
			console.log( 'Błąd połączenia z baza danych' );
		});

	};

}]);


controllersAdmin.controller( 'productEdit' , [ '$scope' , '$http' , '$routeParams' , 'FileUploader' , '$timeout' , 'checkToken' , function( $scope , $http , $routeParams , FileUploader , $timeout , checkToken ){

	var productId = $routeParams.id;
	$scope.id = productId;

	$http.post( 'php/admin/products/get/' + productId , {
		token: checkToken.raw()
	}).success( function( data ){
		$scope.product = data;
	}).error( function(){
		console.log( 'Błąd połączenia z baza danych' );
	});

	$scope.saveChanges = function ( product ) {

		$http.post( 'php/admin/products/update/' , {
			token: checkToken.raw(),
			product : product
		}).success( function(){
			$scope.success = true;

			$timeout(function(){
				$scope.success = false;
			} , 3000 );

		}).error( function(){
			console.log( 'Błąd połączenia z baza danych' );
		});

	};


	function getImages() {
		$http.post( 'php/admin/images/get/' + productId , {
			token: checkToken.raw()
		}).success( function( data ){
			$scope.images = data; 
		}).error( function(){
			console.log( 'Błąd połączenia z baza danych' );
		});
	}
	getImages();

    var uploader = $scope.uploader = new FileUploader({
        url : 'php/admin/images/upload/' + productId
    });

    uploader.filters.push({
        name: 'imageFilter',
        fn: function(item /*{File|FileLikeObject}*/, options) {
            var type = '|' + item.type.slice(item.type.lastIndexOf('/') + 1) + '|';
            return '|jpg|png|jpeg|bmp|gif|'.indexOf(type) !== -1;
        }
    });

    uploader.onCompleteItem = function(fileItem, response, status, headers) {
        getImages();
    };

    $scope.delImage = function ( imageName , $index ) {

    	$scope.images.splice( $index , 1 );

		$http.post( 'php/admin/images/delete/' , {

			token: checkToken.raw(),
			id : productId,
			image : imageName

		}).error( function(){
			console.log( 'Błąd połączenia z baza danych' );
		});

    };

    $scope.setThumb = function ( product , image ) {

		$http.post( 'php/admin/images/setThumb/' , {

			token: checkToken.raw(),
			product : product,
			image : image

		}).error( function(){
			console.log( 'Błąd połączenia z baza danych' );
		});

    };


}]);


controllersAdmin.controller( 'productCreate' , [ '$scope' , '$http' , '$timeout' , 'checkToken' , function( $scope , $http , $timeout , checkToken ){

	$scope.createProduct = function ( product ) {

		$http.post( 'php/admin/products/create/' , {
			token: checkToken.raw(),
			product : product
		}).success( function(){
			$scope.success = true;

			$timeout(function(){
				$scope.success = false;
				$scope.product = {};
			} , 3000 );

		}).error( function(){
			console.log( 'Błąd połączenia z baza danych' );
		});

	};

}]);


controllersAdmin.controller( 'users' , [ '$scope' , '$http' , 'checkToken' , function( $scope , $http , checkToken ){

	$http.post( 'php/admin/users/get' , {
		token: checkToken.raw()
	}).success( function( data ){
		$scope.users = data;
		console.log($scope.users);
	}).error( function(){
		console.log( 'Błąd połączenia z baza danych' );
	});

	$scope.delete = function ( user , $index ) {

		if ( !confirm( 'Czy na pewno chcesz usunąć tego użytkownika?' ) )
			return false;

		$scope.users.splice( $index , 1 );

		$http.post( 'php/admin/users/delete/' , {
			token: checkToken.raw(),
			user : user
		}).error( function(){
			console.log( 'Błąd połączenia z baza danych' );
		});

	};


}]);


controllersAdmin.controller( 'userEdit' , [ '$scope' , '$http' , '$routeParams' , '$timeout' , 'checkToken' , function( $scope , $http , $routeParams , $timeout , checkToken ){

	var userId = $routeParams.id;
	$scope.id = userId;

	$http.post( 'php/admin/users/get/' + userId , {
		token: checkToken.raw()
	}).success( function( data ){
		$scope.user = data;
	}).error( function(){
		console.log( 'Błąd połączenia z baza danych' );
	});

	$scope.saveChanges = function ( user ) {

		$http.post( 'php/admin/users/update/' , {
			token: checkToken.raw(),
			user : user,
			id : userId,
			name : user.name,
			email : user.email,
			password : user.password,
			passconf : user.passconf,
			role: user.role
		}).success( function( errors ){

			$scope.submit = true;
			
			if ( errors )
			{
				$scope.errors = errors;
			}
			else
			{
				$scope.success = true;
				$timeout(function(){
					$scope.success = false;
					$scope.user = {};
				} , 3000 );
			}

		}).error( function(){
			console.log( 'Błąd połączenia z baza danych' );
		});

	};


}]);


controllersAdmin.controller( 'userCreate' , [ '$scope' , '$http' , '$timeout' , 'checkToken' , function( $scope , $http , $timeout , checkToken ){

	$scope.user = {};
	$scope.user.role = 'user';

	$scope.createUser = function ( user ) {

		$http.post( 'php/admin/users/create/' , {
			token: checkToken.raw(),
			user : user,
			name : user.name,
			email : user.email,
			password : user.password,
			passconf : user.passconf,
			role: user.role
		}).success( function( errors ){

			$scope.submit = true;
			
			if ( errors )
			{
				$scope.errors = errors;
			}
			else
			{
				$scope.success = true;
				$timeout(function(){
					$scope.success = false;
					$scope.user = {};
				} , 3000 );
			}
			
		}).error( function(){
			console.log( 'Błąd połączenia z baza danych' );
		});

	};

}]);


controllersAdmin.controller( 'orders' , [ '$scope' , '$http' , 'checkToken' , function( $scope , $http , checkToken ){

	$http.post( 'php/admin/orders/get/' , {

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

	$scope.delete = function ( order , $index ) {

		if ( !confirm( 'Czy na pewno chcesz usunąć to zdjęcie' ) )
			return false;

		$scope.orders.splice( $index , 1 );

		$http.post( 'php/admin/orders/delete/' , {
			token: checkToken.raw(),
			id: order.id
		}).error( function(){
			console.log( 'Błąd połączenia z baza danych' );
		});

	};

	$scope.changeStatus = function ( order ) {

		if ( order.status == 0 )
			order.status = 1;
		else
			order.status = 0;

		$http.post( 'php/admin/orders/update/' , {
			token: checkToken.raw(),
			id: order.id,
			status : order.status
		}).error( function(){
			console.log( 'Błąd połączenia z baza danych' );
		});

	};

}]);