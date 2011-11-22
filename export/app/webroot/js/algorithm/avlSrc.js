/*********************************************************
*	Name:			Gerren Willis and Victor Herrera
*	File:			avlSrc.js
*	Created:		February 14, 2010
*	Description: 	
An AVL tree is a self-balancing binary search tree, and it is the first such data structure to be invented. In an AVL tree, the heights of the two child subtrees of any node differ by at most one; therefore, it is also said to be height-balanced. Lookup, insertion, and deletion all take O(log n) time in both the average and worst cases, where n is the number of nodes in the tree prior to the operation. Insertions and deletions may require the tree to be rebalanced by one or more tree rotations. 
*	Dependencies:	jsAnim.js
*********************************************************/

var manager = new jsAnimManager(20);
var playback = new pbManager();

var value; 
var testValue;
var i = 0; 
var flag = 1; 
var valueCheck = new Array();
var j = 1; 
var level = 0; 
	var k = 0; 
var rCounter =0; 
var lCounter =0;
var r2Counter =0; 
var l2Counter =0;
var diff; 
var diff2;
Node1 = new node();
Node2 = new node();
Node3 = new node();
Node4 = new node();
Node5 = new node();
Node6 = new node();
Node7 = new node();

Node1.parent = "node1";
Node1.leftChild = "node2";
Node1.rightChild = "node3";
Node2.parent = "node2";
Node2.leftChild = "node4";
Node2.rightChild = "node5";
Node3.parent = "node4";
Node3.leftChild = "node8";
Node3.rightChild = "node9";
Node4.parent = "node5";
Node4.leftChild = "node10";
Node4.rightChild = "node11";
Node5.parent = "node3";
Node5.leftChild = "node6";
Node5.rightChild = "node7";
Node6.parent = "node6";
Node6.leftChild = "node12";
Node6.rightChild = "node13";
Node7.parent = "node7";
Node7.leftChild = "node14";
Node7.rightChild = "node15";

var flagNode = 1; 


var Tree = new Array();
//Tree[0] = Node1; 
Tree[0] = new Array ("one", "two"); 
Tree[1] = new Array ("one", "two");

Tree[0][0] = Node1;  
Tree[0][1] = Node2;  
Tree[0][2] = Node3; 
Tree[0][3] = Node4; 
Tree[1][0] = Node1;  
Tree[1][1] = Node5;  
Tree[1][2] = Node6;
Tree[1][3] = Node7;
var tempV; 
var once = 0; 
var dur = 0; 
var counter = 1; 

/*! 	THIS FUNCTION MUST BE INCLUDED
	
	This function initializes all buttons on the template to whatever you need.
	Each button is appended to the end of the inner html of the object. 

*/
function Initialize()
{
	// Set initial values of input boxes. This is so that reloading the screen doesn't break it.

	
	/* REQUIRED */
	// Sets up your Concept and How-To buttons.
	document.getElementById("concept").onmouseover = function () {
		Tip("An AVL tree is a self-balancing binary search tree. In an AVL tree, the heights of the two child subtrees of any node differ by at most one; therefore, it is also said to be height-balanced. Lookup, insertion, and deletion all take O(log n) time in both the average and worst cases, where n is the number of nodes in the tree prior to the operation. Insertions and deletions may require the tree to be rebalanced by one or more tree rotations. The balance factor of a node is the height of its right subtree minus the height of its left subtree, and a node with balance factor 1, 0, or -1 is considered balanced. A node with any other balance factor is considered unbalanced and requires rebalancing the tree. The balance factor is either stored directly at each node or computed from the heights of the subtrees.",WIDTH, 650, FONTFACE, 'Verdana, sans-serif', FONTSIZE, '12pt',FONTCOLOR, '#000000',PADDING, 8, SHADOW, true, SHADOWCOLOR, '#CCCCCC', FADEIN, 400, FADEOUT, 800,CENTERMOUSE, true, OFFSETX, 0 ,BGCOLOR, '#FFFFCC');
	}
	document.getElementById("howto").onmouseover = function() {
		Tip("<strong>Input</strong> - Allows to enter a whole numeric value<br />" +
		"<br /><strong>Insert</strong> - Will insert nodes with an input numeric value<br />" +
		"<br /><strong>Reset</strong> - Reset to the initial layout when first loaded<br />",WIDTH, 400, FONTFACE, 'Verdana, sans-serif', FONTSIZE, '11pt',FONTCOLOR, '#000000',PADDING, 8, SHADOW, true, SHADOWCOLOR, '#CCCCCC', FADEIN, 400, FADEOUT, 800,CENTERMOUSE, true, OFFSETX, 0 ,BGCOLOR, '#CEFFFF');
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

/*********************************************************
*	Function Name: 			normalAnimation
*	Function Description:	Handels the animation of the 
nodes being placed the tree
*********************************************************/
function NormalAnimation(i)
{

	
	var anim1 = manager.createAnimObject("object" + i);
	

	anim1.add({property: Prop.left, to: 5, duration: 1000});
	
	
	
	document.getElementById("object"+i).style.visibility="visible";
	
}

/*********************************************************
*	Function Name: 			code
*	Function Description:	Handels the highlighting
of the pseudo code
*********************************************************/

function code()
	{		
	 	
			if(counter ==1)
			{
			
			//highlight first line in red
			setTimeout(function(){
			document.getElementById("function1").style.backgroundColor = "yellow";
			}, 200);
			counter++;
			}
				
			if(counter ==2)
			{
			
			//unhighlight first line and then highlight second line
			setTimeout(function(){
			document.getElementById("function1").style.backgroundColor = "white";
			document.getElementById("function3").style.backgroundColor = "yellow";
			}, 500);
			counter++;
		
			}

			if(counter ==3)
			{

			//unhighlight first line and then highlight second line
			setTimeout(function(){
			document.getElementById("function3").style.backgroundColor = "white";
			document.getElementById("function4").style.backgroundColor = "yellow";
			}, 1100);
			counter++;
		
			}

			if(counter ==4)
			{
			
			//unhighlight first line and then highlight second line
			setTimeout(function(){
			document.getElementById("function4").style.backgroundColor = "white";
			document.getElementById("function5").style.backgroundColor = "yellow";
			}, 2000);
			counter ++; 
			
			}
			
				if(counter ==5)
			{
			
			//unhighlight first line and then highlight second line
			setTimeout(function(){
			document.getElementById("function5").style.backgroundColor = "white";
			}, 2300);
			counter = 1; 
			
			}
		
		
			
}
/*********************************************************
*	Function Name: 			setValue
*	Function Description:	tests to see if the value
is in the correct format then sets it. 
*********************************************************/
function setValue() //grabs input value
{ 
 	
  	
	    
		testValue = document.getElementById("value").value;
	
	    numbersonly(testValue);

}
/*********************************************************
*	Class Name: 			node
*	Function Description:	this is a class that stores
the node information
*********************************************************/
function node()
{ 
	
	this.nValue = null; 
	this.leftChild = null; 
	this.rightChild = null;
	this.parent = null; 
	this.rFlag = 0; 
	this.lFlag = 0;
	this.track = 0; 
	
}

//l = ;
/*********************************************************
*	Function Name: 			insert
*	Function Description:	places only the first node
onto the tree then calls place() to set the remaining nodes.
*********************************************************/
function insert()
{  
	
	if(Tree[0][0].nValue == null)
	{  
	 Tree[0][0].nValue = value;
	document.getElementById(Tree[0][0].parent).innerHTML = Tree[0][0].nValue;
	if(Tree[0][0].nValue != null)
	{
	NormalAnimation(1);
	}
	return;
	}
	if(value >= Tree[0][0].nValue)
	{
		level = 1; 
	
	}
	else
	{
		level = 0; 
	}
	
	
	var nodePos = 0; 

	
	place();	
	
}

/*********************************************************
*	Function Name: 			place
*	Function Description:	places all nodes on the tree
except for the first one.
*********************************************************/
function place()
{ 	

	
	if(value < Tree[level][0].nValue)
	{
		if(!Tree[level][0].lFlag)
		{	
		
			document.getElementById(Tree[level][0].leftChild).innerHTML = value;
			
			Tree[level][1].nValue = value;
			Tree[level][1].track = 1; 
			Tree[level][0].lFlag = 1; 
			
			
			NormalAnimation(2);
			
			return;
		}
	}
	
	if(value >= Tree[level][0].nValue)
	{
		if(!Tree[level][0].rFlag)
		{
			document.getElementById(Tree[level][0].rightChild).innerHTML = value; 
			Tree[level][1].nValue = value; 
			Tree[level][1].track = 1;
			Tree[level][0].rFlag = 1; 
				NormalAnimation(3);
		
			return;
		}
	}


	if(value < Tree[level][1].nValue)
	{
	
		if(!Tree[level][1].lFlag)
		{
			
			if(level==0)
		{
			
			NormalAnimation(4);
		}
			else
		{
			NormalAnimation(6);
	 
		}
			
			document.getElementById(Tree[level][1].leftChild).innerHTML = value;
				
			Tree[level][2].nValue = value;
			Tree[level][2].track = 1;
			Tree[level][1].lFlag = 1; 
			return;
		}
	}
	
	if(value >= Tree[level][1].nValue)
	{
		if(!Tree[level][1].rFlag)
		{
			if(level==0)
		{
			
			NormalAnimation(5);
		}
			else
			{
			NormalAnimation(7);
			
			}
		
			document.getElementById(Tree[level][1].rightChild).innerHTML = value; 
			Tree[level][3].nValue = value;
			Tree[level][3].track = 1;
			Tree[level][1].rFlag = 1; 
		
			return;
		}
	}


	if(Tree[level][2].nValue != null && value < Tree[level][1].nValue)
{
	if(value < Tree[level][2].nValue)
	{
		
		if(!Tree[level][2].lFlag)
		{
			if(level==0)
		{
			
		NormalAnimation(8);
		}
			else
			{
			NormalAnimation(12);
			}
		
		 
		
			document.getElementById(Tree[level][2].leftChild).innerHTML = value; 
			Tree[level][2].nValue = value;
			Tree[level][2].track = 1;
			Tree[level][2].lFlag = 1; 
		
			return;
		}
	}
	
	if(value >= Tree[level][2].nValue)
	{
	
		if(!Tree[level][2].rFlag)
		{
			
			if(level==0)
			{
			
	
			NormalAnimation(9);
			}
			else
			{
			NormalAnimation(13);
		
			}
			
			document.getElementById(Tree[level][2].rightChild).innerHTML = value; 
			Tree[level][3].nValue = value;
			Tree[level][3].track = 1;
			Tree[level][2].rFlag = 1; 
			
			return;
		}
	}
}


if(Tree[level][3].nValue != null && value >=Tree[level][1].nValue)
{
		
	
	if(value < Tree[level][3].nValue)
	{
		if(!Tree[level][3].lFlag)
		{
		
			if(level==0)
			{
	
			NormalAnimation(10);
			}
			else
			{
			NormalAnimation(14);
	
			}
			
		
		document.getElementById(Tree[level][3].leftChild).innerHTML = value; 
			
		
			Tree[level][2].nValue = value;
			Tree[level][2].track = 1;
			Tree[level][3].lFlag = 1;
			if(level==0)
			lCounter++;
			else
			l2Counter++; 
			return;
		}
	}
	
	if(value >= Tree[level][3].nValue)
	{
		if(!Tree[level][3].rFlag)
		{
			
				if(level==0)
				{
			
			
			NormalAnimation(11);
				}
			else
			{
			NormalAnimation(15);
	
			}
			
			
			document.getElementById(Tree[level][3].rightChild).innerHTML = value; 
		
			Tree[level][3].nValue = value;
			Tree[level][3].track = 1;
			Tree[level][3].rFlag = 1; 
		
			return;
		}
	}
	
}
	
}
   
/*********************************************************
*	Function Name: 			numbersonly
*	Function Description:	checks to see if numbers
were entered in the form. If not it alerts with a string. If so it
sets the value and calls code and insert function. 
*********************************************************/
function numbersonly(v) {
	if(isNaN(v) || v == "  " || v == ""
			 || v == " ")
	{
		alert("please enter a number in the Value field between 0 and 99"); 
	}
	else
	{
		value = v *1; 
		code();
		insert();

		return; 
	}
} 

