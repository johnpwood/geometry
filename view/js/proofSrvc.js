angular.module('proof').service('proofSrvc', function($http){
    self = this;
    this.getProof = function(){
	return $http.get('/api/proof').then(function(response){
	    self.proof = response.data;
	});
    }
});
