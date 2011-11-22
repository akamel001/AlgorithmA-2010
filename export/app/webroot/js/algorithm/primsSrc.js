/*********************************************************
*	Name:		Evan Plett
*	File:		primsSrc.js
*	Created:	March 9, 2010
*	Modified:	March 9, 2010
*				March 12, 2010
*					Evan Plett: Added forward, backward, and play capability.
*								Added dynamic div creation
*				March 13, 2010
*					Evan Plett: Added custom graph capability.
*
*				March 14, 2010
*					Evan Plett: Added pseudocode highlighting
*					
*	Dependency:	jsAnim.js, pbMan.js
*	Notes:		
*		This is the animation for Prims Minumum Spanning Tree
*	Changelog:
*
*	Functions:	
*		CreateNode( nId, nPosX, nPosy )					:	Creates a node, adds it to the array, and moves the div
*		CreateLine( nNode1Index, nNode2Index, nWeight )	:	Creates a Line and then draws it
*		PlayDemo()										:	Plays a demo of the algorithm
*		RunAlgorithm()									:	Runs Prims algorithm
*		DrawLine( nLineIndex )							:	Draws a Line
*		FindLeastWeight()								:	Find the highlighted line with the least weight and highlights it
*		AddToTree( nLineIndex )							:	Adds a Line to the tree and changes colors of Line and Nodes
*		HighlightLines									:	Highlights lines
*		UnHighlightLines()								:	Unhighlights all highlighted lines and determines if it should be ignored
*		clearHighlightedLines()							:	Clears the Highlighted Lines Array
*		SelectHighlightedLines()						:	Determines which lines should be highlighted
*		Forward()										:	Steps the animation forward
*		Backward()										:	Steps the animation backward
*		Play()											:	Plays the animation
*		Run()											:	Runs through the animation
*		ChangeImage( nodeId )							:	Changes the image of a node
*		PseudoHighlight( nPseudoId )					:	Highlights pseudo code
*		ActivateCustom()								:	Aactivates custom graph mode
*		CustomDone()									:	Reenables buttons when done creating graph
*		AddNode()										:	Allows the user to add a node
*		AddEdge()										:	Allows the user to add an edge
*		PlaceEdge( nodeId )								:	Places an edge between the two nodes the user clicked on
*		PlaceNode( event )								:	Places a node where the user clicked
*		GetMouseCoords( event )							:	Gets the coordinates of the mouse
*		ChangeLine( nLineIndex, nRed, nGreen, nBlue, nStartingNode, nLineProgress )	
*														:	Changes the color of an existing line.  Is called by DrawLine.
*		CreateWeight( nNode1Index, nNode2Index, nWeight, nNewLineIndex )
*														:	Creates and places a div to display the weight of a line				
***********************************************************/

//These constants are used for determining the type of animation each animation in the array is.
const ADD_TO_TREE = 0;
const HIGHLIGHT_LINES = 1;
const SELECT_LINE = 2;
const UNHIGHLIGHT_LINES = 3;

var bIsCalculated = false;
var bIsPlaying = false;

//This array holds instructions for all of the animations
var oaAnimations = new Array();
var nAnimationIterator = 0;

//These are for the animations
var manager = new jsAnimManager(10);
var playback = new pbManager();

//These global variables hold all of the nodes and lines	
var oaAllNodes = new Array();
var oaAllLines = new Array();

//These variables hold the index numbers (relative to oaAllNodes and oaAllLines)
//of the nodes that are in the tree and the lines that are to be highlighted
var naTreeNodes = new Array();
var naHighlightedLines = new Array();

//These variables hold the mouse x and y locations.
var nMousex;
var nMouseY;

//These variables are used for custom graph creation
var bIsWaitingForNode = false;
var bIsWaitingForEdge = false;
var bIsFirstNodeChosen = false;
var nFirstNode;
var bIsCustom = false;


/*! 	THIS FUNCTION MUST BE INCLUDED
	
	This function initializes all buttons on the template to whatever you need.
	Each button is appended to the end of the inner html of the object. 

*/
function Initialize()
{
	// Set initial values of input boxes. This is so that reloading the screen doesn't break it.
	
	PlayDemo();
	setTimeout( "RunAlgorithm()", 20 );
	
	/* REQUIRED */
	// Sets up your Concept and How-To buttons.
	document.getElementById("concept").onmouseover = function () {
		Tip("In Computer Science, Prim's algorithm is an algorithm that finds a minimum spanning tree for a connected weighted undirected graph. This means, it finds a subset of the edges that forms a tree that includes every vertex, where the total weight of all the edges in the tree is minimized. Prim's algorithm is an example of a greedy algorithm.",WIDTH, 400, FONTFACE, 'Verdana, sans-serif', FONTSIZE, '12pt',FONTCOLOR, '#000000',PADDING, 8, SHADOW, true, SHADOWCOLOR, '#CCCCCC', FADEIN, 400, FADEOUT, 800,CENTERMOUSE, true, OFFSETX, 0 ,BGCOLOR, '#FFFFCC');
	}
	document.getElementById("howto").onmouseover = function() {
		Tip("<strong>Play/Pause</strong> - Plays/Pauses the animation<br />" +
		"<br /><strong>Forward</strong> - Steps the animation forward.<br />" +
		"<br /><strong>Back</strong> - Steps the animation backward.<br />" +
		"<br /><strong>Reset</strong> - Refreshes the page.<br />"
		/*"<br /><strong>Custom</strong> - Enables creating a custom graph.<br />" +
		"<ul><br /><strong>Add Node</strong> - After clicking this button, a node can be added by clicking on the workarea.<br />" +
		"<br /><strong>Add Line</strong> - After clicking this button, a line can be created by clicking on two seperate nodes.<br />" +
		"<br /><strong>Done</strong> - Exits custom mode.<br /></ul>" +
		"<br /><strong>Demo</strong> - Creates a pre-built graph.<br />" */
		
		,WIDTH, 400, FONTFACE, 'Verdana, sans-serif', FONTSIZE, '11pt',FONTCOLOR, '#000000',PADDING, 8, SHADOW, true, SHADOWCOLOR, '#CCCCCC', FADEIN, 400, FADEOUT, 800,CENTERMOUSE, true, OFFSETX, 0 ,BGCOLOR, '#CEFFFF');
	}
}



//These functions and classes create the graph


Function.prototype.method = function ( name, func ) 
{
    this.prototype[name] = func;
    return this;
};


/**********************************************************
*	Node
*	{
*		String sId
*		int nPosX
*		int nPosy
*		int nIndex
*		int bInTree
*		int naConnectedEdges
*		create(String NodeId, int PosX, int PosY, int Index)
*		int getId()
*		int getPosx()
*		int getPosy()
*		int getIndex()
*		int[] getConnectedEdges()
*		bool isInTree()
*		setPosx(int PosX)
*		setPosy(int PosY)
*		setInTree()
*		addConnectedEdge(int EdgeIndex)
*	}
**********************************************************/

function Node( sNodeId, nNodePosX, nNodePosY, nNodeIndex )
{
    this.Create( sNodeId, nNodePosX, nNodePosY, nNodeIndex );
}

    Node.method( 'Create', function ( sNodeId, nNodePosX, nNodePosY, nNodeIndex )
    {
        this.sId = sNodeId;
		this.nPosX = nNodePosX;
		this.nPosY = nNodePosY;
		this.nIndex = nNodeIndex;
		this.bInTree = false;
		this.naConnectedEdges = new Array();
    });

    Node.method( 'getId', function ()
    {
        return this.sId;	
    });
	
	
	Node.method( 'getPosX', function ()
    {
        return this.nPosX;	
    });
	
	Node.method( 'setPosX', function (nNodePosX)
    {
        this.nPosX = nNodePosX;	
    });
	
	Node.method( 'getPosY', function ()
    {
        return this.nPosY;	
    });
	
	Node.method( 'setPosY', function (nNodePosY)
    {
        this.nPosY = nNodePosY;	
    });
	
	Node.method( 'getIndex', function ()
    {
        return this.nIndex;	
    });
		
	Node.method( 'getConnectedEdges', function ()
    {
        return this.naConnectedEdges;	
    });
	
	Node.method( 'addConnectedEdge', function (nEdgeIndex)
    {
        this.naConnectedEdges.push(nEdgeIndex);	
    });
	
	Node.method( 'isInTree', function ()
    {
        return this.bInTree;	
        return this.bInTree;	
    });
	
	Node.method( 'setInTree', function ()
    {
        this.bInTree = true;	
    });


/**********************************************************
*	Line
*	{
*		int nNode1Index	
*		int nNode2Index
*		bool bInTree
*		bool bIgnored
*		int nLineWeight
*		create()
*		int getNode1Index()
*		int getNode2Index()
*		int getWeight()
*		int getHistoryIndex()
*		bool isInTree()
*		bool isIgnored()
*		setInTree()
*		setIgnored()
*		setHistoryIndex( int )
*	}
**********************************************************/
	
function Line( nFirstNodeIndex, nSecondNodeIndex , nLineWeight, nHistroyIndex )
{
    this.Create( nFirstNodeIndex, nSecondNodeIndex , nLineWeight, nHistroyIndex );
}

    Line.method( 'Create', function ( nFirstNodeIndex, nSecondNodeIndex , nLineWeight, nHistoryIndex)
    {
		this.nNode1Index = nFirstNodeIndex;
		this.nNode2Index = nSecondNodeIndex;
		this.bInTree = false;
		this.bIgnored = false;
		this.nWeight = nLineWeight;
		this.nHistroyIndex = nHistoryIndex;
		this.bIsLineDrawn = false;
    });
	
	Line.method( 'getNode1Index', function ()
    {
		return this.nNode1Index;
    });
	
	Line.method( 'getNode2Index', function ()
    {
		return this.nNode2Index;
    });
	
	Line.method( 'getWeight', function ()
    {
		return this.nWeight;
    });
	
	Line.method( 'getHistoryIndex', function ()
    {
		return this.nHistroyIndex;
    });
	
	Line.method( 'getIsLineDrawn', function ()
    {
		return this.bIsLineDrawn;
    });

	Line.method( 'isInTree', function ()
    {
		return this.bInTree;
    });
	
	Line.method( 'isIgnored', function ()
    {
		return this.bIgnored;
    });

	Line.method( 'setInTree', function ()
    {
		this.bInTree = true;
    });
	
	Line.method( 'setIgnored', function ()
    {
		this.bIgnored = true;
    });
	
	Line.method( 'setIsLineDrawn', function ()
    {
		this.bIsLineDrawn = true;
    });

	
/**********************************************************
*	The following functions create nodes and lines as well
*	as drawing lines.
*
*	CreateNode( sId, nPosX, nPosY )
*		Description
*			This function creates a node object and links
*			it with a div with an img inside of it that are
*			in the "workarea". The div is used to control the 
*			location of the node, whereas the img controls the 
*			picture that is used to represent the node.
*		Parameters
*			sId: what the id of the node will be.
*			nPosX: the x coordinate.
*			nPosY: the y coordinate.
*	
*	CreateLine( nNode1Index, nNode2Index, nWeight )
*		Description
*			This function creates a line object and then
*			calls DrawLine() to draw the line and CreateWeight()
*			to display the weight
*		Parameters
*			nNode1Index: the index (relative to oaAllNodes) of one of
*						 the nodes that the line is connected to.
*			nNode2Index: the index (relative to oaAllNodes) of the 
*						 other node that the line is connected to.
*			nWeight: the weight of the line.
*
*	CreateWeight( nNode1Index, nNode2Index, nWeight, nNewLineIndex )
*		Description
*			This function creates a div and displays the weight of the
*			line in it.
*		Parameters
*			nNode1Index: the index (relative to oaAllNodes) of one of
*						 the nodes that the line is connected to.
*			nNode2Index: the index (relative to oaAllNodes) of the 
*						 other node that the line is connected to.
*			nWeight: the weight of the line.
*			nNewLineIndex: the index of the line that the weight is to
*						   be attached to.
*
*	DrawLine( nLineIndex, nRed, nGreen, nBlue, nStartingNode)
*		Description
*			This function draws a line from the starting node index that 
*			was passed to it in the color that was passed to it
*		Parameters
*			nLineIndex: the index (relative to oaAllLines) of the line
*						that is to be drawn.
*			nRed, nGree, nBlue: the RGB color format of the color that
*								that the line is to be drawn in. Values	
*								can range from 0 to 255.
*			nStartingNode: the node that the line drawing should start from ( 1 or 2).
*
*	ChangeLine( nLineIndex, nRed, nGreen, nBlue, nStartingNode, nLineProgress )
*		Description
*			This function changes the color of a line that has already been drawn
*		Parameters
*			nLineIndex: the index (relative to oaAllLines) of the line
*						that is to be drawn.
*			nRed, nGree, nBlue: the RGB color format of the color that
*								that the line is to be drawn in. Values	
*								can range from 0 to 255.
*			nStartingNode: the node that the line drawing should start from ( 1 or 2).
*			nLineProgress: a counter allowing this function to step through all
*						   of the divs that make up the line.
**********************************************************/

function CreateNode( nPosX, nPosY )
{
	var nArrayLength = oaAllNodes.length;
	
	var sNewNodeId = "Node" + nArrayLength;
	var sNodeImageId = "imgNode" + nArrayLength;
	oaAllNodes.push( new Node( sNewNodeId, nPosX, nPosY, nArrayLength ) );
	
	var oNewDiv = document.createElement( "div" );
	oNewDiv.setAttribute( "id", sNewNodeId );
	oNewDiv.setAttribute( "class", "node" );
	oNewDiv.setAttribute( "onclick", "PlaceEdge(" + nArrayLength + ")" );
	oNewDiv.style.position = "absolute";
	setPosition2( oNewDiv, (nPosX - 8), (nPosY - 8) );//the -8s are to center the image.
	oNewDiv.style.backgroundImage = "url(/algo/images/algorithm/prims/node.png)";
	
	document.getElementById( "workarea" ).appendChild( oNewDiv );
}

function CreateLine( nNode1Index, nNode2Index, nWeight )
{
	var nNewLineIndex = oaAllLines.length;
	oaAllLines.push( new Line( nNode1Index, nNode2Index, nWeight, lineIndex + 1 ) );//lineIndex is from jsAnim
	oaAllNodes[nNode1Index].addConnectedEdge( nNewLineIndex );
	oaAllNodes[nNode2Index].addConnectedEdge( nNewLineIndex );
	DrawLine( nNewLineIndex, 0, 0, 0, 1 );
	
	CreateWeight( nNode1Index, nNode2Index, nWeight, nNewLineIndex );
}

function CreateWeight( nNode1Index, nNode2Index, nWeight, nNewLineIndex )
{
	var nDiffX = oaAllNodes[nNode1Index].getPosX() - oaAllNodes[nNode2Index].getPosX();
	var nDiffY = oaAllNodes[nNode1Index].getPosY() - oaAllNodes[nNode2Index].getPosY();
	
	var nAngle = Math.atan( nDiffX/nDiffY );
	var nTanAngle = Math.PI - (4/Math.PI) - nAngle;
	
	var nShiftX = Math.sin(nTanAngle) * 14;
	var nShiftY = Math.cos(nTanAngle) * 14 ;
	
	var sLineWeightId = "lineWeight" + nNewLineIndex;
	var oNewDiv = document.createElement( "div" );
	oNewDiv.setAttribute( "id", sLineWeightId );
	oNewDiv.setAttribute( "class", "lineWeight" );
	oNewDiv.style.position = "absolute";
	oNewDiv.innerHTML = + nWeight;	
	var nX = ((oaAllNodes[nNode1Index].getPosX() + oaAllNodes[nNode2Index].getPosX()) / 2) + nShiftX - 9;
	var nY = ((oaAllNodes[nNode1Index].getPosY() + oaAllNodes[nNode2Index].getPosY()) / 2) - nShiftY - 9;		
	
	setPosition2( oNewDiv, nX, nY );
	document.getElementById( "workarea" ).appendChild( oNewDiv );
}

function DrawLine( nLineIndex, nRed, nGreen, nBlue, nStartingNode)
{	
	if ( !oaAllLines[nLineIndex].getIsLineDrawn() )
		{
		var nNode1Index = oaAllLines[nLineIndex].getNode1Index();
		var nNode2Index = oaAllLines[nLineIndex].getNode2Index();	
		var anim = manager.createAnimObject( "workarea" );

		if ( nStartingNode == 1 )
		{
			var nX1 = oaAllNodes[nNode1Index].getPosX();
			var nY1 = oaAllNodes[nNode1Index].getPosY();
			var nX2 = oaAllNodes[nNode2Index].getPosX();
			var nY2 = oaAllNodes[nNode2Index].getPosY();
		}
		else
		{
			var nX1 = oaAllNodes[nNode2Index].getPosX();
			var nY1 = oaAllNodes[nNode2Index].getPosY();
			var nX2 = oaAllNodes[nNode1Index].getPosX();
			var nY2 = oaAllNodes[nNode1Index].getPosY();	
		}
		anim.add( {property: Prop.line, from: new Attrib(nX1,nY1,3,nRed,nGreen,nBlue), to: new Attrib(nX2,nY2,3,nRed,nGreen,nBlue), duration: 1000} );
		oaAllLines[nLineIndex].setIsLineDrawn();
	}
	else
	{
		if (nStartingNode == 1)
			ChangeLine( nLineIndex, nRed, nGreen, nBlue, nStartingNode, 0 );
		else
			ChangeLine( nLineIndex, nRed, nGreen, nBlue, nStartingNode, lineHistory[oaAllLines[nLineIndex].getHistoryIndex()].length - 1 );
	}
}

function ChangeLine( nLineIndex, nRed, nGreen, nBlue, nStartingNode, nLineProgress )
{
	if (nStartingNode == 1)
	{
		if ( nLineProgress == lineHistory[oaAllLines[nLineIndex].getHistoryIndex()].length - 1 )
			return
		
		document.getElementById(lineHistory[oaAllLines[nLineIndex].getHistoryIndex()][nLineProgress]).style.backgroundColor = "rgb(" + nRed + ", " + nGreen +", " + nBlue + ")";
		nLineProgress++;
		setTimeout( "ChangeLine( " + nLineIndex + ", " + nRed + ", " + nGreen + ", " + nBlue + ", " + nStartingNode + ", " + nLineProgress + ")", manager.timestep );
	}
	else
	{
		if ( nLineProgress < 0 )
			return
		
		document.getElementById(lineHistory[oaAllLines[nLineIndex].getHistoryIndex()][nLineProgress]).style.backgroundColor = "rgb(" + nRed + ", " + nGreen +", " + nBlue + ")";
		nLineProgress--;
		setTimeout( "ChangeLine( " + nLineIndex + ", " + nRed + ", " + nGreen + ", " + nBlue + ", " + nStartingNode + ", " + nLineProgress + ")", manager.timestep );
	}
}
	

/**********************************************************
*	The following functions calculate the tree that is to be
*	built and add the information needed to oaAnimations so
*	that the process can be animated.
*	
*	RunAlgorithm()
*		Description
*			This is the main function for using the algorithm
*			to create the tree.  It is run once at the begining
*			of the animation.
*	
*	SelectHighlightedLines()
*		Description
*			This function determines which lines need to be highlighted
*			to show that they are being considered for being added to the 
*			tree and then pushes them onto the naHighlightedLines array.
*	
*	HighlightLines()
*		Description
*			This function highlights the lines in naHighlightedLines and
*			makes sure that the starting position for the drawing of the
*			line is a node connected to the tree.
*	
*	FindLeastWeight()
*		Description
*			This function determines which of the lines in naHighlightedLnes
*			has the lightest weight, highlights the line to indicate such,
*			and returns the index of this line.
*		Return Value
*			nLightestLine: the index (relative to oaAllLines) of the line
*							with the lightest weight.	
*	
*	AddToTree( nLineIndex )
*		Description
*			This function adds a line, and the node that is not already
*			in the tree, to the tree and changes their colors to indicate
*			such.
*		Parameters
*			nLineIndex: the index (relative to oaAllLines) of the line
*						that is to be added to the tree.
*		
*	UnHighlightLines()
*		Description
*			This function unhighlights the lines in the naHighlightedLines
*			array and clears the array.  It also determins if any lines 
*			need to be ignored, and if they do, it marks them as such
*			and changes their color to indicate such.
**********************************************************/

function RunAlgorithm()
{
	if ( bIsCalculated )
		return;
	
	var nStartingVertex = Math.floor( Math.random() * oaAllNodes.length );
	naTreeNodes.push( nStartingVertex );
	
	oaAllNodes[nStartingVertex].setInTree();
	document.getElementById( oaAllNodes[nStartingVertex].getId() ).style.backgroundImage = "url(/algo/images/algorithm/prims/nodeInTree.png)";
	while( naTreeNodes.length < oaAllNodes.length )
	{
		SelectHighlightedLines();
		HighlightLines();
		AddToTree( FindLeastWeight() );
		UnHighlightLines();
	}
	bIsCalculated = true;
}

function SelectHighlightedLines()
{
	for ( i = 0; i < naTreeNodes.length; i++ )
	{
		for ( j = 0; j < oaAllNodes[naTreeNodes[i]].naConnectedEdges.length; j++ )
		{
			if ( !oaAllLines[oaAllNodes[naTreeNodes[i]].naConnectedEdges[j]].isInTree() )  
			{
				if ( !oaAllLines[oaAllNodes[naTreeNodes[i]].naConnectedEdges[j]].isIgnored() )
				{
					naHighlightedLines.push( oaAllNodes[naTreeNodes[i]].naConnectedEdges[j] );
				}
			}
		}
	}
}

function HighlightLines()
{
	var naStartingNodes = new Array();
	
	for ( i = 0; i < naHighlightedLines.length; i++ )
	{
		if ( oaAllNodes[oaAllLines[naHighlightedLines[i]].getNode2Index()].isInTree() )
			naStartingNodes.push( 2 );
		else
			naStartingNodes.push( 1 );
	}
	oaAnimations.push( {type : HIGHLIGHT_LINES, lines : naHighlightedLines.toString(), nodes : naStartingNodes.toString()} );
}

function FindLeastWeight()
{
	var nLightestLine = naHighlightedLines[0];
	var nStartingNode;
	
	for ( i = 1; i < naHighlightedLines.length; i++ )
	{
		if ( oaAllLines[naHighlightedLines[i]].getWeight() < oaAllLines[nLightestLine].getWeight() )
		{
			nLightestLine = naHighlightedLines[i];
		}
	}
	if ( oaAllNodes[oaAllLines[nLightestLine].getNode2Index()].isInTree() )
		nStartingNode = 2;
	else
		nStartingNode = 1;
	
	oaAnimations.push( {type : SELECT_LINE, line: nLightestLine, node : nStartingNode} );
	
	return nLightestLine;
}

function AddToTree( nLineIndex )
{
	var nAddedNode = 0;
	if ( !oaAllNodes[oaAllLines[nLineIndex].getNode1Index()].isInTree() )
	{
		nAddedNode = 1;
		oaAllNodes[oaAllLines[nLineIndex].getNode1Index()].setInTree();
		naTreeNodes.push( oaAllLines[nLineIndex].getNode1Index() );
	}
	else
	{
		nAddedNode = 2;
		oaAllNodes[oaAllLines[nLineIndex].getNode2Index()].setInTree();
		naTreeNodes.push( oaAllLines[nLineIndex].getNode2Index() );
	}
	
	oaAllLines[nLineIndex].setInTree();
	
	oaAnimations.push( {type: ADD_TO_TREE, line: nLineIndex, node : nAddedNode} );
}

function UnHighlightLines()
{
	var naLineNums = new Array();
	var naLineIgnored = new Array();
	var naStartingNodes = new Array();
	
	for ( i = 0; i < naHighlightedLines.length; i++ )
	{
		if ( !oaAllLines[naHighlightedLines[i]].isInTree() )
		{
			if ( oaAllNodes[oaAllLines[naHighlightedLines[i]].getNode1Index()].isInTree() && 
				 oaAllNodes[oaAllLines[naHighlightedLines[i]].getNode2Index()].isInTree() )
			{ //Line is Ignored
				oaAllLines[naHighlightedLines[i]].setIgnored();
				
				naLineNums.push( naHighlightedLines[i] );
				naLineIgnored.push( 255 );
				
				naStartingNodes.push( 1 );
			}
			else
			{	//Line is not ignored
				if ( oaAllNodes[oaAllLines[naHighlightedLines[i]].getNode2Index()].isInTree() )
					naStartingNodes.push( 2 );
				else
					naStartingNodes.push( 1 );
					
				naLineNums.push( naHighlightedLines[i] );
				naLineIgnored.push( 0 );
			}
		}
	}
	oaAnimations.push( {type : UNHIGHLIGHT_LINES, lines : naLineNums.toString(), ignoreds : naLineIgnored.toString(), nodes : naStartingNodes.toString()} );
	
	while ( naHighlightedLines.length != 0 )
		naHighlightedLines.pop();
	}

/**********************************************************
*	The following functions play the animation as well as 
*	allowing it to be stepped forward and backwards.
*	
*	Forward()
*		Description
*			This function animates the animation currently
*			pointed to by the animation iterator and then
*			increases said iterator.
*	
*	Backward()
*		Description
*			This function decreases the animation iterator
*			and then reverse animates the animation pointed
*			to by the animation iterator.
*	
*	ChangeImage( nodeId )
*		Description
*			this function changes the image of a node.  If 
*			it currently the default node image, it changes 
*			it to the image use to indicate that it is in the
*			tree, and vice versa.
*		Parameters
*			nodeId: this is the element id of the node that
*					the image is to be changed for.
*	
*	PseudoHighlight( nPseudoId )
*		Description
*			Highlights the pseudocode lines.
*		Parameters
*			nPseudoId: the number of the psueocode line to be highlightd
*
*	PlayDemo()
*		Description
*			This function builds a preset graph.  This graph 
*			is based on the one found on Wikipedia
*	
*	Play()
*		Description
*			This function acts as the play pause button.  It 
*			enables and disables buttons as well as setting
*			the state of the animation.
*	
*	Run()
*		Description
*			This function is used to run through the animation.
**********************************************************/	

/**********************************************************
*	For the animations stored in oaAnimations, these are 
*	the parameters that should be passed based on the type.
*
*	type : ADD_TO_TREE
*	line : the index (relative to oaAllLines) of the line to be 
*		   added to the tree .
*	node : the node (relative to the line; 1 or 2) that is to be 
*			added to the tree with the node.
*
*	type : HIGHLIGHT_LINES
*	lines : a comma delimited string of the indices (relative to
*			oaAllLines) of the lines to be highlighted.  This 
*			string can be obtained by using the toString() function
*			of an array containing the elements.
*	nodes : a comma delimited string of the numbers (1 or 2) 
*			of the nodes that are to be the starting point of 
*			the highlighting. This string can be obtained by 
*			using the toString() function of an array containing 
*			the elements.
*
*	type : SELECT_LINE
*	line : the index (relative to oaAllLines) to be selected
*	node : the starting node (1 or 2) to be the starting point
*		   of drawing the selection color
*
*	type : UNHIGHLIGHT_LINES
*	lines : a comma delimited string of the indices (relative to
*			oaAllLines) of the lines to be unhighlighted.  This 
*			string can be obtained by using the toString() function
*			of an array containing the elements.
*	ignoreds : a comma delimited string of the indices (relative to
*			oaAllLines) of the lines to be ignored.  This 
*			string can be obtained by using the toString() function
*			of an array containing the elements.
*	nodes : a comma delimited string of the numbers (1 or 2) 
*			of the nodes that are to be the starting point of 
*			the unhighlighting. This string can be obtained by 
*			using the toString() function of an array containing 
*			the elements.
**********************************************************/	
function Forward()
{
	/*
	This code is not needed because the graph is loaded on
	page load.  If custom is reimplemented, then this code will
	need to be re-included.  Note, for some reason the demo is buggy
	if ( nAnimationIterator == 0 )
		PseudoHighlight( 1 );
	if ( !bIsCalculated )
	{
		if ( !bIsCustom )
			PlayDemo();
		setTimeout( "RunAlgorithm()", 20 );
		return;
	}*/
	if ( nAnimationIterator == oaAnimations.length )
	{
		PseudoHighlight( 5 );
		document.getElementById( "forward" ).disabled = true;
		document.getElementById( "play" ).disabled = true;
		bIsPlaying = false;
		return;
	}
	document.getElementById( "back" ).disabled = false;
	
	var oCurrentAnim = oaAnimations[nAnimationIterator];
	switch ( oCurrentAnim.type )
	{
		case ADD_TO_TREE:
			PseudoHighlight( 4 );
			var nStartingNode = 0;
			var sAddedNodeId;
			if ( oCurrentAnim.node == 1 )
			{
				sAddedNodeId = oaAllNodes[oaAllLines[oCurrentAnim.line].getNode1Index()].getId();
				nStartingNode = 2;
			}
			else
			{
				sAddedNodeId = oaAllNodes[oaAllLines[oCurrentAnim.line].getNode2Index()].getId();
				nStartingNode = 1;
			}
			
			DrawLine( oCurrentAnim.line, 34, 139, 34, nStartingNode );
			setTimeout( "ChangeImage(\'" +sAddedNodeId+ "\')",1000 );			
			break;
		case HIGHLIGHT_LINES:
			PseudoHighlight( 2 );
			var saCharLines = oCurrentAnim.lines.split( "," );
			var naLineNumbers = new Array();
			for ( i = 0; i < saCharLines.length; i++ )
				naLineNumbers.push( parseInt( saCharLines[i] ) );

			var saCharNodes = oCurrentAnim.nodes.split(",");
			var naNodeNumbers = new Array();
			for ( i = 0; i < saCharLines.length; i++ )
				naNodeNumbers.push( parseInt( saCharNodes[i] ));
			
			for ( i = 0; i < naLineNumbers.length; i++ )
				DrawLine( naLineNumbers[i], 0, 0, 205, naNodeNumbers[i] );
			break;
		case SELECT_LINE:
			PseudoHighlight( 3 );
			DrawLine( oCurrentAnim.line , 0, 191, 255 , oCurrentAnim.node );
			break;
		case UNHIGHLIGHT_LINES:
			PseudoHighlight( 0 );
			var saCharLines = oCurrentAnim.lines.split( "," );
			var naLineNumbers = new Array();
			for ( i = 0; i < saCharLines.length; i++ )
				naLineNumbers.push( parseInt( saCharLines[i] ) );
		
			var saCharLineIgnored = oCurrentAnim.ignoreds.split( "," );
			var naLineIgnored = new Array();
			for ( i = 0; i < saCharLines.length; i++ )
				naLineIgnored.push( parseInt( saCharLineIgnored[i] ) );
		
			var saCharNode = oCurrentAnim.nodes.split( "," );
			var naStartingNodes = new Array();
			for ( i = 0; i < saCharNode.length; i++ )
				naStartingNodes.push( parseInt( saCharNode[i] ) );
				
			for ( i = 0; i < naLineNumbers.length; i++ )
			{
				DrawLine( naLineNumbers[i], naLineIgnored[i], 0, 0, naStartingNodes[i] );
			}
			break;	
	}
	
	nAnimationIterator = nAnimationIterator + 1;
}

function Backward()
{
	if ( !bIsCalculated || (nAnimationIterator == 0) )
	{
		document.getElementById( "back" ).disabled = true;
		return;
	}
	
	if ( nAnimationIterator == 1 )
	{
		document.getElementById( "back" ).disabled = true;
		PseudoHighlight( 1 );
	}
	document.getElementById( "play" ).disabled = false;
	document.getElementById( "forward" ).disabled = false;

	nAnimationIterator = nAnimationIterator - 1;
	var oCurrentAnim = oaAnimations[nAnimationIterator];
	switch ( oCurrentAnim.type )
	{
		case ADD_TO_TREE:
			PseudoHighlight( 3 );
			var nStartingNode = 0;
			var sAddedNodeId;
			if ( oCurrentAnim.node == 1 )
			{
				sAddedNodeId = oaAllNodes[oaAllLines[oCurrentAnim.line].getNode1Index()].getId();
				nStartingNode = 1;
			}
			else
			{
				sAddedNodeId = oaAllNodes[oaAllLines[oCurrentAnim.line].getNode2Index()].getId();
				nStartingNode = 2;
			}
			
			DrawLine( oCurrentAnim.line, 0, 191, 255, nStartingNode );
			ChangeImage( sAddedNodeId );
			break;
		case HIGHLIGHT_LINES:
			PseudoHighlight( 0 );
			var saCharLines = oCurrentAnim.lines.split( "," );
			var naLineNumbers = new Array();
			for ( i = 0; i < saCharLines.length; i++ )
				naLineNumbers.push( parseInt( saCharLines[i] ) );
			
			var saCharNodes = oCurrentAnim.nodes.split( "," );
			var naNodeNumbers = new Array();
			
			for ( i = 0; i < saCharLines.length; i++ )
				naNodeNumbers.push( parseInt( saCharNodes[i] ) );
			
			for ( i = 0; i < naNodeNumbers.length; i++ )
			{
				if ( naNodeNumbers[i] == 1 )
					naNodeNumbers[i] = 2;
				else
					naNodeNumbers[i] = 1;				
			}
			
			for ( i = 0; i < naLineNumbers.length; i++ )
				DrawLine( naLineNumbers[i], 0, 0, 0, naNodeNumbers[i] );
			break;
		case SELECT_LINE:
			PseudoHighlight( 2 );
			var nStartingNode;
			if ( oCurrentAnim.node == 1 )
				nStartingNode = 2;
			else
				nStartingNode = 1;		
				
			DrawLine( oCurrentAnim.line , 0, 0, 205 , nStartingNode );
			break;
		case UNHIGHLIGHT_LINES:
			PseudoHighlight( 4 );
			var saCharLines = oCurrentAnim.lines.split( "," );
			var naLineNumbers = new Array();
			
			for ( i = 0; i < saCharLines.length; i++ )
				naLineNumbers.push( parseInt( saCharLines[i] ) );
		
			var saCharNode = oCurrentAnim.nodes.split( "," );
			var naStartingNodes = new Array();
			
			for ( i = 0; i < saCharNode.length; i++ )
				naStartingNodes.push( parseInt( saCharNode[i] ) );
			
			for ( i = 0; i < naStartingNodes.length; i++ )
			{
				if ( naStartingNodes[i] == 1 )
					naStartingNodes[i] = 2;
				else
					naStartingNodes[i] = 1;
			}
		
			for ( i = 0; i < naLineNumbers.length; i++ )
			{
				DrawLine( naLineNumbers[i], 0, 0, 205, naStartingNodes[i] );
			}
			break;	
	}
}

function ChangeImage( nodeId )
{
	if ( document.getElementById( nodeId ).style.backgroundImage.match( "nodeInTree" ) )
		document.getElementById( nodeId ).style.backgroundImage = "url(/algo/images/algorithm/prims/node.png)";
	else
		document.getElementById( nodeId ).style.backgroundImage = "url(/algo/images/algorithm/prims/nodeInTree.png)";
}

function PseudoHighlight( nPseudoId )
{	
	for ( i = 1; i < 6; i++ )
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

function PlayDemo()
{	
	PseudoHighlight( 1 );
	CreateNode( 40, 70 );
	CreateNode( 200, 100 );
	CreateNode( 500, 60 );
	CreateNode( 425, 220 );
	CreateNode( 130, 250 );
	CreateNode( 290, 325 );
	CreateNode( 500, 375 );
	CreateLine( 0, 1, 7 );
	CreateLine( 0, 4, 5 );
	CreateLine( 4, 5, 6 );
	CreateLine( 5, 6, 11 );
	CreateLine( 1, 2, 8 );
	CreateLine( 2, 3, 5 );
	CreateLine( 3, 6, 9 );
	CreateLine( 4, 3, 15 );
	CreateLine( 4, 1, 9 );
	CreateLine( 5, 3, 8 );
	CreateLine( 1, 3, 7 );
}

function Play()
{
	if ( !bIsPlaying )
	{
		document.getElementById( "play" ).innerHTML = "Pause";
		bIsPlaying = true;
		Run();		
	}
	else
	{
		document.getElementById( "play" ).innerHTML = "Play";
		bIsPlaying = false;
	}
}

function Run()
{
	if( !bIsPlaying )
	{
		document.getElementById( "play" ).innerHTML = "Play";
		return;
	}
	
	Forward();
	setTimeout( "Run()",2250 );
}

/**********************************************************
*	The following functions are for allowing the user to create
*	a custom graph.  They are commented out because they are not
*	included in the final revision because it is not consistent
*	with the other graph animations
*
*	ActivateCustom()
*		Description
*			Changes button values and sets Custom flag to true
*
*	CustomDone()
*		Description
*			Changes button values so the user can play the animation
*
*	AddNode()
*		Description
*			Enables the ability to add a node to the graph
*
*	AddEdge()
*		Description
*			Enables the ability to add an edge to the graph
*
*	PlaceEdge( nodeId )
*		Description
*			Connects an edge to a node.  If this is the first node
*			to be clicked on, it's ID is saved.  If it is the second
*			node, then a line is created from this node to the first node
*		Parameters
*			nodeId: the id of the node that this line is to be connected to
*
*	PlaceNode( event )
*		Description
*			Places a node where the user clicked
*		Parameters
*			event: a value passed to GetMouseCoords
*
*	GetMouseCoords( event )
*		Description
*			Gets the coordinates of the mouse relative to the work area
*			and sets the values of the global variables
*		Parameters
*			event: used for getting mouse coordinates
**********************************************************/	
/*
function ActivateCustom()
{
	document.getElementById( "AddNode" ).disabled = false;
	document.getElementById( "AddEdge" ).disabled = false;
	document.getElementById( "Done" ).disabled = false;
	document.getElementById( "play" ).disabled = true;
	document.getElementById( "demo" ).disabled = true;
	document.getElementById( "forward" ).disabled = true;
	bIsCustom = true;
}

function CustomDone()
{
	document.getElementById( "play" ).disabled = false;
	document.getElementById( "forward" ).disabled = false;
	document.getElementById( "AddNode" ).disabled = true;
	document.getElementById( "AddEdge" ).disabled = true;
	document.getElementById( "Done" ).disabled = true;
}

function AddNode()
{
	bIsWaitingForNode = true;
	document.getElementById( "AddNode" ).disabled = true;
}

function AddEdge()
{
	bIsWaitingForEdge = true;
	document.getElementById( "AddEdge" ).disabled = true;
	document.getElementById( "AddNode" ).disabled = true;
}

function PlaceEdge( nodeId )
{
	if ( !bIsWaitingForEdge)
		return;

	if ( !bIsFirstNodeChosen )
	{
		document.getElementById( "AddNode" ).disabled = true;
	
		nFirstNode = nodeId;
		bIsFirstNodeChosen = true;
	}
	else
	{	
		var nX = oaAllNodes[nFirstNode].getPosX() - oaAllNodes[nodeId].getPosX();
		var nY = oaAllNodes[nFirstNode].getPosY() - oaAllNodes[nodeId].getPosY();
		var nLength = Math.floor( Math.sqrt( (nX * nX) + (nY * nY) ) / 10 );
		
		
		CreateLine( nFirstNode, nodeId, nLength );
		bIsWaitingForEdge = false;
		document.getElementById( "AddEdge" ).disabled = false;
		document.getElementById( "AddNode" ).disabled = false;
		bIsFirstNodeChosen = false;
	}
}

function PlaceNode( event )
{
	if ( !bIsWaitingForNode )
		return;

	document.getElementById( "AddNode" ).disabled = false;
		
	GetMouseCoords( event );
	
	CreateNode( nMouseX, nMouseY );
	
	bIsWaitingForNode = false;
}

function GetMouseCoords( event )
{
	nMouseX = event.clientX - document.getElementById( "workarea" ).offsetLeft;
	nMouseY = event.clientY - document.getElementById( "workarea" ).offsetTop;
}*/