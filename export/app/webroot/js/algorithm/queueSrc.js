  /***********
*	Name: 		Justin Catrambone and David Sturgeon
*	File: 		mainqueque.js
*	Project:	{AlgorithmA}; 2010
*	Date Created:	February 21, 2010
*	Purpose:
*		The purpose of this file is to supply JavaScript code to the queue.htm file.
*	Dependencies:
*		jsAnim.js, pbMan.js
*	Notes:
*	Functions:
*		pushAnim()     : Animation code for push()
*		popAnim()      : Animation code for pop()
*		push()         : push element onto queue
*		pop()          ; pop element off of queue
************/
var manager = new jsAnimManager();
var playback = new pbManager();
var availableDivs = new Array("0", "1", "2", "3", "4", "5");
var queue = new Array();
var id;

function Initialize()
{
	document.getElementById("concept").onmouseover = function () {
		Tip("A queue is a particular kind of collection in which the entities in the collection are kept in order and the principal (or only) operations on the collection are the addition of entities to the rear terminal position and removal of entities from the front terminal position. This makes the queue a First-In-First-Out (FIFO) data structure. In a FIFO data structure, the first element added to the queue will be the first one to be removed. This is equivalent to the requirement that whenever an element is added, all elements that were added before have to be removed before the new element can be invoked. A queue is an example of a linear data structure.<br /><br />Queues provide services in computer science, transport and operations research where various entities such as data, objects, persons, or events are stored and held to be processed later. In these contexts, the queue performs the function of a buffer",WIDTH, 700, FONTFACE, 'Verdana, sans-serif', FONTSIZE, '12pt',FONTCOLOR, '#000000',PADDING, 8, SHADOW, true, SHADOWCOLOR, '#CCCCCC', FADEIN, 400, FADEOUT, 800,CENTERMOUSE, true, OFFSETX, 0 ,BGCOLOR, '#FFFFCC');
	}
	document.getElementById("howto").onmouseover = function() {
		Tip("<strong>Push Back</strong> - Push a random element to the structure to the back of the list<br /><br /><strong>Pop Front</strong> - Remove an element from the front of the list",WIDTH, 400, FONTFACE, 'Verdana, sans-serif', FONTSIZE, '11pt',FONTCOLOR, '#000000',PADDING, 8, SHADOW, true, SHADOWCOLOR, '#CCCCCC', FADEIN, 400, FADEOUT, 800,CENTERMOUSE, true, OFFSETX, 0 ,BGCOLOR, '#CEFFFF');
	}
}

function pushAnim()
{
	//create some variables for position
	var size = queue.length;
	var xo = ((size - 1) * 110) + 100;
	var xf = ((size - 1) * 110);
	//create push animation
	var anim2 = manager.createAnimObject(id);
	var anim4 = manager.createAnimObject(id);
	anim2.add({property: Prop.position, from: new Pos(xo,20), to: new Pos(xf,20), duration: 1000});
	anim4.add({property: Prop.opacity, from: 0, to: 1, duration: 500});
	//anim2.sequential();
}

function popAnim()
{
	var anim3 = manager.createAnimObject(queue[0]);
	anim3.add({property: Prop.opacity, from: 1, to: 0, duration: 500});
	anim3.sequential();
}

function shiftAnim()
{
	//move over all objects left in queue after the pop
	var size = queue.length;
	for(var n = 0; n < size; n++)
	{
		//create position variables
		var i = queue[n];
		var x = (n * 110);
		//create animation
		var anim1 = manager.createAnimObject(i);
		anim1.add({property: Prop.position, to: new Pos(x,20), duration: 1000});
		anim1.sequential();
	}
}

function push()
{
	document.getElementById("pushhigh").style.backgroundColor = "yellow";
	setTimeout(function(){	
	document.getElementById("pushhigh").style.backgroundColor = "white";
	}, 1000);
	//check size of availableDivs
	if(availableDivs.length > 0)
	{
		//push value onto queue and make newly added div visable
		queue.push(availableDivs[0]);
		id = availableDivs.shift();
		document.getElementById(id).style.visibility = "visible";
		//call animation
		pushAnim();
	}
}
function pop()
{
	document.getElementById("pophigh").style.backgroundColor = "yellow";
	setTimeout(function(){	
	document.getElementById("pophigh").style.backgroundColor = "white";
	}, 1000);
	//check size of availableDivs
	if(queue.length > 0)
	{
		//pop value off of queue and make removed div hidden
		availableDivs.push(queue[0]);
		//call pop animation
		popAnim();
		id = queue.shift();
		//document.getElementById(id).style.visibility = "hidden";
		//call shift animation
		shiftAnim();
	}
}

function reset()
{
	availableDivs = new Array("0", "1", "2", "3", "4", "5");
	queue = new Array();
	for(var n = 0; n < 6; n++)
	{
		document.getElementById(n).style.visibility = "hidden";
	}
}