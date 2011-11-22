/****************************
* Name: Tim Herr
* File: bubbleSrc.js
* Project: {AlgorithmA}; 2010
* Date Created: February 25, 2010
* Date Modded: March 18, 2010
* Purpose:
* [The Purpose of this file is to be used with bubbleView.ctp] 
* for the animation to function.
* Dependencies:
* bubbleView.ctp
* Notes/Changelog:
* 3/18 - Code Cleaned and Unneccessary comments removed.
* Functions:
* Initialize() - Populate Animation Array and Set Up Boxes with a call to placeBoxes()
* SwapRecord(id1, id2, index) - Creates a Swap Record which is used in the Animation Array
* placeBoxes() - Places Boxes into correct places.
* toTempAnimation() - Moves the box at n+1 down to the temp area.
* toAPlusOne() - Moves the box at n to the n+1 position.
* tempToA() - Moves the box at temp position to the n position.
* fromTempAnimation() - Opposite of toTempAnimation().
* fromAPlusOne() - Opposite of toAPlusOne().
* fromTempToA()	 - Opposite of tempToA().
* function populateAnimationArray() - Fills Animation Array with appropriate Animation Records.
* function startPressed() - What is done when Start has been pressed.
* function playingAnimation() - Prevents user from interrupting animations.
* function forwardPressed() - What is done if Forward has been pressed.
* function backPressed() - What is done if Back is pressed.
* function resetPressed() - What is done if Reset is pressed.
* function nextAnimation() - Determines the next animation.
* function prevAnimation() - Determines the animation to undo the previous animation.
*****************************/

var manager = new jsAnimManager();
var xOffset = -200;
var yPos = 125;

var startWasClicked;
var forwardWasClicked;
var prevWasClicked;
var animationArrayPos = 0;
// 0 = toTemp, 1 = toAPlusOne, 2 = tempToA
var nextAnim = 0;
var wait = false;

var swapped = false;

var stopAnimations = false;
var animationDelay = 1200;
var step = false;
var reset = false;

var animArray = ["box5","box2","box3","box1","box4"];
var valueArray = [5, 2, 3, 1, 4];

var animationArray = new Array();

function Initialize()
{	
	placeBoxes();
	populateAnimationArray();
	document.getElementById("concept").onmouseover = function () {
		Tip("The bubble sort is the oldest and simplest sort in use. Unfortunately, it's also the slowest. The bubble sort works by comparing each item in the list with the item next to it, and swapping them if required. The algorithm repeats this process until it makes a pass all the way through the list without swapping any items (in other words, all items are in the correct order). This causes larger values to 'bubble' to the end of the list while smaller values 'sink' towards the beginning of the list. It is generally considered to be the most inefficient sorting algorithm in common usage. Under best-case conditions (the list is already sorted), the bubble sort can approach a constant O (n) level of complexity. General-case is an abysmal O(n<sup2</sup>).",WIDTH, 500, FONTFACE, 'Verdana, sans-serif', FONTSIZE, '12pt',FONTCOLOR, '#000000',PADDING, 8, SHADOW, true, SHADOWCOLOR, '#CCCCCC', FADEIN, 400, FADEOUT, 800,CENTERMOUSE, true, OFFSETX, 0 ,BGCOLOR, '#FFFFCC');
	}
	document.getElementById("howto").onmouseover = function() {
		Tip("<strong>Start</strong> - Starts the bubble sort animation.<br/><br/><strong>Forward</strong> - Allows the user to step through the sort one step at a time.<br/><br/><strong>Back</strong> - Allow the user to step back through the sort one step at a time.<br/><br/><strong>Reset</strong> - Resets the bubble sort animation to the beginning." ,WIDTH, 400, FONTFACE, 'Verdana, sans-serif', FONTSIZE, '12pt',FONTCOLOR, '#000000',PADDING, 8, SHADOW, true, SHADOWCOLOR, '#CCCCCC', FADEIN, 400, FADEOUT, 800,CENTERMOUSE, true, OFFSETX, 0 ,BGCOLOR, '#CEFFFF');
	}
}

function swapRecord(id1, id2, index)
{
	this.id1 = id1;
	this.id2 = id2;
	this.index = index;
}

function placeBoxes(){
	var pos5 = xOffset + 400;
	var pos4 = xOffset + 300;
	var pos3 = xOffset + 200;
	var pos2 = xOffset + 100;
	var pos1 = xOffset;
	var box = document.getElementById("box5");
	var box2 = document.getElementById("box2");
	var box3 = document.getElementById("box3");
	var box4 = document.getElementById("box1");
	var box5 = document.getElementById("box4");
	manager.registerPosition("box1");
	manager.registerPosition("box2");
	manager.registerPosition("box3");
	manager.registerPosition("box4");
	manager.registerPosition("box5");
	box.setPosition(pos1,yPos);
	box2.setPosition(pos2,yPos);
	box3.setPosition(pos3,yPos);
	box4.setPosition(pos4,yPos);
	box5.setPosition(pos5,yPos);
	
	box.style.visibility = 'visible';
	box2.style.visibility = 'visible';
	box3.style.visibility = 'visible';
	box4.style.visibility = 'visible';
	box5.style.visibility = 'visible';
	
	isPaused = false;
}
/***
Takes two box ids and the current index as parameters
***/
function toTempAnimation(id1, id2, index)
{
	var pos2 = xOffset + ((index + 1) * 100);
	var box2 = document.getElementById(id2);
	manager.registerPosition(id2);
	box2.setPosition(pos2, yPos);
	var anim = manager.createAnimObject(id2);
	anim.add({property:Prop.position, to: new Pos(pos2, yPos + 100), duration:1000});
	var t = setTimeout("wait = false", animationDelay);
}

function toAPlusOne(id1, id2, index)
{
	var pos1 = xOffset + (index * 100);
	var pos2 = xOffset + ((index+1) * 100);
	var box1 = document.getElementById(id1);
	var box2 = document.getElementById(id2);
	box1.setPosition(pos1, yPos);
	box2.setPosition(pos2, (yPos + 100));
	var anim1 = manager.createAnimObject(id1);
	var anim2 = manager.createAnimObject(id2);
	anim1.add({property:Prop.position, to: new Pos(pos2, yPos), duration: 1000});
	anim2.add({property:Prop.position, to: new Pos(pos1, (yPos+100)), duration: 1000});
	var t = setTimeout("wait = false", animationDelay);
}

function tempToA(id1, id2, index)
{
	var pos1 = xOffset + ((index + 1) * 100);
	var pos2 = xOffset + ((index) * 100);
	var box1 = document.getElementById(id1);
	var box2 = document.getElementById(id2);
	box1.setPosition(pos1, yPos);
	box2.setPosition(pos2, (yPos+100));
	var anim2 = manager.createAnimObject(id2);
	anim2.add({property:Prop.position, to: new Pos(pos2, yPos), duration: 1000});
	var t = setTimeout("wait = false", animationDelay);
}
/***
Back Animations
***/
function fromTempAnimation(id1, id2, index)
{
	var pos2 = xOffset + ((index + 1) * 100);
	var box2 = document.getElementById(id2);
	manager.registerPosition(id2);
	box2.setPosition(pos2, yPos + 100);
	var anim = manager.createAnimObject(id2);
	anim.add({property:Prop.position, to: new Pos(pos2, yPos), duration:1000});
	var t = setTimeout("wait = false", animationDelay);
}

function fromAPlusOne(id1, id2, index)
{
	var pos1 = xOffset + ((index+1) * 100);
	var pos2 = xOffset + (index * 100);
	var box1 = document.getElementById(id1);
	var box2 = document.getElementById(id2);
	box1.setPosition(pos1, yPos);
	box2.setPosition(pos2, (yPos + 100));
	var anim1 = manager.createAnimObject(id1);
	var anim2 = manager.createAnimObject(id2);
	anim1.add({property:Prop.position, to: new Pos(pos2, yPos), duration: 1000});
	anim2.add({property:Prop.position, to: new Pos(pos1, (yPos+100)), duration: 1000});
	var t = setTimeout("wait = false", animationDelay);
}

function fromTempToA(id1, id2, index)
{
	var pos1 = xOffset + ((index + 1) * 100);
	var pos2 = xOffset + ((index) * 100);
	var box1 = document.getElementById(id1);
	var box2 = document.getElementById(id2);
	box1.setPosition(pos1, yPos);
	box2.setPosition(pos2, yPos);
	var anim2 = manager.createAnimObject(id2);
	anim2.add({property:Prop.position, to: new Pos(pos2, (yPos + 100)), duration: 1000});
	var t = setTimeout("wait = false", animationDelay);
}


/***
Determine what index must be swapped throughout each step of the animation
***/		
function populateAnimationArray()
{
	swapped = true;
	while(swapped)
	{
		swapped = false;
		var i = 0;
		while( i < valueArray.length )
		{
			if(valueArray[i] > valueArray[i+1])
			{
				animationArray.push(
					new swapRecord(
						animArray[i],
						animArray[i+1],
						i));
				var temp = valueArray[i];
				valueArray[i] = valueArray[i+1];
				valueArray[i+1] = temp;
				temp = animArray[i];
				animArray[i] = animArray[i+1];
				animArray[i+1] = temp;
				swapped = true;
			}
			i++;
		}
	}
	var i = 0;
}

function startPressed()
{
	startIsPressed = true;
	forwardIsPressed = false;
	backIsPressed = false;	
	playingAnimation();
}
function playingAnimation()
{
	if(forwardIsPressed || backIsPressed)
		return;
	if(!startIsPressed)
		return;
	
	startIsPressed = true;
	forwardIsPressed = false;
	backIsPressed = false;
	
	if(!wait && startIsPressed)
	{
		wait = true;
		if(animationArrayPos < animationArray.length)
		{
			nextAnimation();
			var t = setTimeout(function(){playingAnimation()}, animationDelay);
		}
		else
			wait = false;
	}
}
		
function forwardPressed()
{
	startIsPressed = false;
	forwardIsPressed = true;
	backIsPressed = false;
	if(!wait)
	{
		wait = true;
		if(animationArrayPos < animationArray.length)
			nextAnimation();
		else
			wait = false;
	}
}

function backPressed()
{
	startIsPressed = false;
	forwardIsPressed = false;
	backIsPressed = true;
	
	if(animationArrayPos == 0 && nextAnim == 0)
	{
	return
	}
	if(!wait)
	{
		wait = true;
		prevAnimation();
	}
}
/***
Has to wait for animationDelay before running to avoid doing nothing
***/
function resetPressed()
{
	startIsPressed = false;
	forwardIsPressed = false;
	backIsPressed = false;
	animationArrayPos = 0;
	nextAnim = 0;
	var t = setTimeout(
		function(){
		placeBoxes();
		document.getElementById("lineToAPlusOne").style.color = "black";
		document.getElementById("lineTempToA").style.color = "black";
		document.getElementById("lineToTemp").style.color = "red";},
		animationDelay);

}

function PsuedoHighlight( nPsuedoId )
{	
	for ( i = 1; i < 4; i++ )
	{		
		if ( document.getElementById( "psuedo" + i ).style.backgroundColor == "rgb(255, 255, 0)" )
		{
		var anim1 = manager.createAnimObject( "psuedo" + i );  
		anim1.add( {property: Prop.backgroundColor, from: new Col(255,255,0), to: new Col(255,255,255), duration:250} );
		}
	}
	
	if ( nPsuedoId != 0)
	{	
		var anim = manager.createAnimObject( "psuedo" + nPsuedoId );  
		anim.add( {property: Prop.backgroundColor, from: new Col(255,255,255), to: new Col(255,255,0), duration:250} );
	}
}

function nextAnimation()
{
	if(nextAnim == 0)
	{
	PsuedoHighlight(1);
	toTempAnimation(
		animationArray[animationArrayPos].id1,
		animationArray[animationArrayPos].id2,
		animationArray[animationArrayPos].index
		)
	nextAnim = 1;
	}
	else if(nextAnim == 1)
	{
	PsuedoHighlight(2);
	toAPlusOne(
		animationArray[animationArrayPos].id1,
		animationArray[animationArrayPos].id2,
		animationArray[animationArrayPos].index
		);
	nextAnim = 2;
	}
	else if(nextAnim == 2)
	{
	PsuedoHighlight(3);
	tempToA(
		animationArray[animationArrayPos].id1,
		animationArray[animationArrayPos].id2,
		animationArray[animationArrayPos].index
		);
	nextAnim = 0;
	if(animationArrayPos < animationArray.length)
		animationArrayPos++;
	}
}

function prevAnimation()
{
	if(nextAnim == 1)
	{
	PsuedoHighlight(1);
	fromTempAnimation(
		animationArray[animationArrayPos].id1,
		animationArray[animationArrayPos].id2,
		animationArray[animationArrayPos].index
		)
	nextAnim = 0;
	}
	else if(nextAnim == 2)
	{
	PsuedoHighlight(2);
	fromAPlusOne(
		animationArray[animationArrayPos].id1,
		animationArray[animationArrayPos].id2,
		animationArray[animationArrayPos].index
		);
	nextAnim = 1;
	}
	else if(nextAnim == 0)
	{
	PsuedoHighlight(3);
	animationArrayPos--;
	fromTempToA(
		animationArray[animationArrayPos].id1,
		animationArray[animationArrayPos].id2,
		animationArray[animationArrayPos].index
		);
	nextAnim = 2;
	}
}
		
	
		
			