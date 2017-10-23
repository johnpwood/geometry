angular.module('proof', ['ui.router'])
    .config(function( $stateProvider, $urlRouterProvider ) {
	$stateProvider
	    .state('home', {
		url: '/',
		templateUrl:'../home.html',
		controller:'homeCtrl'
	    })
	    .state({
	    	name:'proof',
	    	url:'/proof/:book/:prop',
	    	templateUrl:'../proof.html',
	    	controller:'proofCtrl'
	    })
	    .state({
	    	name:'quiz',
	    	url:'/quiz',
	    	templateUrl:'../quiz.html',
	    	controller:'quizCtrl'
	    })
	$urlRouterProvider.otherwise('/')
    })

    .directive('geoMenu', () => {
    return {
	templateUrl: "../geo-menu.html",
	restrict: 'E',
	
    };
})
    
