/*********************************************************
*	Name:		Danny Vargas
*	File:		homeSrc.js
*	Created:	March 22, 2010
*	Modified:	March 8, 2010
*	Dependency:	jsAnim.js
*	Notes:		
*		The new homepage! Very simple animation that spells out
*		(AlgorithmA); as a tree. Everything is spaced out evenly,
*		and so are the colors too, making for a rainbow effect.
*		This all using registered positions for a variable sized 
*		workarea
*	Functions:	
		Initialize		:	Initializes the workarea and Alma's position, starts animation, when done go to specified function
		Branch4R		:	The red color branch, when animation is done, displays its bubble.
		Branch5G		:	The green color branch...
		Branch5B		:	The blue color branch...
		RevealBubble	:	Util function that sets up a hidden element to be placed to its new registered position and is revealed.
************/

var manager = new jsAnimManager(20);

var WorkArea;

function Initialize()
{	// Initialize the animation, begin animation.
	RevealBubble(0, 60, "Alma");
	
	WorkArea = manager.createAnimObject("workarea");
	WorkArea.add({property: Prop.wait, duration: 1000});
	WorkArea.runall()
	WorkArea.add({property: Prop.lineRegistered, from: new Attrib(0,100,3,0,0,0), to: new Attrib(-175,182,3,255,0,0), duration: 1400, onComplete: function() { Branch4R();} });
	WorkArea.add({property: Prop.lineRegistered, from: new Attrib(0,100,3,0,0,0), to: new Attrib(0,182,3,0,255,0), duration: 2200, onComplete: function() { Branch5B();} });
	WorkArea.add({property: Prop.lineRegistered, from: new Attrib(0,100,3,0,0,0), to: new Attrib(175,182,3,0,0,255), duration: 1800, onComplete: function() { Branch5G();} });
}

function Branch4R()
{ // These are 58px apart in general. Colors are 85 each.
	RevealBubble(-175, 182, "R4");
	WorkArea.add({property: Prop.lineRegistered, from: new Attrib(-175,182,3,255,0,0), to: new Attrib(-318,264,3,255,0,170), duration: 1300, onComplete: function() { RevealBubble(-318,264, "R0"); }});
	WorkArea.add({property: Prop.lineRegistered, from: new Attrib(-175,182,3,255,0,0), to: new Attrib(-260,264,3,255,0,85), duration: 1400, onComplete: function() { RevealBubble(-260,264, "RA"); }});
	WorkArea.add({property: Prop.lineRegistered, from: new Attrib(-175,182,3,255,0,0), to: new Attrib(-202,264,3,255,85,0), duration: 1500, onComplete: function() { RevealBubble(-202,264, "Rl"); }});
	WorkArea.add({property: Prop.lineRegistered, from: new Attrib(-175,182,3,255,0,0), to: new Attrib(-144,264,3,255,170,0), duration: 1600, onComplete: function() { RevealBubble(-144,264, "Rg"); }});
}

function Branch5G()
{
	RevealBubble(0, 182, "G5");
	WorkArea.add({property: Prop.lineRegistered, from: new Attrib(0,182,3,0,255,0), to: new Attrib(-86,264,3,170,255,0), duration: 1300, onComplete: function() { RevealBubble(-86,264, "Go"); }});
	WorkArea.add({property: Prop.lineRegistered, from: new Attrib(0,182,3,0,255,0), to: new Attrib(-28,264,3,85,255,0), duration: 1400, onComplete: function() { RevealBubble(-28,264, "Gr"); }});
	WorkArea.add({property: Prop.lineRegistered, from: new Attrib(0,182,3,0,255,0), to: new Attrib(28,264,3,0,255,85), duration: 1500, onComplete: function() { RevealBubble(28,264, "Gi"); }});
	WorkArea.add({property: Prop.lineRegistered, from: new Attrib(0,182,3,0,255,0), to: new Attrib(86,264,3,0,255,170), duration: 1600, onComplete: function() { RevealBubble(86,264, "Gt"); }});
}

function Branch5B()
{
	RevealBubble(175, 182, "B5");
	WorkArea.add({property: Prop.lineRegistered, from: new Attrib(175,182,3,0,0,255), to: new Attrib(144,264,3,0,170,255), duration: 1300, onComplete: function() { RevealBubble(144,264, "Bh"); }});
	WorkArea.add({property: Prop.lineRegistered, from: new Attrib(175,182,3,0,0,255), to: new Attrib(202,264,3,0,85,255), duration: 1400, onComplete: function() { RevealBubble(202,264, "Bm"); }});
	WorkArea.add({property: Prop.lineRegistered, from: new Attrib(175,182,3,0,0,255), to: new Attrib(260,264,3,85,0,255), duration: 1500, onComplete: function() { RevealBubble(260,264, "BA"); }});
	WorkArea.add({property: Prop.lineRegistered, from: new Attrib(175,182,3,0,0,255), to: new Attrib(318,264,3,170,0,255), duration: 1600, onComplete: function() { RevealBubble(318,264, "B0"); }});
}

function RevealBubble(x, y, ID)
{	// Register the position and reveal it.
	var Bubble = document.getElementById(ID);
	manager.registerPosition(ID);
	Bubble.setPosition(x,y);
	Bubble.style.visibility = 'visible';
}
