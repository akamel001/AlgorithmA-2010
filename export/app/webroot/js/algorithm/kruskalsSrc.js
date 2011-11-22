/*******************************************************************************
* Name: Mark Mata and Roddy Nguyen
* File: kruskalSrc.js
* Project: {AlgorithmA}; 2010
* Date Created: March 14, 2010
* Date Modded: March 16, 2010
* Purpose:
* This javascript file runs all of the animations and also runs the algorithm
* that calculates the moves for the animation. 
* 
* Dependencies:
* This file is called by kruskalsView.html
* 
* Notes/Changelog:
* March 16, 2010 	- 	Added Comments to the code
* 
* Functions:
* Initialize()	-	function that runs as the page is loaded, will pre-run
* 			the algorithm and creates the list of moves for the
* 			algorithm to run
*
* LoadKruskal()	-	will run the algorithm and creates the list of moves for
* 			the algorithm to run
* 			
* Demo()	-	function that runs when the "Demo" button is pushed on
* 			the HTML page and steps through the aniumations
* 			automatically
* 			
* Forward() 	-	function that steps forward through the animation one
* 			step at a time as the "Forward" button is pushed in the
* 			HTML file
* 			
* Back() 	-	function that steps back through the animation one step
* 			at a time as the "back" button is pushed in the HTML
* 			file
* 			
* Highlight( variable )	-	function that highlights a line of psuedocode
* 				and a div box
*
* HighlightWhite( variable )	-	function that undoes a highlight of a
* 					div box
* 
* Undo() 	-	function that undoes all the higlights in the psuedocode
* 
* InitializeTimer() 	-	first of three function required to run the
* 				timer for the demo
* 				
* StopTheClock() 	-	second of three functions required to run the
* 				timer for the demo
* 				
* StartTheTimer() 	-	third of three functions required to run the
* 				timer for the demo
* 				
* Edge( ID, node1, node2, Length ) 	-	class that is used for finding
* 						the ID of the edge, the nodes
* 						associated with the edge, and
* 						the length of the edge.
* 						
* IsNotIn( value, inForest ) 	-	function used in the Edge class that
* 					checks to see if a node is in the
* 					forest and adds the node to the forest
* 					if it is not in there
* 					
* Node( ID, xPos, yPos )	-	class that contains information about
* 					the ID of the node as well as the
* 					position in which the node is in
* 				
* DrawEdge( node1, node2, color )	-	function that draws the edge in
* 						the color that is desired (black
* 						for normal, yellow for looking
* 						through the edges, green for an
* 						edge in the minimized tree and
* 						red for an edge not in the
* 						minimized tree)
* 					
* QuickSort( unsorted,strt,stp ) -	function that runs the comparison sort
* 					algorithm required before running the
* 					kruskal's function
* 					
* Check( unsorted,strt,stp ) 	-	function used by QuickSort to check if
* 					the array is sorted
* 					
* Kruskal( edges ) 	-	function that goes through the edges, after they
* 				have been sorted and creates the minimized tree
*******************************************************************************/  

// "Sugar" file that allows for easier creation of classes
Function.prototype.method = function ( name, func ) 
{
    this.prototype[name] = func;
    return this;
};

// GLOBAL VARIABLES ARE YOUR FRIEND!!!

// Global variables required by pbMan and jsAnim to run the animations
var manager = new jsAnimManager(12);
var playback = new pbManager();

// Global variables list of global variables used in running the
// algorithm/animation

// the forest array is the forest of nodes
var naForest=new Array;
// the node array is the array of nodes
var naNodes=new Array;
// array of original edges used to run part of the higlighting system
var naOriginalEdges=new Array;
// array filled with animation moves that demo, forward, anf back use
var naMoves=new Array;
// array of edges in the minimized forest
var naMinimizedForest=new Array;

// Global variables required for the demo animation
// counter required for stepping through the array of moves
var nAnimationCounter=0;
var nSecs;
var bTimerID = null;
var bTimerRunning = false;
// actual time for each step (in milliseconds)
var nDelay = 750;

/*******************************************************************************
* Initialize()	-	function that runs as the page is loaded
*******************************************************************************/
function Initialize()
{
	// Activate the buttons on load/reload
	document.getElementById("demo").disabled=false;
	document.getElementById("forward").disabled=false;
	document.getElementById("back").disabled=true;
	
	// Sets up your Concept and How-To buttons.
	document.getElementById("concept").onmouseover = function () {
		Tip("Kruskal's algorithm is an algorithm  in graph theory that finds a minimum spanning tree for a connected weighted graph. This means it finds a subset of the edges that forms a tree that includes every vertex, where the total weight of all the edges in the tree is minimized. If the graph is not connected, then it finds a minimum spanning forest (a minimum spanning tree for each connected component). Kruskal's algorithm is an example of a greedy algorithm.",WIDTH, 600, FONTFACE, 'Verdana, sans-serif', FONTSIZE, '12pt',FONTCOLOR, '#000000',PADDING, 8, SHADOW, true, SHADOWCOLOR, '#CCCCCC', FADEIN, 400, FADEOUT, 800,CENTERMOUSE, true, OFFSETX, 0 ,BGCOLOR, '#FFFFCC');
	}
	document.getElementById("howto").onmouseover = function() {
		Tip("<strong>Demo</strong> - Runs the demonstration for Kruskal's algorithm.<br /><br /><strong>Forward</strong> - Steps through Kruskal's algorithm one step at a time.<br /><br /><strong>Back</strong> - Steps backwards through the algorithm repeating the last step done before the button was pushed.<br /><br /><strong>Reset</strong> - Resets the Kruskal's algorithm page to the beginning.",WIDTH, 400, FONTFACE, 'Verdana, sans-serif', FONTSIZE, '11pt',FONTCOLOR, '#000000',PADDING, 8, SHADOW, true, SHADOWCOLOR, '#CCCCCC', FADEIN, 400, FADEOUT, 800,CENTERMOUSE, true, OFFSETX, 0 ,BGCOLOR, '#CEFFFF');
	}
	
	document.getElementById("ABin").disabled=false;
	document.getElementById("ADin").disabled=false;
	document.getElementById("BCin").disabled=false;
	document.getElementById("BEin").disabled=false;
	document.getElementById("CFin").disabled=false;
	document.getElementById("DEin").disabled=false;
	document.getElementById("EFin").disabled=false;
		
	// pre-run algorithm
	LoadKruskal();
}

function ChangeNumber(variable)
{
	sInner=variable+'in'
	nValue=document.getElementById(sInner).value*1
	if (nValue!=nValue+0)
	{
		alert('Bad Input');
		naMoves='reset';
		return;
	}
	else if (nValue<1)
	{
		alert('Bad Input');
		naMoves='reset';
		return;
	}
	else if (nValue>99)
	{
		alert('Bad Input');
		naMoves='reset';
		return;
	}
	else
	{
		document.getElementById(variable).innerHTML=nValue;
	}
}

/*******************************************************************************
* LoadKruskal()	-	will run the algorithm and creates the list of moves for
* 			the algorithm to run
*******************************************************************************/
function LoadKruskal()
{
	// everytime this runs, undo the global arrays
	naForest=new Array;
	naNodes=new Array;
	naOriginalEdges=new Array;
	naMoves=new Array;
	naMinimizedForest=new Array;
	
	naNodes.push(new Node('A', 125, 50), new Node('B', 290, 110),
		     new Node('C', 450, 50), new Node('D', 125, 280),
		     new Node('E', 290, 230), new Node('F', 450, 280));
	
	// push psuedo code highlights
	naMoves.push('psuedoCode1');
	naMoves.push('psuedoCode2');
	
	// create an array where all of the edges are saved
	var edge=new Array;
	edge.push(new Edge('AB', 'A', 'B', document.getElementById("ABin").value*1),
		  new Edge('AD', 'A', 'D', document.getElementById("ADin").value*1),
		  new Edge('BC', 'B', 'C', document.getElementById("BCin").value*1),
		  new Edge('BE', 'B', 'E', document.getElementById("BEin").value*1),
		  new Edge('CF', 'C', 'F', document.getElementById("CFin").value*1),
		  new Edge('DE', 'D', 'E', document.getElementById("DEin").value*1),
		  new Edge('EF', 'E', 'F', document.getElementById("EFin").value*1));
	
	for (k=0; k<edge.length; k++)
	{			
		edgeID=edge[k].id();
		edgeIDIn=edgeID+'in';
		nValue=document.getElementById(edgeIDIn).value*1;
		if (nValue!=nValue+0)
		{
			alert('Bad Input');
			naMoves='reset';
			return;
		}
		if (nValue<1)
		{
			alert('Bad Input');
			naMoves='reset';
			return;
		}
		if (nValue>99)
		{
			alert('Bad Input');
			naMoves='reset';
			return;
		}
		
		document.getElementById(edgeID).innerHTML=document.getElementById(edgeIDIn).value;
	}
	
	// save the array to "originalEdges" where all the processing will take
	// place
	naOriginalEdges=edge;
	naOriginalEdges=QuickSort(naOriginalEdges, 0, naOriginalEdges.length-1);
	
	// push psuedo code highlights
	naMoves.push('psuedoCode3');
	
	// run Kruskal's algorithm after pre-sorting
	Kruskal(naOriginalEdges);
	nMinimizedCount=0;
	naMoves.push('psuedoCode4');
	for (k=0; k<naOriginalEdges.length; k++)
	{
		// push psuedo code highlights
		naMoves.push('psuedoCode5');
		naMoves.push('psuedoCode6');
		naMoves.push('psuedoCode7');
		naMoves.push('psuedoCode8');
		color='red';
		if(naOriginalEdges[k].id()==naMinimizedForest[nMinimizedCount])
		{
			// push psuedo code highlights
			naMoves.push('psuedoCode9');
			naMoves.push('psuedoCode10');
			nMinimizedCount=nMinimizedCount+1;
			color='green';
		}
		node1=naOriginalEdges[k].node1();
		node2=naOriginalEdges[k].node2();
		naMoves.push([node1, node2, color]);
	}
	// push psuedo code highlights
	naMoves.push('psuedoCode11');
}

/*******************************************************************************
* Demo()	-	function that runs when the "Demo" button is pushed on
* 			the HTML page and steps through the aniumations
* 			automatically
*******************************************************************************/
function Demo()
{
	if (naMoves=='error')
	{
		return
	}
	if (nAnimationCounter==0)
	{
		document.getElementById("back").disabled=true;
		document.getElementById("forward").disabled=true;
		document.getElementById("ABin").disabled=true;
		document.getElementById("ADin").disabled=true;
		document.getElementById("BCin").disabled=true;
		document.getElementById("BEin").disabled=true;
		document.getElementById("CFin").disabled=true;
		document.getElementById("DEin").disabled=true;
		document.getElementById("EFin").disabled=true;
		LoadKruskal()
	}
	if (naMoves[nAnimationCounter].length==3)
	{
		HighlightGreen(naMoves[nAnimationCounter][0], naMoves[nAnimationCounter][1]);
		DrawEdge(naMoves[nAnimationCounter][0], naMoves[nAnimationCounter][1], naMoves[nAnimationCounter][2]);
		nDelay=2000;
	}
	else
	{
		Undo();
		Highlight(naMoves[nAnimationCounter]);
		if (naMoves[nAnimationCounter]=='psuedoCode5')
		{
			nDelay=750;
		}
	}
	nAnimationCounter=nAnimationCounter+1;
}

/*******************************************************************************
* Forward() 	-	function that steps forward through the animation one
* 			step at a time as the "Forward" button is pushed in the
* 			HTML file
*******************************************************************************/
function Forward()
{	
	if (nAnimationCounter>=naMoves.length)
	{
		nAnimationCounter=nAnimationCounter+1;
		document.getElementById("forward").disabled=true;
	}
	document.getElementById("back").disabled=false;
	document.getElementById("demo").disabled=true;
	if (naMoves=='error')
	{
		return
	}
	if (nAnimationCounter==0)
	{
		LoadKruskal()
		document.getElementById("ABin").disabled=true;
		document.getElementById("ADin").disabled=true;
		document.getElementById("BCin").disabled=true;
		document.getElementById("BEin").disabled=true;
		document.getElementById("CFin").disabled=true;
		document.getElementById("DEin").disabled=true;
		document.getElementById("EFin").disabled=true;
	}
	if (naMoves[nAnimationCounter].length==3)
	{
		HighlightGreen(naMoves[nAnimationCounter][0], naMoves[nAnimationCounter][1]);
		DrawEdge(naMoves[nAnimationCounter][0], naMoves[nAnimationCounter][1], naMoves[nAnimationCounter][2]);
		var sID=naMoves[nAnimationCounter][0]+naMoves[nAnimationCounter][1];
	}
	else
	{
		Undo();
		Highlight(naMoves[nAnimationCounter]);
	}
	nAnimationCounter=nAnimationCounter+1;
}

/*******************************************************************************
* Back() 	-	function that steps back through the animation one step
* 			at a time as the "back" button is pushed in the HTML
* 			file
*******************************************************************************/
function Back()
{
	document.getElementById("forward").disabled=false;
	if (nAnimationCounter==0)
	{
		LoadKruskal()
	}
	nAnimationCounter=nAnimationCounter-1;	
	if (nAnimationCounter<=0)
	{
		document.getElementById("back").disabled=true;
		nAnimationCounter==0;
	}
	if (naMoves[nAnimationCounter].length==3)
	{
		HighlightBlue(naMoves[nAnimationCounter][0], naMoves[nAnimationCounter][1]);
		DrawEdge(naMoves[nAnimationCounter][0], naMoves[nAnimationCounter][1], 'black');
		document.getElementById(sID).innerHTML=sID;
	}
	else if (naMoves[nAnimationCounter].length==2)
	{
		Highlight(naMoves[nAnimationCounter][0]);
		document.getElementById(naMoves[nAnimationCounter][0]).innerHTML=naMoves[nAnimationCounter][1]+1;

	}
	else
	{
		Undo();
		Highlight(naMoves[nAnimationCounter]);
	}
}

/*******************************************************************************
* HighlightBlue( variable1, variable 2 )	-	function that highlights
* 							two nodes and then
* 							removes the highlight 
*******************************************************************************/
function HighlightGreen( variable1, variable2 )
{
	// jsAnim manager
	var anim1 = manager.createAnimObject(variable1);
	var anim2 = manager.createAnimObject(variable2);
	anim1.add({property: Prop.backgroundColor, to: new Col(255,255,0), duration:300});
	anim2.add({property: Prop.backgroundColor, to: new Col(255,255,0), duration:300});
	anim1.add({property: Prop.backgroundColor, to: new Col(50,205,50), duration:300});
	anim2.add({property: Prop.backgroundColor, to: new Col(50,205,50), duration:300});
}

/*******************************************************************************
* HighlightGreen( variable1, variable 2 )	-	function that highlights
* 							two nodes and then
* 							removes the highlight 
*******************************************************************************/
function HighlightBlue( variable1, variable2 )
{
	// jsAnim manager
	var anim1 = manager.createAnimObject(variable1);
	var anim2 = manager.createAnimObject(variable2);
	anim1.add({property: Prop.backgroundColor, to: new Col(255,255,0), duration:300});
	anim2.add({property: Prop.backgroundColor, to: new Col(50,205,50), duration:300});
	anim1.add({property: Prop.backgroundColor, to: new Col(0,0,224), duration:300});
	anim2.add({property: Prop.backgroundColor, to: new Col(0,0,224), duration:300});
}

/*******************************************************************************
* Highlight( variable )	-	function that highlights a line of psuedocode
* 				and a div box
*******************************************************************************/
function Highlight(variable)
{
	// jsAnim manager
	var anim = manager.createAnimObject(variable);  
	anim.add({property: Prop.backgroundColor, to: new Col(255,255,0), duration:200});
	anim.sequential();
}

/*******************************************************************************
* HighlightWhite( variable )	-	function that undoes a highlight of a
* 					div box
* ******************************************************************************/
function HighlightWhite(variable)
{
	// jsAnim manager
	var anim = manager.createAnimObject(variable);  
	anim.add({property: Prop.backgroundColor, to: new Col(255,255,255), duration:200});
	anim.sequential();
}

/*******************************************************************************
* Undo() 	-	function that undoes all the higlights in the psuedocode
*******************************************************************************/
function Undo()
{
    for (i=1; i<=11; i++)
    {
        variable='psuedoCode'+i; 
        var anim = manager.createAnimObject(variable); 
        anim.add({property: Prop.backgroundColor, to: new Col(255,255,255), duration:0});
    }
}

/*******************************************************************************
* InitializeTimer() 	-	first of three function required to run the
* 				timer for the demo
*******************************************************************************/
function InitializeTimer()
{
	if (naMoves=='error')
	{
		return
	}
	// Set the length of the timer, in seconds
	nSecs = 1;
	StopTheClock();
	StartTheTimer();
}

/*******************************************************************************
* StopTheClock() 	-	second of three functions required to run the
* 				timer for the demo
*******************************************************************************/
function StopTheClock()
{
	if (naMoves=='error')
	{
		return
	}
	if(bTimerRunning)
	{
		clearTimeout(bTimerID);
	}
	bTimerRunning = false;
}

/*******************************************************************************
* StartTheTimer() 	-	third of three functions required to run the
* 				timer for the demo
*******************************************************************************/
function StartTheTimer()
{
	if (naMoves=='error')
	{
		return
	}
	if (nSecs==0)
	{
		StopTheClock();
		Demo();
		InitializeTimer();
	}
	else
	{
		self.status = nSecs;
		nSecs = nSecs - 1;
		bTimerRunning = true;
		bTimerID = self.setTimeout("StartTheTimer()", nDelay);
	}
}

/*******************************************************************************
* Edge( ID, node1, node2, Length ) 	-	class that is used for finding
* 						the ID of the edge, the nodes
* 						associated with the edge, and
* 						the length of the edge.
* {
* 	string sID
* 	string sNode1
* 	string sNode2
* 	int nLength
* 	value()
* 	node1()
* 	node2()
* 	id()
* }
*******************************************************************************/
function Edge( sID, sNode1, sNode2, nLength )
{
	this.Create(sID, sNode1, sNode2, nLength)
}
	// create the edge
	Edge.method('Create', function(sID, sNode1, sNode2, nLength)
	{
		this.sEdgeID=sID;
		naOriginalEdges.push(sID);
		this.sEdgeNode1=sNode1;
		this.sEdgeNode2=sNode2;
		DrawEdge(this.sEdgeNode1, this.sEdgeNode2, 'black')
		if (IsNotIn(sNode1, naForest))
		{
			naForest.push([sNode1]);
		}
		if (IsNotIn(sNode2, naForest))
		{
			naForest.push([sNode2]);
		}
		this.nEdgeLength=nLength;
		return;
	});
	// get the value of the length of the edge
	Edge.method('value', function()
	{
		return this.nEdgeLength;
	});
	// get the id of the first node
	Edge.method('node1', function()
	{
		return this.sEdgeNode1;
	});
	// get the id of the second node
	Edge.method('node2', function()
	{
		return this.sEdgeNode2;
	});
	// get the id of the node
	Edge.method('id', function()
	{
		return this.sEdgeID;
	});

/*******************************************************************************
* IsNotIn(value, inForest) 	-	function used in the Edge class that
* 					checks to see if a node is in the
* 					forest and adds the node to the forest
* 					if it is not in there
*******************************************************************************/	
function IsNotIn(value, inForest)
{
	for (i=0; i<inForest.length; i++)
	{
		for (j=0; j<inForest[i].length; j++)
		{
			if (value==inForest[i][j])
			{
				return false;
			}
		}
	}
	return true;
}

/*******************************************************************************
* Node(ID, nXPos, nYPos) 	-	class that contains information about
* 					the ID of the node as well as the
* 					position in which the node is in
* {
* 	string ID
* 	int nXPos
* 	int nYPos
* 	id()
* 	xPos()
* 	yPos()
* }
*******************************************************************************/
function Node(ID, nXPos, nYPos)
{
	this.create(ID, nXPos, nYPos);
}
	// create the node
	Node.method('create', function(ID, nXPos, nYPos)
	{
		this.nodeID=ID;
		this.nNodeXPos=nXPos;
		this.nNodeYPos=nYPos;
		return;
	});
	// get the id of the node
	Node.method('id', function()
	{
		return this.nodeID;
	});
	// get the x position of the node
	Node.method('xPos', function()
	{
		return this.nNodeXPos;
	});
	// get the yposition of the node
	Node.method('yPos', function()
	{
		return this.nNodeYPos;
	});

/*******************************************************************************
* DrawEdge(node1, node2, color)	-	function that draws the edge in the
* 					color that is desired (black for normal,
* 					yellow for looking through the edges,
* 					green for an edge in the minimized tree
* 					and red for an edge not in the minimized
* 					tree)
*******************************************************************************/
function DrawEdge(node1, node2, color)
{
	// grab the node addresses
	for (i=0; i<naNodes.length; i++)
	{
		if (node1==naNodes[i].id())
		{
			nNode1XPos=naNodes[i].xPos()+20;
			nNode1YPos=naNodes[i].yPos()+20;
		}
		if (node2==naNodes[i].id())
		{
			nNode2XPos=naNodes[i].xPos()+20;
			nNode2YPos=naNodes[i].yPos()+20;
		}
	}
	// manager for jsAnim
	var anim = manager.createAnimObject("workarea");
	// draw the lines based on color
	if (color=='black')
	{
		anim.add({property: Prop.line, from: new Attrib(nNode1XPos,nNode1YPos,4,0,0,0), to: new Attrib(nNode2XPos,nNode2YPos,4,0,0,0), duration: 1000});
	}
	if (color=='green')
	{
		anim.add({property: Prop.line, from: new Attrib(nNode1XPos,nNode1YPos,4,50,205,50), to: new Attrib(nNode2XPos,nNode2YPos,4,50,205,50), duration: 1000});
	}
	if (color=='red')
	{
		anim.add({property: Prop.line, from: new Attrib(nNode1XPos,nNode1YPos,4,184,34,34), to: new Attrib(nNode2XPos,nNode2YPos,4,184,34,34), duration: 1000});
	}
}

/*******************************************************************************
* QuickSort(unsorted,strt,stp) -	function that runs the comparison sort
* 					algorithm required before running the
* 					kruskal's function
*******************************************************************************/
function QuickSort(unsorted,strt,stp)
{	
	if (Check(unsorted,strt,stp)==true)
	{
		return unsorted;
	}
	
	var pivot=unsorted[strt].value();
	var ppnt=strt+1
	
	for (look=ppnt; look<=stp; look++)
	{
	    if (unsorted[look].value()<=pivot)
	    {
		var temp=unsorted[look];
		unsorted[look]=unsorted[ppnt];
		unsorted[ppnt]=temp;
		ppnt++;
	    }
	}
	
	var temp=unsorted[strt];
	unsorted[strt]=unsorted[ppnt-1];
	unsorted[ppnt-1]=temp;
	
	QuickSort(unsorted,strt,ppnt-2);            
	QuickSort(unsorted,ppnt,stp);
	
	return unsorted
}

/*******************************************************************************
* Check(unsorted,strt,stp) 	-	function used by QuickSort to check if
* 					the array is sorted
*******************************************************************************/
function Check(unsorted,strt,stp)
{	
	for (i=strt+1; i<=stp; i++)
	{
		if (unsorted[i].value()<unsorted[i-1].value())
		{
			return false;
		}                
	}
	
	return true;
}

/*******************************************************************************
* Kruskal(edges) 	-	function that goes through the edges, after they
* 				have been sorted and creates the minimized tree
*******************************************************************************/
function Kruskal(edges)
{
	// run through all the edges in order
	for (i=0; i<edges.length; i++)
	{
		// save the nodes
		node1=edges[i].node1();
		node2=edges[i].node2();
		// addresses used for merging
		node1Address=0;
		node2Address=0;
		var tempForest=new Array
		// for each edge, look though the forest of nodes
		for (j=0; j<naForest.length; j++)
		{
			node1Present=false;
			node2Present=false;
			for (k=0; k<naForest[j].length; k++)
			{
				if (node1==naForest[j][k])
				{
					node1Present=true;
					node1Address=j;
				}
				if (node2==naForest[j][k])
				{
					node2Present=true;
					node2Address=j;
				}
				// if both nodes are not in a forest, push the
				// forest into tempForest
				if (node1Present==false)
				{
					if (node2Present==false)
					{
						if (tempForest.length==0)
						{
							tempForest.push(naForest[j]);
						}
						// check to see  if forest is
						// already in there and do not
						// clone it
						if (tempForest[tempForest.length-1] != naForest[j])
						{
							tempForest.push(naForest[j]);
						}	
					}
				}
				// if both nodes are in the forest, push the
				// forest into tempForest
				if (node1Present==true)
				{
					if (node2Present==true)
					{
						if (tempForest.length==0)
						{
							tempForest.push(naForest[j]);
						}
						if (tempForest[tempForest.length-1] != naForest[j])
						{
							tempForest.push(naForest[j]);
						}
					}
				}
				// if only one node is present in the forest,
				// save the address for merging
				if (node1Present==true)
				{
					if (node2Present==false)
					{
						node1Address=j;
					}
				}
				// if only one node is present in the forest,
				// save the address for merging
				if (node2Present==true)
				{
					if (node1Present==false)
					{
						node2Address=j;
					}
				}
			}			
		}
		// if the addresses are not the same, merge the two forests and
		// push into tempForest
		if (node1Address != node2Address)
		{
			naMinimizedForest.push(edges[i].id());
			var temp=new Array;
			temp=temp.concat(naForest[node1Address], naForest[node2Address]);
			tempForest.push(temp);
		}
		// save the tempForest into forest
		naForest=tempForest;
	}
}