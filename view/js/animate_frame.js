var proof = {
    statement:"To construct an equilateral triangle.",
    postamble:"A triangle with three equal sides is equilateral. [1d20]",
    steps: [
	{
	    reveal:["A","B","AB"],
	    text:"Let the given line be AB."
	},
	{
	    text:"With center A and radius AB, draw circle BCD. [p3]",
	    reveal:["C", "D", "BCD"]
	},

	{
	    text:"With center B and radius BA, draw circle ACE and call one of the points where they intersect C [p3]",
	    reveal:["E", "ACE"]
	},
	{
	    text:"Join C and A. [p1]",
	    reveal:["CA"]
	},
	{
	    text:"Join C and B. [p1]",
	    reveal:["CB"]
	},
	{
	    text:"Because AC and AB are radii of the same circle, BCD, they must be equal. [1d15]",
	    highlight:["CA","AB"]
	},
	{
	    text:"Because BA and BC are radii of the same circle, ACE, they must be equal. [1d15]",
	    highlight:["AB", "CB"]
	},
	{
	    text:"Things which are equal to the same thing are also equal to each other [a3], so all three lines AB, AC, CB are equal.",
	    highlight:["AB","CB","CA"]
	}
    ],

    elements: [
	{
	    name:"A",
	    type:"point",
	    parents:[3.5,5]
	},
	{
	    name:"B",
	    type:"point",
	    parents:[6.5,5]
	},
	{
	    name:"AB",
	    type:"segment",
	    parents:["A","B"]
	},
	{
	    name:"BCD",
	    type:"circle",
	    parents:["A","B"]
	},
	{
	    name:"ACE",
	    type:"circle",
	    parents:["B","A"]
	},
	{
	    name:"C",
	    type:"intersection",
	    parents:["BCD","ACE"]
	},
	{
	    name:"D",
	    type:"glider",
	    parents:["BCD"]
	},
	{
	    name:"E",
	    type:"glider",
	    parents:["ACE"]
	},
	{
	    name:"CA",
	    type:"segment",
	    parents:["A","C"]
	},
	{
	    name:"CB",
	    type:"segment",
	    parents:["B","C"]
	}
    ]
}
var board = JXG.JSXGraph.initBoard('the-box', {boundingbox: [0, 10, 10, 0], axis:false, showCopyright:false, showNavigation:false});
elementsObject = {};

proof.elements.forEach(function(x){
    elementsObject[x.name] = board.create(x.type, x.parents, {name:x.name, label:{fontSize:30}});
    elementsObject[x.name].setAttribute({visible:false})
})

redrawGraph(0);

function animate_frame(step){ 
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
	redrawGraph(step);
    },2300)
}

for(let i = 1; i < proof.steps.length; i++){
    window.setTimeout(function(){animate_frame(i)}, 3000*i);
}

function redrawGraph(step){
    Object.keys(elementsObject).forEach(function(x){
	elementsObject[x].setAttribute({fillOpacity:0.4, strokeOpacity:0.4});
    });
    var r;
    if(r = proof.steps[step].reveal){
	r.forEach(function(x){
	    elementsObject[x].setAttribute({visible:true, strokeOpacity:1, fillOpacity:1});
	});
    }
    if(r = proof.steps[step].highlight){
	r.forEach(function(x){
	    elementsObject[x].setAttribute({strokeOpacity:1, fillOpacity:1});
	});
    }
}
