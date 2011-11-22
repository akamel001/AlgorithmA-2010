/***********
*	Name: 		Justin Catrambone and David Sturgeon
*	File: 		mainseq.js
*	Project:	{AlgorithmA}; 2010
*	Date Created:	February 17, 2010
*	Purpose:
*		The purpose of this file is to supply JavaScript *	*		code to the seq.htm file.
*	Dependencies:
*		None
*	Notes:
*	Functions:
*		step() : steps animation forward once
*		back() : backs the step in animation back once
*		reset() : resets the animation
*		changeImageToBlack(i) : changes i to black
*		changeImageToRed(i) : changes i to red
*		changeImageToGreen(i) : changes i to green
*		setTarget() : specifies tart to search for 
*		playAnimation() : starts the animation
************/

var MyImages = new Array();
var timer = 1000;	 
var counter = 0;
var nextCounter = 0;
var target = 6;
var interval;
var inti =0;

function Initialize()
{
	//create array of images
	for (var n = 0; n < 7; n++){
		MyImages.push(document.getElementById(n));
	}
	
	document.getElementById("concept").onmouseover = function () {
		Tip("Sequential search, also called linear search, is a method for finding a particular value in a list that consists in checking every one of its elements, one at a time and in sequence, until the desired one is found. Sequential search is the simplest search algorithm; it is a special case of brute-force search. Its worst case cost is proportional to the number of elements in the list; and so is its expected cost, if all list elements are equally likely to be searched for. Therefore, if the list has more than a few elements, other methods (such as binary search or hashing) may be much more efficient.",WIDTH, 500, FONTFACE, 'Verdana, sans-serif', FONTSIZE, '12pt',FONTCOLOR, '#000000',PADDING, 8, SHADOW, true, SHADOWCOLOR, '#CCCCCC', FADEIN, 400, FADEOUT, 800,CENTERMOUSE, true, OFFSETX, 0 ,BGCOLOR, '#FFFFCC');
	}
	document.getElementById("howto").onmouseover = function() {
		Tip("<strong>Set Target Node</strong> - Will allow user to enter and set a value to be searched for.<br /><br /><strong>Start</strong> - Will perform the search either with or without a target value set.<br /><br /><strong>Forward</strong> - Will allow user to step through the animation one step at a time.<br /><br /><strong>Back</strong> - Will allow user to step backward through animation one step at a time.<br /><br /><strong>Reset</strong> - Reset to the initial layout when first loaded.",WIDTH, 400, FONTFACE, 'Verdana, sans-serif', FONTSIZE, '12pt',FONTCOLOR, '#000000',PADDING, 8, SHADOW, true, SHADOWCOLOR, '#CCCCCC', FADEIN, 400, FADEOUT, 800,CENTERMOUSE, true, OFFSETX, 0 ,BGCOLOR, '#CEFFFF');
	}
}

function step() {
	//if not target value change node to red
	if(nextCounter < target)
	{
		changeImageToRed(nextCounter);
		nextCounter++;
	}
	//if target value change node to green
	else if(nextCounter == target)
	{
		changeImageToGreen(nextCounter);
		nextCounter++;
	}
}
function back() {
	//change node back to black
	if(nextCounter > 0)
	{
		nextCounter--;
		changeImageToBlack(nextCounter);
	}
	document.getElementById("decr").style.backgroundColor = "yellow";
	setTimeout(function(){
	document.getElementById("decr").style.backgroundColor = "white";
	}, 950);
}
function reset() {
	nextCounter = 0;
	while (nextCounter < 7)
	{
		changeImageToBlack(nextCounter);
		nextCounter++;
	}
	nextCounter = 0;
	target = 6;
	clearInterval(interval);
	document.getElementById("compare").style.backgroundColor = "white";
	document.getElementById("incr").style.backgroundColor = "white";
	document.getElementById("found").style.backgroundColor = "white";
	document.getElementById("notfound").style.backgroundColor = "white";
}

function changeImageToRed(i){
	//color change for red dot and pseudo code highlighting
	MyImages[i].src = "/algo/images/algorithm/sequential/redcircle.gif";
	document.getElementById("compare").style.backgroundColor = "yellow";
	setTimeout(function(){
	document.getElementById("compare").style.backgroundColor = "white";
	}, 950);
	setTimeout(function(){
	document.getElementById("incr").style.backgroundColor = "yellow";
	}, 500);
	setTimeout(function(){	
	document.getElementById("incr").style.backgroundColor = "white";
	}, 1000);
	inti++;
	if(inti == 7)
	{
		setTimeout(function(){	
		document.getElementById("notfound").style.backgroundColor = "yellow";
		}, 1000);
		
	}
	
	
}

function changeImageToBlack(i){
	//color change for black dot and pseudo code highlighting
	MyImages[i].src = "/algo/images/algorithm/sequential/circle.gif";
}

function changeImageToGreen(i){
	//color change for green dot and pseudo code highlighting
	MyImages[i].src = "/algo/images/algorithm/sequential/greencircle.gif";
	document.getElementById("found").style.backgroundColor = "yellow";
}

function setTarget()
{
	//set target value
	var value = document.getElementsByName("input1")[0].value;
	target = value;
}

function playAnimation() {
	counter = 0;
	//play through animation without stepping
	interval = setInterval(function(){
	  if(counter == target){
	    changeImageToGreen(counter);
	    clearInterval(interval);
	    }
	  else{
	    changeImageToRed(counter);
	    counter++;
	    }
	}, 1000);

}
