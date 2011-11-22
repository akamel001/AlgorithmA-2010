/*********************************************************
*	Name:			Gerren Willis and Victor Herrera
*	File:			depthfirstSrc.js
*	Created:		February 14, 2010
*	Description: 	Depth-first search (DFS) is an algorithm for traversing or searching a tree, tree structure, or graph. One starts at the root (selecting some node as the root in the graph case) and explores as far as possible along each branch before backtracking. Formally, DFS is an uninformed search that progresses by expanding the first child node of the search tree that appears and thus going deeper and deeper until a goal node is found, or until it hits a node that has no children. Then the search backtracks, returning to the most recent node it hasn't finished exploring. In a non-recursive implementation, all freshly expanded nodes are added to a LIFO stack for exploration.

*	Dependencies:	jsAnim.js
*********************************************************/

var Tree = new Array();

Tree[0] = new Array ("one", "two"); //2d array that sets up the search tree for animation mode
Tree[1] = new Array ("one", "two");
Tree[2] = new Array ("one", "two");
Tree[3] = new Array ("one", "two");
Tree[4] = new Array ("one", "two");
Tree[5] = new Array ("one", "two");
Tree[6] = new Array ("one", "two");

Tree[0][0] = 50;  
Tree[0][1] = 20;  
Tree[0][2] = 80;  
Tree[1][0] = 20;  
Tree[1][1] = 10;  
Tree[1][2] = 30;  
Tree[2][0] = 10;  
Tree[2][1] = 5;  
Tree[2][2] = 15;  
Tree[3][0] = 30; 
Tree[3][1] = 25;  
Tree[3][2] = 35;  
Tree[4][0] = 80;  
Tree[4][1] = 70;  
Tree[4][2] = 90;  
Tree[5][0] = 70;  
Tree[5][1] = 65;  
Tree[5][2] = 75;  
Tree[6][0] = 90;  
Tree[6][1] = 85;  
Tree[6][2] = 95;  

var stpTree = new Array(); //single array that setups up the search tree for step mode

stpTree [0] = 50;
stpTree [1] = 20;
stpTree [2] = 10;
stpTree [3] = 5;
stpTree [4] = 15;
stpTree [5] = 30;
stpTree [6] = 25;
stpTree [7] = 35;
stpTree [8] = 80;
stpTree [9] = 70;
stpTree [10] = 65;
stpTree [11] = 75;
stpTree [12] = 90;
stpTree [13] = 85;
stpTree [14] = 95; 

var once = 1; // bool that stops multiple clicks of the animating button 

const leftChild = 1; //Tree's left child this value is used only in animate()
const rightChild = 2; //Tree's right child this value is used only in animate()
var parent = 0; //Tree's parent this value is used only in animate()
var top = 0; //Top of sub Tree this value is used only in animate()
var node = 0; // general node of the Tree this value is used only in animate()
var timer = 1000; 
var iter = 2; // 
var exflag = 0; //bool that if on means to pick up the extra node. Used only in animate() function


var counter = 1; // counter for pseudo code 
var value = 0; //input value to search the tree

var isAnimate = 0; //bool to flag if you are animateing
var isStep = 0; //bool to flag if you are stepping

var i = 0; //counter for every node in stpTree

var flag = 1; 
var flag1 = 1; 
var flag2 = 0;
var flag3 = 0; 

var found = 0; //bool is on if input value is found 

function Initialize()
{

/* REQUIRED */
	// Sets up your Concept and How-To buttons.
	document.getElementById("concept").onmouseover = function () {
		Tip("Depth-First Search (DFS) is an algorithm for traversing or searching a tree, tree structure, or graph. One starts at the root (selecting some node as the root in the graph case) and explores as far as possible along each branch before backtracking. DFS is an uninformed search that progresses by expanding the first child node of the search tree that appears and thus going deeper and deeper until a goal node is found, or until it hits a node that has no children. Then the search backtracks, returning to the most recent node it hasn't finished exploring. In a non-recursive implementation, all freshly expanded nodes are added to a stack for exploration",WIDTH, 600, FONTFACE, 'Verdana, sans-serif', FONTSIZE, '12pt',FONTCOLOR, '#000000',PADDING, 8, SHADOW, true, SHADOWCOLOR, '#CCCCCC', FADEIN, 400, FADEOUT, 800,CENTERMOUSE, true, OFFSETX, 0 ,BGCOLOR, '#FFFFCC');
	}
	document.getElementById("howto").onmouseover = function() {
		Tip("<strong>Search value</strong> - User will enter a value to be searched for<br />" +
		"<br /><strong>Insert</strong> - Will insert nodes with an input numeric value<br />" +
		"<br /><strong>Step</strong> - Will allow user to pause through animation<br />" +
		"<br /><strong>Previous</strong> - Will allow user to step through animation backward one step at a time<br />" +
		"<br /><strong>Reset</strong> - Reset to the initial layout when first loaded<br />"
		,WIDTH, 450, FONTFACE, 'Verdana, sans-serif', FONTSIZE, '11pt',FONTCOLOR, '#000000',PADDING, 8, SHADOW, true, SHADOWCOLOR, '#CCCCCC', FADEIN, 400, FADEOUT, 800,CENTERMOUSE, true, OFFSETX, 0 ,BGCOLOR, '#CEFFFF');
	}

}

/*********************************************************
*	Function Name: 			changeToGreen
*	Function Description:	swaps current circle with green circle
*********************************************************/
function changeToGreen(i) 
{
	document.getElementById(i).src = "/algo/images/algorithm/depthfirst/greencircle.gif";	
}
/*********************************************************
*	Function Name: 			changeToRed
*	Function Description:	swaps current circle with red circle
*********************************************************/
function changeToRed(i) 
{
    document.getElementById(i).src = "/algo/images/algorithm/depthfirst/redcircle.gif";
}
/*********************************************************
*	Function Name: 			changeToBlack
*	Function Description:	swaps current circle with black circle
*********************************************************/
function changeToBlack(i) 
{
    document.getElementById(i).src = "/algo/images/algorithm/depthfirst/circle.gif";
} 
/*********************************************************
*	Function Name: 			setTarget
*	Function Description:	grabs input value
*********************************************************/
function setTarget() 
{ 
	 value = document.getElementById("myText").value;	
}
/*********************************************************
*	Function Name: 			animate
*	Function Description: handels animation for automatice
searching
*********************************************************/
function animate() 
{ 

	if(!isStep)
	{
		isAnimate = 1; 
		pseudoCode(value); 
	
		if(node == rightChild)
		{
			changeToBlack(Tree[top][leftChild]); 
	    	iter++; 
			parent = 0;  
		}
		
		if(Tree[top][node] == value)
		{
			changeToRed(Tree[top][node]);
		 	return; 
		}
		
		else 
		{
	 		if(Tree[top][node] == 15 || Tree[top][node] == 35|| Tree[top][node] == 75)
			{
				//moves up the tree
				timer = 3000;
	
				if( Tree[top][node] == 35)
				{	
					exflag = 1; 
					timer = 4000; 
				}
		
				setTimeout(function(){																		  							document.getElementById("l8").style.backgroundColor = "white";
							document.getElementById("l4").style.backgroundColor = "yellow";
							changeToBlack(Tree[top][rightChild]);
							
							setTimeout(function(){
										changeToBlack(Tree[top][0]);
										if(exflag)
										{
											setTimeout(function(){
														changeToBlack(Tree[1][0]);
														}, 1000);
										}
										}, 1000);
							 }, 1000); 
	}
	
	else
	{
		timer = 1000; 
	}
	
	if(iter == 4)
	{

       iter++; 
	   parent = 0;
		
	} 
	 
	changeToGreen(Tree[top][node]);//continue moveing down the tree
	
	if(Tree[top][node] == 80)
	{
		document.getElementById("l4").style.backgroundColor = "white";
		document.getElementById("l8").style.backgroundColor = "yellow";
	}
	 
	if(node == leftChild)
	{
		parent = rightChild; 

	}
		
	node = parent;
	
	}
	
	setTimeout(function(){
			   if(top < iter)
			   {
					top++;
			   }
	
			   if(top == iter)
		   	   {
					parent = leftChild;
		   	   }
				animate();
				}, timer);
  }
  else
  {
	alert("you are in stepping mode please reset")
  }

}

/*********************************************************
*	Function Name: 			step
*	Function Description:	handels steping through
one by one animation
*********************************************************/
function step() 
{
	if(!isAnimate && !found)
	{
		isStep = 1; 
		
		if(i == 0) //highlight first line
		{
			document.getElementById("l1").style.backgroundColor = "yellow";
		}
		
		if(i<0)
		{
			i = 0; 
		}
		
		if(stpTree[i] == 15 && flag || stpTree[i] == 35 && flag || stpTree[i] == 75 && flag || stpTree[i           ]==95 && flag) //move up the tree
		{
			document.getElementById("l7").style.backgroundColor = "white";
			document.getElementById("l4").style.backgroundColor = "yellow";
			changeToBlack(stpTree[i-1]); 
			return flag = 0; 
		}
		
		if(stpTree[i] == 30 && flag1 || stpTree[i] == 80 && flag1 || stpTree[i] == 90 && flag1)
		{ //move up the tree
			document.getElementById("l8").style.backgroundColor = "white";
			document.getElementById("l4").style.backgroundColor = "yellow";
		
			if(!flag2)
			{
				changeToBlack(stpTree[i-1]);
				flag2 = 1; 
				return;
			}
			
			if(flag2)
			{
			  changeToBlack(stpTree[i-3]);
			  flag1 =0;
			  flag3 = 1; 
			  return;
			}
					
		}
	
		if(stpTree[i] == 80 && flag3)
		{ //finsh moveing up the tree 
			document.getElementById("l4").style.backgroundColor = "yellow";
		    changeToBlack(stpTree[1]);
			flag3 = 0; 
			return; 
		}
	
		if(stpTree[i] == value)
		{//search found input value
	   		changeToRed(stpTree[i]);
			found = 1; 
			document.getElementById("l3").style.backgroundColor = "yellow";
		 	document.getElementById("l1").style.backgroundColor = "white";
		 	for(var it = 4; it<=8; it++)
		 	{
			 	document.getElementById("l"+it).style.backgroundColor = "white"; 
		 	}
			
		 	return; 
		}
	
		else
		{//highlighting pseudo code
		 	document.getElementById("l3").style.backgroundColor = "white";
			if(i == 1)
			{
		 	  	document.getElementById("l1").style.backgroundColor = "white";
		 		document.getElementById("l7").style.backgroundColor = "yellow";
			}
	
			if(i == 4)
			{
				document.getElementById("l4").style.backgroundColor = "white";
				document.getElementById("l8").style.backgroundColor = "yellow";
			}
		
			if(i == 5)
			{
				document.getElementById("l4").style.backgroundColor = "white";
				document.getElementById("l8").style.backgroundColor = "yellow";
			}
			
			if(i == 6)
			{
				document.getElementById("l8").style.backgroundColor = "white";
				document.getElementById("l7").style.backgroundColor = "yellow";
			}
			
			if(i == 7)
			{
				document.getElementById("l4").style.backgroundColor = "white";
				document.getElementById("l8").style.backgroundColor = "yellow";
			}
			
			if( i == 8)
			{
				document.getElementById("l4").style.backgroundColor = "white";
				document.getElementById("l8").style.backgroundColor = "yellow";
			}
			
			if( i == 9)
			{
				document.getElementById("l8").style.backgroundColor = "white";
				document.getElementById("l7").style.backgroundColor = "yellow";
			}
	
			if( i == 11)
			{
				document.getElementById("l4").style.backgroundColor = "white";
				document.getElementById("l8").style.backgroundColor = "yellow";
			}
		
			if( i == 12)
			{
				document.getElementById("l4").style.backgroundColor = "white";
				document.getElementById("l8").style.backgroundColor = "yellow";
			}
			
			if( i == 13)
			{
				document.getElementById("l8").style.backgroundColor = "white";
				document.getElementById("l7").style.backgroundColor = "yellow";
			}
			
			if( i == 14)
			{
				document.getElementById("l4").style.backgroundColor = "white";
				document.getElementById("l8").style.backgroundColor = "yellow";
			}
	
			changeToGreen(stpTree[i]); //if all other conditions are not met continue moveing 		down the tree 
			
			flag1 = 1; 
			flag2 = 0; 
			flag = 1; 
			
			i++;
			
			if(i>15) 
			{
			i = 15; 
			}		
		}
	
	}
 	
	if(isAnimate)//prevents user from steping and animateing at the same time
	{
		alert("you are in animating mode please reset")
	}
         
}

/*********************************************************
*	Function Name: 			stepBack
*	Function Description:	handels steping back
one by one animation
*********************************************************/
function stepBack()
{
	if(!isAnimate && !found)
	{
		if(i<0)
		{
			i = 0; 
		}
	
	
		if(stpTree[i] == 80 && !flag3)
		{  //going back down the tree
			changeToGreen(stpTree[1]);
			flag3 = 1; 
			return; 
		}
		
		if(stpTree[i] == 30 && !flag1 || stpTree[i] == 80 && !flag1 || stpTree[i] == 90 && !					           flag1)
		{ // going back down the tree			 
			if(flag2)
			{	 
				changeToGreen(stpTree[i-3]);
				flag2 = 0; 
				return;
			}
			
			if(!flag2)
			{			
			  changeToGreen(stpTree[i-1]);
			  flag1 =1;
			  flag3 = 0; 
			  return;
			}				
		}
		
		i--;
		
		changeToBlack(stpTree[i]); //if all other conditions are not met continue going back up the tree
		flag1 = 0; 
		flag2 = 1; 
		
		if(i<0)
		{
			i = 0; 
		}
		
		if(stpTree[i] == 15 || stpTree[i] == 35 || stpTree[i] == 75 || stpTree[i] == 95)
		{
			//going back down the tree
			changeToGreen(stpTree[i-1]); 
		}	
		
		for(var it = 1; it<=8; it++)
		{
			//cleans up any remaining pseudo code highlights
			document.getElementById("l"+it).style.backgroundColor = "white"; 
		}
	}
	
	if(isAnimate)//prevents user from steping and animateing at the same time
	{
	alert("you are in animating mode please reset")
	}	
}
/*********************************************************
*	Function Name: 			pseudoCode
*	Function Description:   highlights pseudo code during animation
*********************************************************/
function pseudoCode(value)
{		
	 
	 if(Tree[top][node] == value)
	 { //highlight return integer signifying value has been found
	 	document.getElementById("l3").style.backgroundColor = "yellow";
		document.getElementById("l1").style.backgroundColor = "white"; 
		 
		for(var it = 4; it<=8; it++)//cleans up other lines that maybe highlighted
		{
			document.getElementById("l"+it).style.backgroundColor = "white"; 
		}
		 
		return; 
	}
	
	else
	{
		document.getElementById("l3").style.backgroundColor = "white";
			
		if(counter ==1)
		{
			//highlight first line in red
			document.getElementById("l1").style.backgroundColor = "yellow";
			counter++; 
			return; 
		}
				
		if(counter ==2)
		{
			//unhighlight first line and then highlight seventh line
			document.getElementById("l1").style.backgroundColor = "white";
			document.getElementById("l7").style.backgroundColor = "yellow"; 
			counter++;
			return; 
		}

		if(counter ==3)
		{			
	  		//unhighlight seventh line and then highlight fourth line
			setTimeout(function(){
			document.getElementById("l7").style.backgroundColor = "white";
			document.getElementById("l4").style.backgroundColor = "yellow";
			}, 1000);
			counter++;
			return;
		}
			
		if (counter ==4)
		{
			setTimeout(function(){
			document.getElementById("l4").style.backgroundColor = "white";
			document.getElementById("l8").style.backgroundColor = "yellow";
			}, 1000);
			counter++;
			return;
		}

		if (counter ==5)
		{
			setTimeout(function(){
			document.getElementById("l8").style.backgroundColor = "white";
			document.getElementById("l4").style.backgroundColor = "yellow";
			}, 1000);
			counter++;
			return;
		}
			
		if (counter ==6)
		{
			document.getElementById("l4").style.backgroundColor = "white";
			document.getElementById("l8").style.backgroundColor = "yellow";
		
			counter++;
			return;
		}
			
		
		if (counter ==7)
		{
			counter++;
			document.getElementById("l8").style.backgroundColor = "white";
			document.getElementById("l7").style.backgroundColor = "yellow";
			return;
		}
			
		if (counter ==8)
		{
			counter++; 	
			document.getElementById("l7").style.backgroundColor = "white";
			document.getElementById("l8").style.backgroundColor = "yellow";		
			return;
		}
			
		if (counter ==9)
		{
			counter++; 	
			document.getElementById("l8").style.backgroundColor = "white";
			document.getElementById("l4").style.backgroundColor = "yellow";		
			return;
		}
		
		if (counter ==10)
		{
			counter++; 
			document.getElementById("l8").style.backgroundColor = "white";
			document.getElementById("l7").style.backgroundColor = "yellow";
			return;
		}
		
		if (counter ==11)
		{
			counter++; 
			setTimeout(function(){
			document.getElementById("l7").style.backgroundColor = "white";
			document.getElementById("l8").style.backgroundColor = "yellow";
			}, 1000);		
			return;
		}
					
		if (counter ==12)
		{
			counter++; 
			setTimeout(function(){
			document.getElementById("l4").style.backgroundColor = "white";
			document.getElementById("l8").style.backgroundColor = "yellow";
			}, 3000);			
			return;
		}
			
		if (counter ==13)
		{
			counter++; 
			setTimeout(function(){
			document.getElementById("l8").style.backgroundColor = "white";
			document.getElementById("l7").style.backgroundColor = "yellow";
			}, 1000);
			return;
		}
			
		if (counter ==14)
		{
			counter++; 
			setTimeout(function(){
			document.getElementById("l7").style.backgroundColor = "white";
			document.getElementById("l8").style.backgroundColor = "yellow";
			}, 1000);
			
			return;
		}
			
	}

}