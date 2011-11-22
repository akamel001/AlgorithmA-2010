/***
	Tim Herr
	linkedList.js
	
	Edited on 3/21/2010 by Evan Plett
			Fixed highlighting so that it conforms to the rest of the algorithms
			Changed Reset
	
***/

var manager = new jsAnimManager();
var xOffset = -300;
var yPos = 125;

var lastLinkNumber = 5; 
var currentLinkNumber = 1;
var currentAnimation = 0;

/*** 
Place all boxes then hide them
***/
function Initialize()
{
	placeObjects();
	document.getElementById("newNodeLine").style.color = "red";
	
	document.getElementById("nullPointer1").style.visibility = "hidden";
	document.getElementById("nullPointer2").style.visibility = "hidden";
	document.getElementById("nullPointer3").style.visibility = "hidden";
	document.getElementById("nullPointer4").style.visibility = "hidden";
	document.getElementById("nullPointer5").style.visibility = "hidden";
	
	document.getElementById("nextPointer1").style.visibility = "hidden";
	document.getElementById("nextPointer2").style.visibility = "hidden";
	document.getElementById("nextPointer3").style.visibility = "hidden";
	document.getElementById("nextPointer4").style.visibility = "hidden";
	document.getElementById("nextPointer5").style.visibility = "hidden";
	
	document.getElementById("concept").onmouseover = function () {
		Tip("In computer science, a linked list is one of the fundamental data structures, and can be used to implement other data structures. It consists of a sequence of nodes, each containing arbitrary data fields and one or two references ('links') pointing to the next and/or previous nodes. The principal benefit of a linked list over a conventional array is that the order of the linked items may be different from the order that the data items are stored in memory or on disk, allowing the list of items to be traversed in a different order. A linked list is a self-referential datatype because it contains a pointer or link to another datum of the same type. Linked lists permit insertion and removal of nodes at any point in the list in constant time, but do not allow random access. Several different types of linked list exist: singly-linked lists, doubly-linked lists, and circularly-linked lists.",WIDTH, 700, FONTFACE, 'Verdana, sans-serif', FONTSIZE, '12pt',FONTCOLOR, '#000000',PADDING, 8, SHADOW, true, SHADOWCOLOR, '#CCCCCC', FADEIN, 400, FADEOUT, 800,CENTERMOUSE, true, OFFSETX, 0 ,BGCOLOR, '#FFFFCC');
	}
	document.getElementById("howto").onmouseover = function() {
		Tip("<strong>Push</strong> - Pushes an element to the back of the list.<br /><br /><strong>Forward</strong> - Step forward in the animation.<br /><br /><strong>Pop</strong> - Pop the last node in the list.<br /><br /><strong>Back</strong> - Step back a step in the animation.<br /><br /><strong>Reset</strong> - Reset the list to an empty state.<br /><br />",WIDTH, 400, FONTFACE, 'Verdana, sans-serif', FONTSIZE, '11pt',FONTCOLOR, '#000000',PADDING, 8, SHADOW, true, SHADOWCOLOR, '#CCCCCC', FADEIN, 400, FADEOUT, 800,CENTERMOUSE, true, OFFSETX, 0 ,BGCOLOR, '#CEFFFF');
	}
}

function placeObjects()
{
	var pos5 = xOffset + 500;
	var pos4 = xOffset + 375;
	var pos3 = xOffset + 250;
	var pos2 = xOffset + 125;
	var pos1 = xOffset;
	/***
	Place Boxes
	***/
	var null1 = document.getElementById("nullPointer1");
	var null2 = document.getElementById("nullPointer2");
	var null3 = document.getElementById("nullPointer3");
	var null4 = document.getElementById("nullPointer4");
	var null5 = document.getElementById("nullPointer5");
	manager.registerPosition("nullPointer1");
	manager.registerPosition("nullPointer2");
	manager.registerPosition("nullPointer3");
	manager.registerPosition("nullPointer4");
	manager.registerPosition("nullPointer5");
	null1.setPosition(pos1,yPos);
	null2.setPosition(pos2,yPos);
	null3.setPosition(pos3,yPos);
	null4.setPosition(pos4,yPos);
	null5.setPosition(pos5,yPos);
	
	var next1 = document.getElementById("nextPointer1");
	var next2 = document.getElementById("nextPointer2");
	var next3 = document.getElementById("nextPointer3");
	var next4 = document.getElementById("nextPointer4");
	var next5 = document.getElementById("nextPointer5");
	manager.registerPosition("nextPointer1");
	manager.registerPosition("nextPointer2");
	manager.registerPosition("nextPointer3");
	manager.registerPosition("nextPointer4");
	manager.registerPosition("nextPointer5");
	next1.setPosition(pos1,yPos);
	next2.setPosition(pos2,yPos);
	next3.setPosition(pos3,yPos);
	next4.setPosition(pos4,yPos);
	next5.setPosition(pos5,yPos);
	
}
	
function nextAnimation(linkNumber)
{
		if(currentAnimation == 0)
		{
			var idName = ("nullPointer" + linkNumber);
			document.getElementById(
				idName)
				.style
				.visibility = "visible";
			currentAnimation++;
			PseudoHighlight(1);
		}
		else if(currentAnimation == 1)
		{
			var idName = ("nullPointer" + (linkNumber + 1));
			document.getElementById(
				idName)
				.style
				.visibility = "visible";
			PseudoHighlight(1);
			currentAnimation++;
		}
		else if(currentAnimation == 2)
		{
			var idName = ("nextPointer" + linkNumber);
			document.getElementById(
				idName)
				.style
				.visibility = "visible";
			PseudoHighlight(2);
			currentAnimation--;
			currentLinkNumber++;
		}
}

function prevAnimation(linkNumber)
{
	if(linkNumber == 1 && currentAnimation == 1)
	{
		idName = ("nullPointer" + linkNumber);
		document.getElementById(
			idName)
			.style
			.visibility = "hidden";
		PseudoHighlight(4);
		currentAnimation--;
	}
	else if(currentAnimation == 1)
	{
		var idName = ("nullPointer" + (linkNumber - 1));
		document.getElementById(
			idName)
			.style
			.visibility = "visible";
		var idName = ("nextPointer" + (linkNumber - 1));
		document.getElementById(
			idName)
			.style
			.visibility = "hidden";
		PseudoHighlight(3);
		currentLinkNumber--;
	}
	else if(currentAnimation == 2)
	{
		var idName = ("nullPointer" + (linkNumber + 1));
		document.getElementById(
			idName)
			.style
			.visibility = "hidden";
		PseudoHighlight(4);
		currentAnimation--;
	}
}

// Added by Evan Plett
function PseudoHighlight( nPseudoId )
{	
	for ( i = 1; i < 5; i++ )
	{		
		if ( document.getElementById( "pseudo" + i ).style.backgroundColor == "rgb(255, 255, 0)" )
		{
		var anim1 = manager.createAnimObject( "pseudo" + i );  
		anim1.add( {property: Prop.backgroundColor, from: new Col(255,255,0), to: new Col(255,255,255), duration:250} );
		}
	}
	
	if ( nPseudoId != 0)
	{	
		var anim = manager.createAnimObject( "pseudo" + nPseudoId );  
		anim.add( {property: Prop.backgroundColor, from: new Col(255,255,255), to: new Col(255,255,0), duration:250} );
	}
}

function push(currentLink)
{
	if(currentAnimation == 0)
	{
	var t = setTimeout(
		function(){
		pushStep()},
		500);
		return;
	}
	else if(currentLink < currentLinkNumber)
	{
		return;
	}
	if(currentLink == lastLinkNumber)
	{
		return;
	}
	if(currentLink == currentLinkNumber)
	{
	var t = setTimeout(
		function(){
		pushStep();
		push(currentLink)},
		500);
	}
}


function pushStep()
{
	if(currentLinkNumber < lastLinkNumber)
			nextAnimation(currentLinkNumber);
			
}

function pop(currentLink)
{
	if(currentAnimation == 0)
	{
		return;
	}
	if(currentAnimation == 1)
	{
		if(currentLink == currentLinkNumber)
		{
			var t = setTimeout(function(){
				popStep();
				pop(currentLink)
			},500);
			return;
		}
		else
			return;
	}	
		
	var t = setTimeout(
		function(){
		popStep();
		pop(currentLink)},
		500);
	
}

function popStep()
{
	if(currentLinkNumber >= 1)
		prevAnimation(currentLinkNumber);
}
		
		
	
		
			