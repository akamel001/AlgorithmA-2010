/*********************************************************
*   Name:       Martin Smith & Manuel Mendez
*   File:       binaryTree.js
*   Created:    March 10, 2010
*   Modified:   March 10, 2010
*   Dependency: jsAnim.js, pbMan.js
*   Notes:      
*       A very simple example of how you normally would use both jsAnim
*       and pbMan.
*   Changelog:
*       March 10, 2010
*           - Added Prop.line functionality examples.

*   Functions:  
*       PlayPause(ID)           :   Play/Pause Button Function.
*       NormalAnimation()       :   How you normally would do animation.
*       SequenceAnimation()     :   How the new pbMan works.
*       LineAnimation()         :   How to draw a line.
*       EraseALine()            :   Example erasure of a line.
*       updatePosition()        :   Example of updating values through user 
input
*       updateColor()           :   Same.
*              changeToGreen()                :       Changes a nodes color.
*              changeToBlack()                 :       Changes a nodes color.
*              highlight()                          :       Uses a binary search 
algorithm to find and highlight a node.
*              highlight2()                        :        Same as above but 
without recursion for a step by step animation.
*              selectText()                        :       Gets user inputted 
value for use to find the specified node.
***********************************************************/


var Tree = new Array();
Tree [0] = 50;
Tree [1] = 20;
Tree [2] = 80;
Tree [3] = 10;
Tree [4] = 30;
Tree [5] = 70;
Tree [6] = 90;
Tree [7] = 5;
Tree [8] = 15;
Tree [9] = 25;
Tree [10] = 35;
Tree [11] = 65;
Tree [12] = 75;
Tree [13] = 85;
Tree [14] = 95; 

var Path = new Array();

var p = 0;
var i = 0;
var check = 0;

function Initialize()
{
	/* REQUIRED */
	// Sets up your Concept and How-To buttons.
	document.getElementById("concept").onmouseover = function () {
		Tip("A Binary Tree is a tree data structure in which each node has at most two children. Typically, the first node is known as the parent and the child nodes are called left and right. Binary trees are commonly used to implement binary search trees and binary heaps. Every left node has a value less than or equal to its parent node and every right node has a value greater than or equal to its parent. A new node is always added as a leaf, following the specified rule above.",WIDTH, 500, FONTFACE, 'Verdana, sans-serif', FONTSIZE, '11pt',FONTCOLOR, '#000000',PADDING, 8, SHADOW, true, SHADOWCOLOR, '#CCCCCC', FADEIN, 400, FADEOUT, 800,CENTERMOUSE, true, OFFSETX, 0 ,BGCOLOR, '#FFFFCC');
	}
	document.getElementById("howto").onmouseover = function() {
	Tip("<strong>Animation</strong> - Starts animation after a sequence of number has been entered<br />" + "<br /><strong>Insert</strong> - Will insert nodes with an input numeric value<br />" + "<br /><strong>Step</strong> - Will allow user to pause through animation<br />" + "<br /><strong>Previous</strong> - Will allow user to step through animation backward one step at a time<br />" + "<br /><strong>Reset</strong> - Reset to the initial layout when first loaded<br />",WIDTH, 450, FONTFACE, 'Verdana, sans-serif', FONTSIZE, '11pt',FONTCOLOR, '#000000',PADDING, 8, SHADOW, true, SHADOWCOLOR, '#CCCCCC', FADEIN, 400, FADEOUT, 800,CENTERMOUSE, true, OFFSETX, 0 ,BGCOLOR, '#CEFFFF');
	}
}

function changeToGreen(i)
{
    
    document.getElementById(i).src = "/algo/images/algorithm/breadthfirst/greencircle.gif";
}
function changeToRed(i)
{
    
    document.getElementById(i).src = "/algo/images/algorithm/breadthfirst/redcircle.gif";
}
function changeToBlack(i)
{
    
    document.getElementById(i).src = "/algo/images/algorithm/breadthfirst/circle.gif";
}

function selectText()
{
  var j = 0;
  resetNodes(); j = document.getElementById("myText").value;
  check = j;
}

function selectText2()
{
  var j = 0;
  j = document.getElementById("myText").value;
  highlight2(j);
}

function resetNodes( ) {
		document.getElementById("found").style.backgroundColor = "white";
        for (var k = 0; k < Tree.length; k++) {
	    changeToBlack(Tree[k]);
	}
	i = 0;
}


//goBack needs a tweek
function goBack() {
  changeToBlack(Tree[i]);
  i = 0;
  p--;
  while ( Tree[i] != Path[p])
  {
    i++;
  }
  if (Path.length > 0) {
    Path.pop();
  }
  //alert(i);
  return;
//  i = Path.length;
  
}


function highlight( ) //changes color of nodes based on inputed value
  {
				if (check == "") 
		  {
				alert("Error! Please set value.");
				return;
		  }		
				if (Tree[i] == check) 
		  { //if boxes[i] == value return i
                     changeToRed(Tree[i]);
					 document.getElementById("found").style.backgroundColor = "yellow";
                        return;
					
		  }
                else if (Tree[i] > check) 
		  { //else if inputed value is less than boxes[i] search left
                        changeToGreen(Tree[i]);
						 document.getElementById("lessthanroot").style.backgroudColor = "yellow";
						 setTimeout(function(){	
						 document.getElementById("lessthanroot").style.backgroundColor = "white";
						 }, 750);
                         i = (2 * i) + 1;
		  }
                else 
		  { //else search right
						document.getElementById("greaterthanroot").style.backgroundColor = "yellow";
						 setTimeout(function(){	
						 document.getElementById("greaterthanroot").style.backgroundColor = "white";
						 }, 750);
                        changeToGreen ( Tree[i] );
                        i = ( 2 * i ) + 2;
		  }
				if (i > 14)
		  {
					alert("Value not found. The value you set may not be in the tree.");
					return;
		  }

	setTimeout(function()
	{
	  highlight(check)
	}, 1000 );
  }

function highlight2( ) //step version of highlight
  {

                 if (Tree[i] == check) 
		  { //if boxes[i] == value return i
                     changeToRed(Tree[i]);
					 Path[p] = Tree[i];
					 document.getElementById("found").style.backgroundColor = "yellow";
                     return;
		  }
                else if (Tree[i] > check) 
		  { //else if inputed value is less than boxes[i] search left
                        changeToGreen(Tree[i]);
						Path[p] = Tree[i];
                        i = (2 * i) + 1;
						p++;
						document.getElementById("lessthanroot").style.backgroundColor = "yellow";
						 setTimeout(function(){	
						 document.getElementById("lessthanroot").style.backgroundColor = "white";
						 }, 750);
		  }
                else 
		  { //else search right
                         changeToGreen ( Tree[i] );
						 Path[p] = Tree[i];
						 document.getElementById("greaterthanroot").style.backgroundColor = "yellow";
						 setTimeout(function(){	
						 document.getElementById("greaterthanroot").style.backgroundColor = "white";
						 }, 750);
                        i = ( 2 * i ) + 2;
			p++;
		  }
  }