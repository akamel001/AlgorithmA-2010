/*********************************************************
*	Name:		David Sturgeon and Justin Catrambone
*	File:		testFunctions.js
*	Created:	March 09, 2010
*	Dependency:	jsAnim.js, pbMan.js
*	Notes:		
*		JavaScript code for the 2-3-4 tree algorithm.
*	Functions:	
*		Insert			 		:	Inserts an element into the tree
*		Reset					:	Resets the animation.
*		Find					:	Finds an element in the tree 
*		Highlight				:	Highlights the PseudoCode
*		EraseLines				:	Erases multiple lines
*		ChangeImg				:	Changes the image of a node
*		EraseALine				:	Erases one line
*		ReflectInAnimation		:	Show the changes made in the tree
*		Node					:	A class a Node in the tree
*		Tree					:	The tree class, consists of nodes
*		CreateDivLevel			:	Creates an entire level of divs
***********************************************************/

var manager = new jsAnimManager(20);
var playback = new pbManager();

var tree = new Tree234();
var nodeWidth = 75;
var nodeHeight = 25;
var buffer = 6;
var drawLines = false;
var changed = "empty";

function Initialize()
{
	/* REQUIRED */
	// Sets up your Concept and How-To buttons.
	document.getElementById("concept").onmouseover = function () {
		Tip("This is a test page containing simple animations and the code that got it done. The normal animation will only play a single sequence using only jsAnim. You must refresh the page in order to use the sequenced animation. The sequenced animation uses a combination of both jsAnim and my own playback manager (pbMan). This sequence only does one animation sequence of swap at a time. You can queue up as many animations as you want by continually pressing the button that runs it.<br /><br />Additionally I have added the Prop.line and Attrib functions to jsAnim. Both are used to draw lines with specified position, size, and color. To make this smooth and to actually make it look like a line, you either increase the duration (takes longer, but is cleaner) or lower the timestep when you first create the jsAnim manager (minimum for this project is 20; default is 40).",WIDTH, 500, FONTFACE, 'Verdana, sans-serif', FONTSIZE, '12pt',FONTCOLOR, '#000000',PADDING, 8, SHADOW, true, SHADOWCOLOR, '#CCCCCC', FADEIN, 400, FADEOUT, 800,CENTERMOUSE, true, OFFSETX, 0 ,BGCOLOR, '#FFFFCC');
	}
	document.getElementById("howto").onmouseover = function() {
		Tip("<strong>Pause/Play</strong> - Tell's jsAnim to pause. What it really does is set a flag that makes jsAnim's manager to skip a step while it is on. jsAnim is always running.<br /><br /><strong>Normal</strong> - A normal animation. Uses sequence flags to allow red and blue to go before green. Reset to use Sequence!<br /><br /><strong>Sequence</strong> - Uses pbMan to run a series of animations. Can be queued by continuously pressing this button.<br /><br /><strong>Draw Line</strong> Draws a line from one point to another. If no values are set, it will draw a random line.<br /><br /><strong>Erase Line</strong> - Erases the last line drawn. Simple deduction of the index and the EraseLine function.",WIDTH, 400, FONTFACE, 'Verdana, sans-serif', FONTSIZE, '12pt',FONTCOLOR, '#000000',PADDING, 8, SHADOW, true, SHADOWCOLOR, '#CCCCCC', FADEIN, 400, FADEOUT, 800,CENTERMOUSE, true, OFFSETX, 0 ,BGCOLOR, '#CEFFFF');
	}
}

function Insert()
{
	if(manager.complete){
	  Highlight();
	  //get input
	  var input1 = document.getElementById("input").value * 1;
	  tree.Insert(input1);
	  tree.ReAlignChildren();
	  ReflectInAnimation();
	  if( changed != "empty")
	  {
			  var newdiv = document.getElementById(changed);
			  newdiv.style.backgroundImage= "url(/algo/images/algorithm/2-3-4/capsule.png)";
	  }
	 
	}
}

function Find()
{	
     var input1 = document.getElementById("input").value * 1;
     var ifound = tree.Find(input1);
     changeImg(ifound);
}
function Reset()
{	
	tree.Reset();
}

function Highlight()
{
	  setTimeout(function(){   
	  	document.getElementById("pseudo0").style.backgroundColor = "yellow";
	  }, 100);
	  setTimeout(function(){   
	  	document.getElementById("pseudo1").style.backgroundColor = "yellow";
	  }, 250);
	  setTimeout(function(){   
	  	document.getElementById("pseudo2").style.backgroundColor = "yellow";
	  }, 350);
	  setTimeout(function(){   
	  	document.getElementById("pseudo3").style.backgroundColor = "yellow";
	  }, 450);
	  setTimeout(function(){   
	  	document.getElementById("pseudo0").style.backgroundColor = "white";
	  }, 700);
	  setTimeout(function(){   
	  	document.getElementById("pseudo1").style.backgroundColor = "white";
	  }, 800);
	  setTimeout(function(){   
	  	document.getElementById("pseudo2").style.backgroundColor = "white";
	  }, 900);
	  setTimeout(function(){   
	  	document.getElementById("pseudo3").style.backgroundColor = "white";
	  }, 1000);				  
  
}
function EraseLines(){
	while(lineIndex > 0){
		EraseALine();
	}
	lineHistory = new Array();
}
function changeImg(ifound)
{
	if( changed != "empty")
	{
			var newdiv = document.getElementById(changed);
			newdiv.style.backgroundImage= "url(/algo/images/algorithm/2-3-4/capsule.png)";
	}
	var newdiv = document.getElementById(ifound);
	newdiv.style.backgroundImage= "url(/algo/images/algorithm/2-3-4/found.png)";
	changed = ifound;
	onlevel = false;

}

function EraseALine()
{
	eraseLine(manager, "workarea", lineIndex);
	lineIndex = lineIndex > 0 ? lineIndex-1 : 0;
}

function ReflectInAnimation(){
	var divs = document.getElementsByName("node");
	//hide all divs
	for(var n = 0; n < divs.length; n++){
		document.getElementById(divs[n].id).style.visibility = "hidden";
	}
	var depth = tree.depth;
	//loop through all nodes
	for(var level = 0; level <= depth; level++){
		for(var n = 0; n < tree.nodes[level].length; n++){
			var id = tree.nodes[level][n].id;
			var size = tree.nodes[level][n].values.length;
			//set inner html of divs based on their counterparts in tree.nodes
			switch(size)
			{
			case 1:
				document.getElementById(id).innerHTML = tree.nodes[level][n].values[0].toString(); 
				break;
			case 2:
				document.getElementById(id).innerHTML = tree.nodes[level][n].values[0].toString().concat(" ", tree.nodes[level][n].values[1].toString());
				break;
			case 3:
				document.getElementById(id).innerHTML = tree.nodes[level][n].values[0].toString().concat(" ", tree.nodes[level][n].values[1].toString(), " ", tree.nodes[level][n].values[2].toString()); 
				break;
			}
			//calculate some positioning for animation
			var oldLeft = tree.nodes[level][n].oldLeft;
			var oldTop = tree.nodes[level][n].oldTop;
			var newLeft = tree.nodes[level][n].left;
			var newTop = tree.nodes[level][n].top;
			tree.nodes[level][n].oldLeft = tree.nodes[level][n].left;
			tree.nodes[level][n].oldTop = tree.nodes[level][n].top;
			document.getElementById(id).style.visibility = "visible";
			var anim = manager.createAnimObject(id);
			anim.add({property: Prop.position, from: new Pos(oldLeft, oldTop), to: new Pos(newLeft, newTop), duration: 500});
			//draw lines if lines need to be re-drawn
			var children = tree.nodes[level][n].children.length
			if(drawLines && children > 0){
				EraseLines();
				for(var i = 0; i < children; i++){
					var anim1 = manager.createAnimObject("workarea");
					var childPosition = parseInt(tree.nodes[level][n].children[i].slice(1));
					var childTop = tree.nodes[level + 1][childPosition].top;
					var childLeft = tree.nodes[level + 1][childPosition].left;
					anim1.add({property: Prop.line, from: new Attrib(newLeft + (nodeWidth/2),newTop + nodeHeight,10,0,0,0), to: new Attrib(childLeft + (nodeWidth/2),childTop - 5,10,0,0,0), duration: 2000});
				}
			}
		}
	}
	if(drawLines)
		drawLines = false;
}

function Node(id, left, top, parent){
	this.values = new Array();
	this.children = new Array();
	this.parent = parent;
	this.id = id;
	this.left = left;
	this.top = top;
	this.oldLeft = left;
	this.oldTop = top;
	
	this.AddValue = function(value){
		//insert value into proper place in values.
		var size = this.values.length;
		switch(size)
		{
		case 0:
			this.values.push(value);
			break;
		case 1:
			if(value < this.values[0])
				this.values.unshift(value);
			else
				this.values.push(value);
			break;
		case 2:
			if(value < this.values[0])
				this.values.unshift(value);
			else if(value > this.values[1])
				this.values.push(value);
			else{
				this.values[2] = this.values[1];
				this.values[1] = value;
			}
			break;
		}
	};
	this.RemoveValue = function(value){
		//remove value and re order array accordingly
		var size = this.values.length;
		switch(size)
		{
		case 1:
			if(value == this.values[0])
				this.values.pop(); 
			break;
		case 2:
			if(value == this.values[0])
				this.values.shift();
			else
				this.values.pop();
			break;
		case 3:
			if(value == this.values[0])
				this.values.shift();
			else if(value == this.values[2])
				this.values.pop();
			else{
				this.values[1] = this.values[2];
				this.values.pop();
			}
			break;
		}
		return value;
	};
	
	this.AddChild = function(newChild){
		//add child id to array
		if(this.children.length >= 2){
			var firstPos = this.children[0].slice(1);
			var newPos = newChild.slice(1);
			this.children.splice(newPos - firstPos, 0, newChild);
		}
		else{
			this.children.push(newChild);
		}
	};
}

function Tree234(){
	this.nodes = new Array();
	this.depth = -1;
	
	this.Reset = function(){
		EraseLines();
		//delete divs
		for(var level = 0; level < this.nodes.length ; level++){
		    for(var n = 0; n < this.nodes[level].length; n++){
		      var id = level.toString() + n.toString();
		      var child = document.getElementById(id);
		      var parent = document.getElementById('workarea');
		      parent.removeChild(child);
		    }
		}
		this.nodes = new Array();
		this.depth = -1;  
	};
	
	this.Insert = function(value){
		if(this.depth == -1){//if tree is empty, create root
			var newNode = new Node("00", 275, 0, "none");
			newNode.AddValue(value);
			this.nodes.push(new Array(newNode));
			this.depth++;
			CreateDivLevel(this.depth);
		}
		else if(this.depth == 0){//if tree only has root then or value
			if(this.nodes[0][0].values.length < 3){
				this.nodes[0][0].AddValue(value);
			}
			else{//if root.values is full, split the root
				this.depth++;
				this.SplitRoot(this.nodes[0][0]);
				CreateDivLevel(this.depth);
				this.Insert(value);
				drawLines = true;
			}
		}
		else{//all other cases
			var leaf = this.FindLeaf(value);
			var level = parseInt(leaf.id.charAt(0));
			var position = parseInt(leaf.id.slice(1));
			if (this.nodes[level][position].values.length < 3)
				this.nodes[level][position].AddValue(value);//add value
			else{
				//if node.values if full then split the node
				this.SplitNode(leaf);
				this.Insert(value);//re-insert value after split
				drawLines = true;
			}
		}
	};
	
	this.SplitRoot = function(node){
		//parse level and position from parent id
		var level = parseInt(node.id.charAt(0));
		var position = parseInt(node.id.slice(1));
		//add new level
		this.nodes.splice( 1, 0, new Array());
		//create first new child
		this.nodes[level + 1].push(new Node("", 0, 0, node.id));
		//create second new child
		this.nodes[level + 1].push(new Node("", 0, 0, node.id));
		//remove first and last values from parent and add those values to children
		this.nodes[1][0].AddValue(this.nodes[level][position].RemoveValue(this.nodes[level][position].values[0]));
		this.nodes[1][1].AddValue(this.nodes[level][position].RemoveValue(this.nodes[level][position].values[1]));
		//add children to parent
		this.nodes[level][position].children = new Array(2);
		if(this.depth > 1){
			this.nodes[level + 1][position].children = new Array(2);
			this.nodes[level + 1][position + 1].children = new Array(2);
		}
		//fix nodes
		this.CorrectNodes();
	};
	
	this.SplitNode = function(node){
		
		//parse level and position from node id
		var level = parseInt(node.id.charAt(0));
		var position = parseInt(node.id.slice(1));
		//parse level and position from node parent id
		var parentLevel = parseInt(node.parent.charAt(0));
		var parentPosition = parseInt(node.parent.slice(1));
		//split parent node if the parent.values is full
		if(this.nodes[parentLevel][parentPosition].values.length == 3){
			if(node.parent == "00"){
				this.depth++;
				this.SplitRoot(this.nodes[0][0]);
				CreateDivLevel(this.depth);
			}
			else
				this.SplitNode(this.nodes[parentLevel][parentPosition]);
				
			//parse level and position from node id
			var level = parseInt(node.id.charAt(0));   /////not sure if these need 4 lines need to be here but im not going to change them to find out :p
			var position = parseInt(node.id.slice(1));
			//parse level and position from node parent id
			var parentLevel = parseInt(node.parent.charAt(0));
			var parentPosition = parseInt(node.parent.slice(1));
		}
		//creat new node and place it in the array of nodes
		this.nodes[level].splice((position + 1), 0, new Node("", 0, 0, node.parent));
		//add space for children
		this.nodes[parentLevel][parentPosition].children = new Array(this.nodes[parentLevel][parentPosition].children.length + 1);
		//split children of the old node between the 2 new nodes
		if(this.nodes[level][position].children.length == 4){
			this.nodes[level][position].children = new Array(2);
			this.nodes[level][position + 1].children = new Array(2);
		}
		//add last value of original node to new node
		this.nodes[level][position + 1].AddValue(node.values[2]);
		//push middle value onto parent
		this.nodes[parentLevel][parentPosition].AddValue(node.values[1]);
		//remove last two values off of original node
		this.nodes[level][position].RemoveValue();
		this.nodes[level][position].RemoveValue();
		//fix nodes
		this.CorrectNodes();
	};
	
	this.Merge = function(node1, node2){
	};
	//realign left value for all nodes
	this.ReAlignChildren = function(){
		var level = this.nodes.length - 1;
		//fix left position for the highest level of children
		for(var position = 0; position < this.nodes[level].length; position++){
			this.nodes[level][position].left = position * (nodeWidth + buffer);
		}
		//create new left values based on position of children
		for(level = this.nodes.length - 2; level >= 0 ; level--){
			for(var position = 0; position < this.nodes[level].length; position++){
				var numberOfChildren = this.nodes[level][position].children.length;
				var childLevel = parseInt(this.nodes[level][position].children[0].charAt(0));
				var firstChildPosition = parseInt(this.nodes[level][position].children[0].slice(1));
				var lastChildPosition = parseInt(this.nodes[level][position].children[numberOfChildren - 1].slice(1));
				var firstChildLeft = this.nodes[childLevel][firstChildPosition].left;
				var lastChildRight = this.nodes[childLevel][lastChildPosition].left + nodeWidth;
				var newLeft = (((lastChildRight - firstChildLeft) / 2) - (nodeWidth / 2)) + firstChildLeft;
				this.nodes[level][position].left = newLeft;
			}
		}
	}
	//correct id's for all nodes
	this.CorrectNodes = function(){
		//highlighting
		setTimeout(function(){   
	  		document.getElementById("split").style.backgroundColor = "yellow";
	  	}, 400);
		setTimeout(function(){   
	  		document.getElementById("split").style.backgroundColor = "white";
	    }, 800);
		//loop through and figure out id's for all nodes.
		//also calculate what nodes have what children based 
		//on the room they have for children and how many children 
		//there are in the next level.
		var newPosition = position + 2;
		for(var level = 0; level < this.nodes.length; level++){
			var childPosition = 0;
			for(var position = 0; position < this.nodes[level].length; position++){
				var id = level.toString() + position.toString();
				var newTop = level * 50;
				this.nodes[level][position].id = id;
				this.nodes[level][position].top = newTop;
				if(level != this.nodes.length - 1){
					for(var child = 0; child < this.nodes[level][position].children.length; child++, childPosition++){
						this.nodes[level][position].children[child] = (level + 1).toString() + childPosition.toString();
					}
				}
			}
		}
		//corect id of parents for all nodes
		for(var level = 0; level < this.nodes.length; level++){
			for(var position = 0; position < this.nodes[level].length; position++){
				for(var child = 0; child < this.nodes[level][position].children.length; child++, childPosition++){
					var childLevel = parseInt(this.nodes[level][position].children[child].charAt(0));
					var childPosition = parseInt(this.nodes[level][position].children[child].slice(1));
					this.nodes[childLevel][childPosition].parent = level.toString() + position.toString();
				}
			}
		}
	}
	//finds a leaf for inserting values
	this.FindLeaf = function(value){
		var level = 0;
		var leaf = this.nodes[0][0];
		var leafFound = false;
		while (leafFound == false){
			if(leaf.children.length > 0){
				leaf = this.FindChild(leaf, value);
			}
			else{
				leafFound = true;
			}
		}
		return leaf;
	};
	//finds input value and returns the id of the node it is in.
	this.Find = function(value){
	  	//highlighting
		document.getElementById("find1").style.backgroundColor = "yellow";
		setTimeout(function(){   
	  		document.getElementById("find1").style.backgroundColor = "white";
	    }, 800);
		//loops through array to search for value
		for(var level = 0; level < this.nodes.length; level++){
			for(var position = 0; position < this.nodes[level].length; position++){
				for(var n = 0; n < this.nodes[level][position].values.length; n++){
					if (this.nodes[level][position].values[n] == value)
			   		{
				   			id = level.toString() + position.toString();
				  			 return id;
			   		}
				}
			  
			}
		}
		
	};
	//finds correct child that FindLeaf() should look into based and the input  of value.
	this.FindChild = function(node, value){
		var level = parseInt(node.id.charAt(0));
		var position = parseInt(node.id.slice(1));
		var firstChildPosition = parseInt(this.nodes[level][position].children[0].slice(1));
		var child = 0;
		var size = node.values.length;
		switch(size)
		{
		case 1://2-node
			if(value > node.values[0])
				child = 1;
			break;
		case 2://3-node
			if(value > node.values[1])
				child = 2;
			else if(value > node.values[0] && value < node.values[1])
				child = 1;
			break;
		case 3://4-node
			if(value > node.values[2])
				child = 3;
			else if(value > node.values[1] && value < node.values[2])
				child = 2;
			else if(value > node.values[0] && value < node.values[1])
				child = 1;
			break;
		}
		return this.nodes[level + 1][firstChildPosition + child];
	};
}
//creates div's for an entire level of the tree
//this is called whenever the root splits and a new level is added
function CreateDivLevel(level)
{
	//loops to create 4^level of div's. the maximum amount a level can contain based on the boundaries of 2-3-4
	for( var position = 0; position < Math.pow(4, level); position++){
		var id = level.toString() + position.toString();
		var newdiv = document.createElement('div');
		newdiv.setAttribute('id', id);
		newdiv.setAttribute('class', 'node');
		newdiv.setAttribute('name', 'node');
		newdiv.style.width = "75px";
		newdiv.style.height = "25px";
		newdiv.style.left = "0px";
		newdiv.style.top = "0px";
		newdiv.style.position = "absolute";
		newdiv.style.visibility = "hidden";
		newdiv.style.textAlign = "center";
		newdiv.style.verticalAlign = "middle";
		newdiv.style.color = "white";
		newdiv.style.backgroundImage= "url(/algo/images/algorithm/2-3-4/capsule.png)"
		var wrapperDiv = document.getElementById("workarea");
		wrapperDiv.appendChild(newdiv);
	}
};