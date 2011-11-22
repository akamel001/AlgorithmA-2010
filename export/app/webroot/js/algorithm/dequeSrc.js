  /***********
*	Name: 		Manuel Mendez and Martin Smith
*	File: 		deque.js
*	Project:	{AlgorithmA}; 2010
*	Date Created:	February 24, 2010
*	Purpose:
*		The purpose of this file is to supply JavaScript code to the deque.htm file.
*	Dependencies:
*		jsAnim.js, pbMan.js
*	Notes:
*	Functions:
		pushAnim()      : Animation for pushBack()
		pushFrontAnim() : Animation for pushFront()
		popAnim()       : Animation for popFront()
		pushBack()		: push element onto the back of the deque
		pushFront()		: push aelement onto the fron of deque
		popBack()		: pop element off the back of deque
		popFront()		: pop element off the front of deque
************/
var manager = new jsAnimManager();
var playback = new pbManager();
var deque = new Array();
var availableDivs = new Array("0", "1", "2", "3", "4", "5", "6", "7");
var id;
var newBox = 0;
var counter = 0;

function Initialize()
{

/* REQUIRED */
	// Sets up your Concept and How-To buttons.
	document.getElementById("concept").onmouseover = function () {Tip("Deque (double-ended queue) is an abstract data structure that implements a queue for which elements can only be added to or removed from the front (head) or back (tail).In a doubly-linked list implementation, the time complexity of all Deque operations is O(1). Additionally, the time complexity of insertion or deletion in the middle, given an iterator, is O(1); however, the time complexity of random access by index is O(n).",WIDTH, 400, FONTFACE, 'Verdana, sans-serif', FONTSIZE, '12pt',FONTCOLOR, '#000000',PADDING, 8, SHADOW, true, SHADOWCOLOR, '#CCCCCC', FADEIN, 400, FADEOUT, 800,CENTERMOUSE, true, OFFSETX, 0 ,BGCOLOR, '#FFFFCC');
	}
	document.getElementById("howto").onmouseover = function() {Tip("<strong>Push Front</strong> - Pushes a random element to the structure to the front of the list<br />" +
		"<br /><strong>Push Back</strong> - Pushes a random element to the structure to the back of the list<br />" +
		"<br /><strong>Pop Front</strong> - Removes an element from the front of the list<br />" +
		"<br /><strong>Pop Back</strong> - Removes an element from the back of the list <br />" +
		"<br /><strong>Reset</strong> - Resets to the initial layout when first loaded.<br />"
		
		,WIDTH, 400, FONTFACE, 'Verdana, sans-serif', FONTSIZE, '11pt',FONTCOLOR, '#000000',PADDING, 8, SHADOW, true, SHADOWCOLOR, '#CCCCCC', FADEIN, 400, FADEOUT, 800,CENTERMOUSE, true, OFFSETX, 0 ,BGCOLOR, '#CEFFFF');
	}

}

function pushAnim()
{
	//create some variables for position
	var size = deque.length;
	var xo = (size - 1) * 60 + 60;
	var xf = (size - 1) * 60;
	//create push animation
	var anim2 = manager.createAnimObject(id);
	anim2.add({property: Prop.position, from: new Pos(xo, 0), to: new Pos(xf,0), duration: 1000});
	anim2.sequential();
}

function pushFrontAnim()
{
	//move everything
	var size = deque.length;
	//create some variables for position
	for(var n = size -1; n > 0; n--)	
	{	
		var i = deque[n];
		var x = (n * 60);
		//create animation
		var anim1 = manager.createAnimObject(i);
		if(n == 1)
		  anim1.add({property: Prop.position, to: new Pos(x,0), duration: 1000, 
		    onComplete: function() {document.getElementById(id).style.visibility = "visible";}});
		else
		  anim1.add({property: Prop.position, to: new Pos(x,0), duration: 1000});
		anim1.sequential();	
	}
	var xo = -60;
	var xf = 0;
	//create push animation
	var anim2 = manager.createAnimObject(id);
	anim2.add({property: Prop.position, from: new Pos(xo,0), to: new Pos(xf,0), duration: 1000});
	anim2.sequential();


}

function popAnim()
{
	//move over all objects left in deque after the pop
	var size = deque.length;
	for(var n = 0; n < size; n++)
	{
		//create position variables
		var i = deque[n];
		var x = (n * 60);
		//create animation
		var anim1 = manager.createAnimObject(i);
		anim1.add({property: Prop.position, to: new Pos(x,0), duration: 1000});
		anim1.sequential();
	}
}

function pushFront()
{
	document.getElementById("pushfront").style.backgroundColor = "yellow";
	setTimeout(function(){	
	document.getElementById("pushfront").style.backgroundColor = "white";
	}, 1000);
	//check size of availableDivs
	if(availableDivs.length > 0)
	{
		//push value onto deque and make newly added div visable
		deque.unshift(availableDivs[0]);
		id = availableDivs.shift();
		//call animation
		pushFrontAnim();
	}
}

function pushBack()
{
	document.getElementById("pushback").style.backgroundColor = "yellow";
	setTimeout(function(){	
	document.getElementById("pushback").style.backgroundColor = "white";
	}, 1000);
	//check size of availableDivs
	if(availableDivs.length > 0)
	{
		//push value onto deque and make newly added div visable
		deque.push(availableDivs[0]);
		id = availableDivs.shift();
		document.getElementById(id).style.visibility = "visible";
		//call animation
		pushAnim();
	}
}

function popFront()
{
	document.getElementById("popfront").style.backgroundColor = "yellow";
	setTimeout(function(){	
	document.getElementById("popfront").style.backgroundColor = "white";
	}, 1000);
	if(deque.length > 0)
	{
		//pop value off of deque and make removed div hidden
		availableDivs.push(deque[0]);
		id = deque.shift();
		document.getElementById(id).style.visibility = "hidden";
		//call animation
		popAnim();
	}
}

function popBack()
{
	document.getElementById("popback").style.backgroundColor = "yellow";
	setTimeout(function(){	
	document.getElementById("popback").style.backgroundColor = "white";
	}, 1000);
	if(deque.length > 0)
	{
		//pop value off of deque and make removed div hidden
		availableDivs.push(deque[deque.length - 1]);
		id = deque.pop();
		document.getElementById(id).style.visibility = "hidden";
		//call animation
		popBackAnim();
	}
}

