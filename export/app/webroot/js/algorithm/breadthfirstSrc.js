/***********
*	Name: 		Justin Catrambone and David Sturgeon
*	File: 		mainbf.js
*	Project:	{AlgorithmA}; 2010
*	Date Created:	February 15, 2010
*	Purpose:
*		The purpose of this file is to supply JavaScript *	*		code to the bf.htm file.
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

var MyImages = new Array;
var timer = 1000;	 
var counter = 0;
var nextCounter = 0;
var target = 14;
var interval;
var onlevel = true;

function Initialize()
{
	document.getElementById("concept").onmouseover = function () {
		Tip("Breadth First Search is a graph search algorithm that begins at the root node and explores all the neighboring nodes. Then, for each of those nearest nodes, it explores their unexplored neighbor nodes, and so on, until it finds the goal. This is typically implemented with a queue.",WIDTH, 500, FONTFACE, 'Verdana, sans-serif', FONTSIZE, '12pt',FONTCOLOR, '#000000',PADDING, 8, SHADOW, true, SHADOWCOLOR, '#CCCCCC', FADEIN, 400, FADEOUT, 800,CENTERMOUSE, true, OFFSETX, 0 ,BGCOLOR, '#FFFFCC');
	}
	document.getElementById("howto").onmouseover = function() {
		Tip("<strong>Target Node</strong> - User will enter a value to be searched for.<br /><br /><strong>Forward</strong> - Allows the user to step through the sort one step at a time. Walkthrough is enabled when this button is pressed.<br /><br /><strong>Back</strong> - Will allow user to step through animation backward one step at a time.<br /><br /><strong>Reset</strong> - Reset to the initial layout when first loaded.",WIDTH, 400, FONTFACE, 'Verdana, sans-serif', FONTSIZE, '12pt',FONTCOLOR, '#000000',PADDING, 8, SHADOW, true, SHADOWCOLOR, '#CCCCCC', FADEIN, 400, FADEOUT, 800,CENTERMOUSE, true, OFFSETX, 0 ,BGCOLOR, '#CEFFFF');
	}
	
	//create array for images
	for (var n = 0; n < 15; n++){
		MyImages.push(document.getElementById(n));
	}
}

function checkLevel()
{
	//if on level 0 show appropriate arrow
	if (counter == 0){
		document.getElementById("notfound").style.backgroundColor = "yellow";
		document.getElementById("searchlevel").style.backgroundColor = "yellow";
		document.getElementById("level0").style.visibility = "visible";
		document.getElementById("level1").style.visibility = "hidden";
		document.getElementById("level2").style.visibility = "hidden";
		document.getElementById("level3").style.visibility = "hidden";
	}
	//if on level 1 show appropriate arrow
	else if(counter > 0 && counter <= 2){
		if(onlevel == true)
		{
			document.getElementById("searchlevel").style.backgroundColor = "white";
			setTimeout(function(){	
			document.getElementById("searchlevel").style.backgroundColor = "yellow";
			}, 750);
			onlevel = false;
		}
		document.getElementById("level0").style.visibility = "hidden";
		document.getElementById("level1").style.visibility = "visible";
		document.getElementById("level2").style.visibility = "hidden";
		document.getElementById("level3").style.visibility = "hidden";
	}
	//if on level 2 show appropriate arrow
	else if(counter > 2 && counter <= 6){
		if(onlevel == false)
		{
			document.getElementById("searchlevel").style.backgroundColor = "white";
			setTimeout(function(){	
			document.getElementById("searchlevel").style.backgroundColor = "yellow";
			}, 750);
			onlevel = true;
		}
		document.getElementById("level0").style.visibility = "hidden";
		document.getElementById("level1").style.visibility = "hidden";
		document.getElementById("level2").style.visibility = "visible";
		document.getElementById("level3").style.visibility = "hidden";
	}
	//if on level 3 show appropriate arrow
	else{
		if(onlevel == true)
		{
			document.getElementById("searchlevel").style.backgroundColor = "white";
			setTimeout(function(){	
			document.getElementById("searchlevel").style.backgroundColor = "yellow";
			}, 750);
			onlevel = false;
		}
		document.getElementById("level0").style.visibility = "hidden";
		document.getElementById("level1").style.visibility = "hidden";
		document.getElementById("level2").style.visibility = "hidden";
		document.getElementById("level3").style.visibility = "visible";
	}
}

function step() {
	checkLevel();
	//step through animation
	if(nextCounter < target)
	{
		//if not target value, change color to green
		changeImageToRed(nextCounter);
		nextCounter++;
		counter++;
		document.getElementById("node++").style.backgroundColor = "yellow";
		setTimeout(function(){	
		document.getElementById("node++").style.backgroundColor = "white";
		}, 750);
	}
	else if(nextCounter == target)
	{
		//if target value change color to red
		changeImageToGreen(nextCounter);
		nextCounter++;
		counter++;
		document.getElementById("node++").style.backgroundColor = "yellow";
		setTimeout(function(){	
		document.getElementById("node++").style.backgroundColor = "white";
		}, 750);
	}
}
function back() {
//go back a step
	if(nextCounter > 0)
	{
		nextCounter--;
		changeImageToBlack(nextCounter);
		counter--;
		checkLevel();
		document.getElementById("node--").style.backgroundColor = "yellow";
		setTimeout(function(){	
		document.getElementById("node--").style.backgroundColor = "white";
		}, 750);
	}
}
function reset() {
//reset the entire animation
	nextCounter = 0;
	while (nextCounter < 15)
	{
		changeImageToBlack(nextCounter);
		nextCounter++;
	}
	nextCounter = 0;
	counter = 0;
	target = 14;
	clearInterval(interval);
	document.getElementById("node--").style.backgroundColor = "white";
	document.getElementById("node++").style.backgroundColor = "white";
	document.getElementById("found").style.backgroundColor = "white";
	document.getElementById("notfound").style.backgroundColor = "white";
	document.getElementById("searchlevel").style.backgroundColor = "white";
	
	document.getElementById("level0").style.visibility = "hidden";
	document.getElementById("level1").style.visibility = "hidden";
	document.getElementById("level2").style.visibility = "hidden";
	document.getElementById("level3").style.visibility = "hidden";
}


function changeImageToRed(i){
//change the image to red
	MyImages[i].src = "/algo/images/algorithm/breadthfirst/redcircle.gif";
}

function changeImageToBlack(i){
//change the image to black
	MyImages[i].src = "/algo/images/algorithm/breadthfirst/circle.gif";
}

function changeImageToGreen(i){
//change the image to green
	document.getElementById("found").style.backgroundColor = "yellow";
	document.getElementById("searchlevel").style.backgroundColor = "white";
	document.getElementById("notfound").style.backgroundColor = "white";
	MyImages[i].src = "/algo/images/algorithm/breadthfirst/greencircle.gif";
}

function setTarget()
{
//set the target to search for
	var value = document.getElementsByName("input1")[0].value;
	target = value;
}

function playAnimation() {
//play the animation from beginning
	counter = 0;
	
	interval = setInterval(function(){
		checkLevel();
		if(counter > 14)
		{
			clearInterval(interval);
		}
		if(counter == target){
			changeImageToGreen(counter);
			clearInterval(interval);
		}
		else{
			changeImageToRed(counter);
			counter++;
			document.getElementById("node++").style.backgroundColor = "yellow";
			setTimeout(function(){	
			document.getElementById("node++").style.backgroundColor = "white";
		}, 750);
		}
	}, 1000);
}
