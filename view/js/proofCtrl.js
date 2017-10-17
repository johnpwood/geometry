angular.module('proof').controller('proofCtrl', function($scope, proofSrvc){
    $scope.getProof = function(){
	proofSrvc.getProof().then(function(){
	    $scope.proof = proofSrvc.proof;
	    console.log(proofSrvc.proof);
	    
	    var board = JXG.JSXGraph.initBoard('the-box',
					       {boundingbox: [0, 10, 10, 0],
						axis:false, showCopyright:false,
						showNavigation:false});
	    elementsObject = {};

	    $scope.proof.elements.forEach(function(x){
		elementsObject[x.name] = board.create(x.type, x.parents, {name:x.name, label:{fontSize:30}});
		elementsObject[x.name].setAttribute(x.props);
		elementsObject[x.name].setAttribute({visible:false});
	    })

	    var redrawGraph = function(step){
		Object.keys(elementsObject).forEach(function(x){
		    elementsObject[x].setAttribute({fillOpacity:0.25, strokeOpacity:0.25});
		});
		var r;
		if(r = $scope.proof.steps[step].reveal){
		    r.forEach(function(x){
			elementsObject[x].setAttribute({visible:true, strokeOpacity:1, fillOpacity:1});
		    });
		}
	    }
	    
	    redrawGraph(0);

	    $scope.animate_frame = function(step){ 
		window.setTimeout(function(){
		    for(let i=0; i>-50; i--){
			window.setTimeout(function(){         
			    document.getElementById('the-box').style.top = 40*i + "px";
			}, -10*i)
		    }}, 2000)
		window.setTimeout(function(){
		    for(let i=0; i<=50; i++){
			window.setTimeout(function(){
			    document.getElementById('the-box').style.top = (2000-40*i) + "px";
			}, 10*i)
		    }
		    redrawGraph(step);
		},2300)
	    }

	    for(let i = 1; i < $scope.proof.steps.length; i++){
		window.setTimeout(function(){$scope.animate_frame(i)}, 3000*i);
	    }
	});
    };
    $scope.getProof();
});
