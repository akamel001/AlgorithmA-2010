/*********************************************************
*	Name:		Martin Smith & Manuel Mendez
*	File:		redblack.js
*	Created:	March 10, 2010
*	Modified:	March 19, 2010
*	Dependency:	jsAnim.js, pbMan.js
*	Notes:		
*		A very simple example of how you normally would use both jsAnim
*		and pbMan.
*	Changelog:
*		March 10, 2010
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
var xcoordinates = new Array();
var ycoordinates = new Array();
var tree = new Array();
var left = new Array();
var right = new Array();


xcoordinates[0] = 350;
xcoordinates[1] = 225;
xcoordinates[2] = 475;
xcoordinates[3] = 150;
xcoordinates[4] = 300;
xcoordinates[5] = 400;
xcoordinates[6] = 550;
xcoordinates[7] = 125;
xcoordinates[8] = 175;
xcoordinates[9] = 275;
xcoordinates[10] = 325;
xcoordinates[11] = 375;
xcoordinates[12] = 425;
xcoordinates[13] = 525;
xcoordinates[14] = 575;

ycoordinates[0] = 10;
ycoordinates[1] = 40;
ycoordinates[2] = 40;
ycoordinates[3] = 70;
ycoordinates[4] = 70;
ycoordinates[5] = 70;
ycoordinates[6] = 70;
ycoordinates[7] = 105;
ycoordinates[8] = 105;
ycoordinates[9] = 105;
ycoordinates[10] = 105;
ycoordinates[11] = 105;
ycoordinates[12] = 105;
ycoordinates[13] = 105;
ycoordinates[14] = 105;

tree[0] = null;
tree[1] = null;
tree[2] = null;
tree[3] = null;
tree[4] = null;
tree[5] = null;
tree[6] = null;
tree[7] = null;
tree[8] = null;
tree[9] = null;
tree[10] = null;
tree[11] = null;
tree[12] = null;
tree[13] = null;
tree[14] = null;

var i = 0;
var j = 0;
var k = 0;
var interval = 10;




/*! 	THIS FUNCTION MUST BE INCLUDED
	
	This function initializes all buttons on the template to whatever you need.
	Each button is appended to the end of the inner html of the object. 

*/
function Initialize()
{

	/* REQUIRED */
	// Sets up your Concept and How-To buttons.
	document.getElementById("concept").onmouseover = function () {
		Tip("A red-black tree is a type of self-balancing binary search tree, typically used to implement associative arrays. It is complex, but has good worst-case running time for its operations and is efficient in practice: it can search, insert, and delete in O(log n) time, where n is total number of elements in the tree. Red-black trees, like all binary search trees, allow efficient in-order traversal of their elements. The search-time results from the traversal from root to leaf, and therefore a balanced tree, having the least possible tree height, results in O(log n) search time. A red-black tree is a binary search tree where each node has a color attribute, the value of which is either red or black.",WIDTH, 600, FONTFACE, 'Verdana, sans-serif', FONTSIZE, '12pt',FONTCOLOR, '#000000',PADDING, 8, SHADOW, true, SHADOWCOLOR, '#CCCCCC', FADEIN, 400, FADEOUT, 800,CENTERMOUSE, true, OFFSETX, 0 ,BGCOLOR, '#FFFFCC');
	}
	document.getElementById("howto").onmouseover = function() {
		Tip("<strong>Input Value</strong> - Allows to enter a whole numeric value. Set value must be pressed after entering a number<br />" +
		"<br /><strong>Animation</strong> - Start animation after a sequence of number has been entered<br />" +
		"<br /><strong>CreateDiv</strong> - <br />" +
		"<br /><strong>CreateMultiple</strong> - <br />" +
		"<br /><strong>Create Tree</strong> - Generate a graphical rendition of the tree<br />" +
		"<br /><strong>Erase</strong> - Reset to the initial layout when first loaded<br />",WIDTH, 500, FONTFACE, 'Verdana, sans-serif', FONTSIZE, '11pt',FONTCOLOR, '#000000',PADDING, 8, SHADOW, true, SHADOWCOLOR, '#CCCCCC', FADEIN, 400, FADEOUT, 800,CENTERMOUSE, true, OFFSETX, 0 ,BGCOLOR, '#CEFFFF');
	}
}

function createDiv(left, top, newdivID)
{
var newdiv = document.createElement('div');
var divIdName = newdivID;
newdiv.setAttribute('id', newdivID);
newdiv.style.width = "25px";
newdiv.style.height = "25px";
newdiv.style.left = left;
newdiv.style.top = top;
newdiv.style.position = "absolute";
newdiv.style.border = "1px solid #000000";
newdiv.style.borderColor = "red";
newdiv.innerHTML = selectText();
var wrapperDiv = document.getElementById("workarea");
wrapperDiv.appendChild(newdiv);
}

function divMaker ( id )
{
  this.id = id;
}

function selectText()
{
  var l = 0;
  l = document.getElementById("myText").value;
  return l;
}

function createMultiple() //builds a tree based on the inputed value
{
  var check = selectText();
  if (tree[0] == null) 
  {
    tree[i] = check;
  }
  else if (tree[i] > check) 
  { //else if inputed value is less than boxes[i] search left
    if (tree[i] != null)
    {
      i = (2 * i) + 1;
      createMultiple();
    }
  }
  else 
  { //else search right
    if (tree[i] != null)
    {
      i = ( 2 * i ) + 2;
      createMultiple();
    }
  }
  tree[i] = check;

  if (i > 14)
  {
    alert("You have exceeded the set size of the tree.");
    return;
  }
  return i;
}

function balance()
{
  var temparray = tree;
  var check = selectText();
  var i = 0;
  var left = (2*i) + 1;
  var leftleft = (2*left) + 1;
  var right = (2*i) + 2;
  var rightright = (2*right) + 2;
  if (tree[left] != null && tree[leftleft] != null)// && 2i + 2 == null)
  {
    if (tree[right] == null)
    {
      tree[i] = check;
      tree[i] = tree[left];//(2i + 1)];
      tree[left] = tree[leftleft];
      tree[right] = temparray[0];
      document.getElementById(i).innerHTML = tree[i];
      document.getElementById(left).innerHTML = tree[left];
      createDiv(xcoordinates[right], ycoordinates[right], (right));
      document.getElementById(right).innerHTML = tree[right];
      removeElement(leftleft);//delete div at (2(2i + 1));
    }
  }
  if (tree[right] != null && tree[rightright] != null)// && 2i + 1 == null)
  {
    if (tree[left] == null)
    {
      tree[i] = check;
      tree[i] = tree[right];
      tree[right] = tree[rightright];
      tree[left] = check;
      document.getElementById(i).innerHTML = tree[i];
      document.getElementById(right).innerHTML = tree[right];//originally left
      createDiv(xcoordinates[left], ycoordinates[left], (left));//originally right
      document.getElementById(left).innerHTML = tree[left];//originally right
      removeElement(rightright);//delete div at (2(2i + 2));
    }
  }    
}

function removeElement(divNum) 
{
  var d = document.getElementById("workspace");
  var olddiv = document.getElementById(divNum);
  d.removeChild(olddiv);
}

function buildTree()
{ 
  createMultiple();
  balance();
  createDiv(xcoordinates[i]+'px', ycoordinates[i]+'px', i);
  i = 0;
}