/*********************************************************
*	Name:		Danny Vargas
*	File:		testFunctions.js
*	Created:	February 14, 2010
*	Modified:	March 8, 2010
*	Dependency:	jsAnim.js, pbMan.js
*	Notes:		
*		A very simple example of how you normally would use both jsAnim
*		and pbMan.
*	Changelog:
*		March 8, 2010
*			- Added Prop.line functionality examples.

*	Functions:	
*		PlayPause(ID)		 	:	Play/Pause Button Function.
*		NormalAnimation()		:	How you normally would do animation.
*		SequenceAnimation()		:	How the new pbMan works.
*		LineAnimation()			:	How to draw a line.
*		EraseALine()			:	Example erasure of a line.
*		updatePosition()		:	Example of updating values through user input
*		updateColor()			:	Same.
***********************************************************/

var manager = new jsAnimManager(20);
var playback = new pbManager();

var pp = 0;
var PosX = 500, PosY = 200, RadZ = 10;
var red, green, blue;
red = green = blue = 0;

/*! 	THIS FUNCTION MUST BE INCLUDED
	
	This function initializes all buttons on the template to whatever you need.
	Each button is appended to the end of the inner html of the object. 

*/
function Initialize()
{
	// Set initial values of input boxes. This is so that reloading the screen doesn't break it.
	document.getElementById("toPosX").value = PosX;
	document.getElementById("toPosY").value = PosY;
	document.getElementById("toRadius").value = RadZ;
	document.getElementById("toRed").value = red;
	document.getElementById("toGreen").value = green;
	document.getElementById("toBlue").value = blue;
	
	/* REQUIRED */
	// Sets up your Concept and How-To buttons.
	document.getElementById("concept").onmouseover = function () {
		Tip("This is a test page containing simple animations and the code that got it done. The normal animation will only play a single sequence using only jsAnim. You must refresh the page in order to use the sequenced animation. The sequenced animation uses a combination of both jsAnim and my own playback manager (pbMan). This sequence only does one animation sequence of swap at a time. You can queue up as many animations as you want by continually pressing the button that runs it.<br /><br />Additionally I have added the Prop.line and Attrib functions to jsAnim. Both are used to draw lines with specified position, size, and color. To make this smooth and to actually make it look like a line, you either increase the duration (takes longer, but is cleaner) or lower the timestep when you first create the jsAnim manager (minimum for this project is 20; default is 40).",WIDTH, 500, FONTFACE, 'Verdana, sans-serif', FONTSIZE, '12pt',FONTCOLOR, '#000000',PADDING, 8, SHADOW, true, SHADOWCOLOR, '#CCCCCC', FADEIN, 400, FADEOUT, 800,CENTERMOUSE, true, OFFSETX, 0 ,BGCOLOR, '#FFFFCC');
	}
	document.getElementById("howto").onmouseover = function() {
		Tip("<strong>Pause/Play</strong> - Tell's jsAnim to pause. What it really does is set a flag that makes jsAnim's manager to skip a step while it is on. jsAnim is always running.<br /><br /><strong>Normal</strong> - A normal animation. Uses sequence flags to allow red and blue to go before green. Reset to use Sequence!<br /><br /><strong>Sequence</strong> - Uses pbMan to run a series of animations. Can be queued by continuously pressing this button.<br /><br /><strong>Draw Line</strong> Draws a line from one point to another. If no values are set, it will draw a random line.<br /><br /><strong>Erase Line</strong> - Erases the last line drawn. Simple deduction of the index and the EraseLine function.",WIDTH, 400, FONTFACE, 'Verdana, sans-serif', FONTSIZE, '12pt',FONTCOLOR, '#000000',PADDING, 8, SHADOW, true, SHADOWCOLOR, '#CCCCCC', FADEIN, 400, FADEOUT, 800,CENTERMOUSE, true, OFFSETX, 0 ,BGCOLOR, '#CEFFFF');
	}
}

// Just a play pause button functionality. Playing and pausing is already
// built into jsAnim.
function PlayPause(ID)
{
	pp = !pp;
	if (pp)
	{
		manager.pause();
		document.getElementById(ID).innerHTML = "Play!";
	}
	else
	{
		manager.resume();
		document.getElementById(ID).innerHTML = "Pause!";
	}
}

/*!
	This is normally how you use jsAnim. I have modified jsAnim to include
	a new function called "sequential". This tells the manager that the 
	animations before this is called must be done before the ones below it.
	Without this, you must specify a wait duration before each animation could
	finish.
	
	To test this out, try removing the "anim1.sequential();" line and see what 
	happens.
*/
function NormalAnimation()
{
	var anim1 = manager.createAnimObject("box1");
	anim1.add({property: Prop.left, to: 500, duration: 1000});
	var anim2 = manager.createAnimObject("box2");
	anim2.add({property: Prop.left, to: 500, duration: 1000});
	anim2.sequential();
	var anim3 = manager.createAnimObject("box3");
	anim3.sequential();
	anim3.add({property: Prop.left, to: 500, duration: 1000});
}

/*!
	This is a sequenced animation made using my own playback manager.
	The manager is set up just like jsAnim with most of the guts torn out.
	The below code creates a new playback animation object per animation done.
	Unlike in jsAnim, you cannot add multiple sequences to the same object.
	This is why you have "set" instead of "add". Setting the same object twice
	overrides the current settings within it.

	The main reason I had to do this was the way jsAnim works. Making a global
	"swap" function only lead to chaos. Positions were being set to where old box
	locations were. For instance, box1 changes to where box2 is, the next animation
	you would see box1 start where it originally was at (0, 10) and move to where 
	box3 is, and box3 would go to (0, 10) instead of the middle.
	
	Doing it this way makes for a more dynamic animation sequence. It can be 
	"multithreaded" in animations depending on what you want. It also allows for a 
	queue of animations instead of only one preset animation block declared below.
	
	Right now it only does swap. If you want more, just pitch me the idea.
*/
function SequenceAnimation()
{
	// Start = box1, box2, box3
	var swap1 = playback.createPBObject(manager);
	swap1.set({property: playProp.swap, object1: "box1", object2: "box2", duration: 1000});
	var swap2 = playback.createPBObject(manager);
	swap2.set({property: playProp.swap, object1: "box1", object2: "box3", duration: 1000});
	var swap3 = playback.createPBObject(manager);
	swap3.set({property: playProp.swap, object1: "box1", object2: "box2", duration: 1000});
	var swap4 = playback.createPBObject(manager);
	swap4.set({property: playProp.swap, object1: "box2", object2: "box3", duration: 1000});
	// End = box1, box2, box3
}

/*!
	New for iteration 2 (2010). 
	This is how you generally create a line. This will always start a line at 
	position (0, 200) with a radius/size of 10px and a color of rgb(0, 0, 0) (black).
	From there it goes to a user specified attribute.
	
	Things to note. 
		* Attrib is new. Only Prop.line uses it.
		* Drawing the line is not perfect. The shorter the duration, the less like 
			a line it becomes.
			- It will be more like a dotted line.
		* To fix this, try a longer duration
		* You can also specify the timestep jsAnim. You'll see the line 
			"new jsAnimManager(20);" on here which sets the timestep to 20 
			(default is 40).
			- This smoothes out the animation, but its very costly on slow computers.
			- 20 should be the lowest you should go on any project.
		* By default, jsAnim will run only one property at a time which was added to the
			same AnimObject
		* New function runall will take care of the above. It will tell that object to run all its
			animations at the same time.
			- BE CAREFUL. This was meant ONLY for Prop.line. Who knows what will happen with it on
				otherwise.
*/
function LineAnimation()
{
	var anim1 = manager.createAnimObject("workarea");
	anim1.runall();
	anim1.add({property: Prop.line, from: new Attrib(0,200,10,0,0,0), to: new Attrib(PosX,PosY,RadZ,red,green,blue), duration: 2000});
	anim1.add({property: Prop.line, from: new Attrib(0,0,10,0,0,0), to: new Attrib(PosX,PosY,RadZ,red,green,blue), duration: 2000});
}

/*!
	This is how you would erase a line. Notice I did not provide a way for you to 
	maintain your lines other than the lineHistory and the lineIndex. You have to 
	keep track what lines belong to what. This is just a simple function erasing
	the last line created. You can remove all lines with these 2 lines by pressing
	the button as many times as there are lines.	
*/
function EraseALine()
{
	eraseLine(manager, "workarea", lineIndex);
	lineIndex = lineIndex > 0 ? lineIndex-1 : 0;
}

/*!
	An example of how to setup your inputs using onChange. This is prefered.
*/
function updatePosition()
{
	PosX = parseInt(document.getElementById("toPosX").value);
	PosY = parseInt(document.getElementById("toPosY").value);
	RadZ = parseInt(document.getElementById("toRadius").value);
	
	// If there is anything other than numbers, use defaults.
	if(PosX == NaN)
		PosX = 500;
	if(PosY == NaN)
		PosY = 200;
	if(RadZ == NaN)
		RadZ = 10;
}

/*!
	An example of how to setup your inputs using onChange. This is prefered.
*/
function updateColor()
{
	red = parseInt(document.getElementById("toRed").value);
	green = parseInt(document.getElementById("toGreen").value);
	blue = parseInt(document.getElementById("toBlue").value);
	
	// If there is anything other than numbers, use defaults.
	if(red == NaN)
		red = 0;
	if(green == NaN)
		green = 0;
	if(blue == NaN)
		blue = 0;
}
