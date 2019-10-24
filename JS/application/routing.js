/* Routing dynamiczny */
app.config( [ '$routeProvider' , '$httpProvider' , function( $routeProvider , $httpProvider ) {


	//=================== 	Site Home   ===================

	$routeProvider.when( '/home',{
		templateUrl: 'page/home.html'
	})

	//================== 	Template    ====================

	$routeProvider.when('/template',{
		templateUrl: 'page/site/template.html'
	})

	// ================== Site Products ====================

	$routeProvider.when( '/products' , {
		controller : 'siteProducts',
		templateUrl : 'page/site/products.html'
	});

	$routeProvider.when( '/product/:id' , {
		controller: 'siteProduct',
		templateUrl : 'page/site/product.html'
	});

	$routeProvider.when( '/cart' , {
		controller : 'cartCtrl',
		templateUrl : 'page/site/cart.html'
	});

	$routeProvider.when( '/orders' , {
		controller : 'siteOrders',
		templateUrl : 'page/site/orders.html'
	});

	// ================ Login & Register ==================

	$routeProvider.when( '/login' , {
		controller : 'login',
		templateUrl : 'page/site/login.html'
	});

	$routeProvider.when( '/register' , {
		controller : 'register',
		templateUrl : 'page/site/register.html'
	});

	//=================== 	Admin Home   ===================

	$routeProvider.when('/admin/homeAdmin',{
		templateUrl: 'page/admin/homeAdmin.html'
	});

	//================== 	Template    ====================

	$routeProvider.when('/admin/templateAdmin',{
		templateUrl: 'page/admin/templateAdmin.html'
	});

	// ================== Admin Products ====================

	$routeProvider.when( '/admin/products' , {
		controller : 'products',
		templateUrl : 'page/admin/products.html'
	});

	$routeProvider.when( '/admin/product/edit/:id' , {
		controller: 'productEdit',
		templateUrl : 'page/admin/product-edit.html'
	});

	$routeProvider.when( '/admin/product/create' , {
		controller: 'productCreate',
		templateUrl : 'page/admin/product-create.html'
	});

	// ================== Admin Users ====================

	$routeProvider.when( '/admin/users' , {
		controller: 'users',
		templateUrl : 'page/admin/users.html'
	});

	$routeProvider.when( '/admin/user/edit/:id' , {
		controller: 'userEdit',
		templateUrl : 'page/admin/user-edit.html'
	});

	$routeProvider.when( '/admin/user/create' , {
		controller: 'userCreate',
		templateUrl : 'page/admin/user-create.html'
	});

	// ================== Admin Orders ====================

	$routeProvider.when( '/admin/orders' , {
		controller: 'orders',
		templateUrl : 'page/admin/orders.html'
	});

	// ================== Default ====================

	$routeProvider.otherwise({
		redirectTo: '/home'
	});

}]);
