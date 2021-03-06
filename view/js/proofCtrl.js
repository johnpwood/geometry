angular.module('proof').controller('proofCtrl', function($scope, $stateParams, proofService){
    $scope.currentStep = 0;
    proofService.getProof($stateParams.book, $stateParams.prop).then(function(){
	$scope.proof = proofService.proof;

	$scope.proof.steps.forEach(function(x){
	    let y = /\[(\d+)\.(\w+)\]/;
	    x.link = y.exec(x.text)
	    x.text = x.text.replace(y,'');
	});
	
	var board = JXG.JSXGraph.initBoard('the-box', {
	    boundingbox: [0, 10, 10, 0],
	    keepaspectratio: true,
	    axis: false,
	    showCopyright: false,
	    showNavigation: false});

     	elementsObject = {};

     	$scope.proof.elements.forEach(function(x){
	    console.log(x.name);
     	    elementsObject[x.name] = board.create(x.type, x.parents, {name:x.name, label:{fontSize:30}});
     	    elementsObject[x.name].setAttribute(x.props);
     	    elementsObject[x.name].setAttribute({visible:false});
     	})

     	var redrawGraph = function(step){
	    Object.keys(elementsObject).forEach(function(x){
		elementsObject[x].setAttribute({visible:false});
	    });
	    for(let i = 0; i<=step; i++){
     		Object.keys(elementsObject).forEach(function(x){
     		    elementsObject[x].setAttribute({fillOpacity:0.25, strokeOpacity:0.25});
     		});
     		if($scope.proof.steps[i].reveal){
		    console.log("step: " + i + "\n")
     		    $scope.proof.steps[i].reveal.forEach(function(x){
			console.log("element: " + x + "\n");
     			elementsObject[x].setAttribute({visible:true, strokeOpacity:1, fillOpacity:1});
     		    });
		}
	    }
     	}
	
 	redrawGraph(0);
 	$scope.animate_frame = function(step){
	    console.log(step);
	    $scope.currentStep = step;
 	    window.setTimeout(function(){
 		for(let i=0; i>-50; i--){
 		    window.setTimeout(function(){         
 			document.getElementById('the-box').style.top = 40*i + "px";
 		    }, -10*i)
 		}}, 1000)
 	    window.setTimeout(function(){
 		for(let i=0; i<=50; i++){
 		    window.setTimeout(function(){
 			document.getElementById('the-box').style.top = (2000-40*i) + "px";
 		    }, 10*i)
 		}
 		redrawGraph(step);
 	    },1300)
 	}

 	//for(let i = 1; i < $scope.proof.steps.length; i++){
	  //  window.setTimeout(function(){$scope.animate_frame(i)}, 3000*i);}
    })

    $scope.advance = function(){
	if($scope.currentStep < $scope.proof.steps.length-1){
	    $scope.currentStep += 1;
	}
	$scope.animate_frame($scope.currentStep);
    };
    $scope.retreat = function(){
	if($scope.currentStep > 0){
	    $scope.currentStep -= 1;
	}
	$scope.animate_frame($scope.currentStep);
    };
});


