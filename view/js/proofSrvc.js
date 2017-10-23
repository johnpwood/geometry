angular.module('proof').service('proofService', function($http){
    self = this;
    this.getProof = function(book, prop){
	return $http.get(`/api/proof/${book}/${prop}`).then(function(response) {
	    self.proof = response.data;
	})
    }
});
