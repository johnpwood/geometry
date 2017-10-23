(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
module.exports = {"statement":"To construct an equilateral triangle\n","conclusion":"A triangle that has all its sides equal is equilateral, [1d15] so ABC is equilateral.\n","steps":[{"text":"Let the given line be AB.","reveal":["A","B","AB"]},{"text":"With center A and radius AB, draw circle BCD. [p3]","reveal":["C","D","BCD"]},{"text":"With center B and radius BA, draw circle ACE and call one of the points where they intersect C [p3]","reveal":["E","ACE"]},{"text":"Join C and A. [p1]","reveal":["CA"]},{"text":"Join C and B. [p1]","reveal":["CB"]},{"text":"Because AC and AB are radii of the same circle, BCD, they must be equal. [1d15]","reveal":["AB","CB"]},{"text":"Things which are equal to the same thing are also equal to each other [a3], so all three lines AB, AC, CB, are equal.","reveal":["AB","CB","CA"]}],"elements":[{"name":"A","type":"point","parents":["3.5","5"]},{"name":"B","type":"point","parents":["6.5","5"]},{"name":"AB","type":"segment","parents":["A","B"]},{"name":"BCD","type":"circle","parents":["A","B"]},{"name":"ACE","type":"circle","parents":["B","A"]},{"name":"C","type":"intersection","parents":["BCD","ACE"]},{"name":"D","type":"glider","parents":["BCD"]},{"name":"E","type":"glider","parents":["ACE"]},{"name":"CA","type":"segment","parents":["A","C"]},{"name":"CB","type":"segment","parents":["B","C"]}]}

},{}],2:[function(require,module,exports){


var proof = require("../../proofs/1/1.js");

var elementsObject = {};
var board = JXG.JSXGraph.initBoard('the-box', {
    boundingbox: [0, 10, 10, 0],
    keepaspectratio: true,
    axis: false,
    showCopyright: false,
    showNavigation: false});


proof.elements.forEach(function(x){
    elementsObject[x.name] = board.create(x.type, x.parents, {name:x.name, label:{fontSize:30}});
    elementsObject[x.name].setAttribute({fillOpacity:0, strokeOpacity:0, visible:false})
})

redrawGraph(0);
for(let i = 0; i < proof.steps.length; i++){
    window.setTimeout(function(){animateFrame(proof, i)}, 3000*i);
}

function animateFrame(proof, step){
    console.log(step);
    window.setTimeout(function(){
	for(let i=-1; i>-500; i--){
	    window.setTimeout(function(){         
		document.getElementById('the-box').style.top = 4*i + "px";
	    }, -1*i)
	}}, 2000)
    window.setTimeout(function(){
	for(let i=0; i<500; i++){
	    window.setTimeout(function(){
		document.getElementById('the-box').style.top = (2000-4*i) + "px";
	    }, i)
	}
	redrawGraph(proof, step);
    },2300)
}


function redrawGraph(proof, step){
    Object.keys(elementsObject).forEach( x => {
	elementsObject[x].setAttribute({fillOpacity:0, strokeOpacity:0, visible:false})
    })
    for(let i = 0;i <= step; i++){
	Object.keys(elementsObject).forEach(function(x){
	    elementsObject[x].setAttribute({fillOpacity:0.3, strokeOpacity:0.3});
	});
	var r;
	if(r = proof.steps[i].reveal){
	    r.forEach(function(x){
		elementsObject[x].setAttribute({strokeOpacity:1, fillOpacity:1, visible:true});
	    });
	}
    }

}



},{"../../proofs/1/1.js":1}]},{},[2]);
