/**************************** 
*   Name:           Derrick Keith
*	Partner:		Tim Herr
*	Team: 			A
*   File:           mergeSor.js 
*   Project:        AlgorithmA 2010 
*   Date            Created: March 7, 2010 
*   Date            Modded: March 22, 2010 
*
*   Purpose: The of this file is to use javaScript to animate Merge Sort Algorithm
*     
*   Dependencies: 
*               jsAnim.js, pbMan.js, wz_tooltip.js
* 
*    
*   Notes/Changelog: 
*	  	Note(1) Idea
*    
*
* Functions:
*   Initialize()       												: 
*****************************/ 

var manager = new jsAnimManager(40); // Manager for js Animation, 40 means number of frames per second. Default is 40 if not specified

//Called on HTML load, Draws everything on the screen

function Initialize() 
{
    setButtonEnable('stop',1);
    setButtonEnable('start',1);
    setButtonEnable('step',1);
    setButtonEnable('reset',1);                   
/*--------------------
    Concept & HowTo's
    
*/	
	document.getElementById("concept").onmouseover = function () 
    {
	   Tip(
       "The Merge Sort algorithm is a sorting algorithm that is similar to Quick Sort. "+
       "Merge Sort has a complexity of O(n log(n)) and is therefore an optimal sort. "+
       " The Merge Sort is based on a 'divide and conquer' strategy. "+
       " First, the sequence of data to be sorted is divided into two approximately equal halves recursively"+ 
       " until the array becaomes a single sorted array with one element. "+ 
       " Each half is recursiv sorted and then the two halves are merged into a sorted sequence.",
       WIDTH, 
       500, 
       FONTFACE, 
       'Verdana, sans-serif', 
       FONTSIZE, '12pt',
       FONTCOLOR, '#000000',
       PADDING, 8, 
       SHADOW, true, 
       SHADOWCOLOR, '#CCCCCC', 
       FADEIN, 400, 
       FADEOUT, 800,
       CENTERMOUSE, true, 
       OFFSETX, 0 ,
       BGCOLOR, '#FFFFCC');
	}
	document.getElementById("howto").onmouseover = function() 
    {
	   Tip(
       "<strong>Start</strong> - Starts the Merge Sort animation <br /><br /><strong>"+
       "Stop</strong> - Stops the animation at its current location<br /><br /><strong>"+
       "Step</strong> - Steps through the animation<br /><br /><strong>"+
       "Reset</strong> - Resets the animation",
       WIDTH, 400, 
       FONTFACE, 'Verdana, sans-serif', 
       FONTSIZE, '12pt',
       FONTCOLOR, '#000000',
       PADDING, 8, 
       SHADOW, true, 
       SHADOWCOLOR, '#CCCCCC', 
       FADEIN, 400, 
       FADEOUT, 800,
       CENTERMOUSE, true, 
       OFFSETX, 0 ,
       BGCOLOR, '#CEFFFF');
	}
}
/*
	FUNCTION: StartAnimation() 
	Description
	-----------
	Starts Animation, nStarted is set off (0). When Start Button is pressed, it is set to 1. Stopped is set to 0 than StepAnimation is called and the button is disabled 
*/
var nStarted = 0;
function StartAnimation() 
{
    nStarted = 1;
    if(nStopped == 0)
    {
        StepAnimation();
        setButtonEnable('start',0);
		setButtonEnable('stop',1);
    }
}
/*
	FUNCTION: StepAnimation() 
	Description
	-----------
	The function contains 45 different animation. At the end of the function nStep is incremented by 1. 
*/
var nStep = 0;
function StepAnimation() 
{
	if(nStopped == 1 && nStarted == -1)
	{
		StepAnimation()
	}
	setButtonEnable('step',0);
	setButtonEnable('start',0);
	//  -- Animation One
	if(nStep == 0)
	{
        setPsuedoHL('p1',0);
        MoveBox(0,-10,96);
        MoveBox(1,-10,96);
        MoveBox(2,-10,96);
        MoveBox(3,-10,96);                        
        MoveBox(4,-10,96);	
		{
            setTimeout("setButtonEnable('step',1)",1200);	
		}
	}
	if(nStep == 1)
	{
        setPsuedoOut('p1');
        setPsuedoHL('p2',0);
        MoveBox(5,10,96);        
        MoveBox(6,10,96);
        MoveBox(7,10,96);
        MoveBox(8,10,96);
        MoveBox(9,10,96);		
		{
            setTimeout("setButtonEnable('step',1)",1200);	
		}
	}	
	//  Animation Two
	if(nStep == 2)
	{
        setPsuedoOut('p2',0);
        setPsuedoHL('p3',0);
		setPsuedoHL('p1',0);
        MoveBox(0,-10,96);
        MoveBox(1,-10,96);
        MoveBox(2,-10,96);
		if(nStarted == 0 )
		{
            setTimeout("setButtonEnable('step',1)",1000);	
		}	    	
     }
	if(nStep == 3)
	{
        setPsuedoOut('p3',0);
        setPsuedoHL('p2',0);		
        setPsuedoHL('p4',0);
		MoveBox(3,0,96);                        
        MoveBox(4,0,96);
        MoveBox(5,0,96);        
        MoveBox(6,0,96);
        MoveBox(7,0,96);
        MoveBox(8,10,0);
        MoveBox(9,10,0);		
		if(nStarted == 0 )
		{
            setTimeout("setButtonEnable('step',1)",1000);	
		}	    	
     }	 
	//S <- Empty -- Animation Four
	if(nStep == 4)
	{  
		setPsuedoHL('p2',0);
		MoveBox(0,-10,96);                        
        MoveBox(1,-10,96);	
        MoveBox(2,0,96);			
		MoveBox(3,0,96);                        
        MoveBox(4,10,96);
        MoveBox(5,0,96);        
        MoveBox(6,0,96);
        MoveBox(7,10,96);
        MoveBox(8,10,96);
        MoveBox(9,10,96);			
		if(nStarted == 0 )
		{
            setTimeout("setButtonEnable('step',1)",800);	
		}	        				
	}
	if(nStep == 4)
	{  
		setPsuedoHL('p2',0);
		setPsuedoHL('p3',0);		
		MoveBox(0,-10,96);                        
        MoveBox(1,-10,96);	
        MoveBox(2,0,96);			
		MoveBox(3,0,96);                        
        MoveBox(4,10,96);
        MoveBox(5,0,96);        
        MoveBox(6,0,96);
        MoveBox(7,10,96);
        MoveBox(8,0,96);
        MoveBox(9,10,96);			
		if(nStarted == 0 )
		{
            setTimeout("setButtonEnable('step',1)",800);	
		}	        				
	}	
	if(nStep == 5)
	{
		setPsuedoOut('p2',0);
		setPsuedoOut('p3',0);
		setPsuedoOut('p1',0);
		setPsuedoOut('p4',0);		
		setPsuedoHL('p5',0);		
		MoveBox(0,-10,96);                        
        MoveBox(1,0,96);	
        MoveBox(2,0,96);			
		MoveBox(3,0,96);                        
        MoveBox(4,0,96);
        MoveBox(5,0,96);        
        MoveBox(6,10,96);
        MoveBox(7,10,96);
        MoveBox(8,20,192);
        MoveBox(9,20,192);			
		if(nStarted == 0 )
		{
            setTimeout("setButtonEnable('step',1)",800);	
		}	      				
	}	 
	if(nStep == 6)
	{
        setPsuedoOut('p5',0);
        setPsuedoHL('p7',0);
        setPsuedoHL('p8',0);		
        setPsuedoHL('p9',0);
        setPsuedoHL('p10',0);
        setPsuedoHL('p12',0);
		MoveBox(0,0,-76);                        
        MoveBox(1,-10,-76);	
        MoveBox(2,0,-76);			
		MoveBox(3,-10,-76);                        
        MoveBox(4,0,-76);
        MoveBox(5,-10,-76);        
        MoveBox(6,0,-76);
        MoveBox(7,-10,-76);
        MoveBox(8,0,-76);
        MoveBox(9,-10,-76);
		if(nStarted == 0 )
		{
            setTimeout("setButtonEnable('step',1)",800);	
		}	        				
	}
	if(nStep == 7)
	{
        setPsuedoOut('p7',0);
        setPsuedoOut('p8',0);		
        setPsuedoHL('p9',0);
        setPsuedoOut('p12',0);
		MoveBox(0,0,-76);                                       
		MoveBox(6,-120,-76);
        MoveBox(8,0,-76);
		if(nStarted == 0 )
		{
            setTimeout("setButtonEnable('step',1)",800);	
		}	        				
	}
	if(nStep == 8)
	{
        setPsuedoOut('p8',0);		
        setPsuedoOut('p10',0);
		MoveBox(2,-70,-76);                                       
		MoveBox(7,-120,-76);
        MoveBox(9,0,-76);
		if(nStarted == 0 )
		{
            setTimeout("setButtonEnable('step',1)",800);	
		}	        				
	}
	if(nStep == 9)
	{
        setPsuedoOut('p5',0);
        setPsuedoOut('p7',0);
        setPsuedoOut('p8',0);		
        setPsuedoHL('p9',0);
        setPsuedoOut('p10',0);
        setPsuedoOut('p12',0);
		MoveBox(3,-70,-76);                                       
		MoveBox(4,100,-76);
		MoveBox(8,0,-76);
		MoveBox(9,0,-76);
		if(nStarted == 0 )
		{
            setTimeout("setButtonEnable('step',1)",800);	
		}	        				
	}	
	if(nStep == 10)
	{
        setPsuedoOut('p5',0);
        setPsuedoOut('p7',0);
        setPsuedoOut('p8',0);		
        setPsuedoHL('p9',0);
        setPsuedoOut('p10',0);
        setPsuedoOut('p12',0);
		MoveBox(1,100,-76);                                       
		MoveBox(5,100,-76);
		if(nStarted == 0 )
		{
            setTimeout("setButtonEnable('step',1)",800);	
		}	        				
	}
	if(nStep == 11)
	{
        setPsuedoOut('p5',0);
        setPsuedoOut('p7',0);
        setPsuedoOut('p8',0);		
        setPsuedoHL('p9',0);
        setPsuedoOut('p10',0);
        setPsuedoOut('p12',0);
		MoveBox(0,0,-76);                                       
		MoveBox(1,0,-76);
		MoveBox(2,0,-76);                                       
		MoveBox(3,0,-76);
		MoveBox(4,0,-76);                                       
		MoveBox(5,0,-76);
		MoveBox(6,0,-76);                                       
		MoveBox(7,0,-76);		
		if(nStarted == 0 )
		{
            setTimeout("setButtonEnable('step',1)",800);	
		}	        				
	}
	if(nStep == 12)
	{
        setPsuedoOut('p5',0);
        setPsuedoOut('p7',0);
        setPsuedoOut('p8',0);		
        setPsuedoHL('p9',0);
        setPsuedoOut('p10',0);
        setPsuedoOut('p12',0);
		MoveBox(0,0,-76);                                       		
		if(nStarted == 0 )
		{
            setTimeout("setButtonEnable('step',1)",800);	
		}	        				
	}
	if(nStep == 13)
	{
        setPsuedoOut('p5',0);
        setPsuedoOut('p7',0);
        setPsuedoOut('p8',0);		
        setPsuedoHL('p9',0);
        setPsuedoOut('p10',0);
        setPsuedoOut('p12',0);
		MoveBox(6,-190,-76);                                       		
		if(nStarted == 0 )
		{
            setTimeout("setButtonEnable('step',1)",800);	
		}	        				
	}		
	if(nStep == 14)
	{
        setPsuedoOut('p5',0);
        setPsuedoOut('p7',0);
        setPsuedoOut('p8',0);		
        setPsuedoHL('p9',0);
        setPsuedoOut('p10',0);
        setPsuedoOut('p12',0);
		MoveBox(7,-190,-76);                                       		
		if(nStarted == 0 )
		{
            setTimeout("setButtonEnable('step',1)",800);	
		}	        				
	}		
	if(nStep == 15)
	{
        setPsuedoOut('p5',0);
        setPsuedoOut('p7',0);
        setPsuedoOut('p8',0);		
        setPsuedoHL('p9',0);
        setPsuedoOut('p10',0);
        setPsuedoOut('p12',0);
		MoveBox(2,100,-76);                                       		
		if(nStarted == 0 )
		{
            setTimeout("setButtonEnable('step',1)",800);	
		}	        				
	}		
	if(nStep == 16)
	{
        setPsuedoOut('p5',0);
        setPsuedoOut('p7',0);
        setPsuedoOut('p8',0);		
        setPsuedoHL('p9',0);
        setPsuedoOut('p10',0);
        setPsuedoOut('p12',0);
		MoveBox(4,-150,-76);                                       		
		if(nStarted == 0 )
		{
            setTimeout("setButtonEnable('step',1)",800);	
		}	        				
	}
	if(nStep == 17)
	{
        setPsuedoOut('p5',0);
        setPsuedoOut('p7',0);
        setPsuedoOut('p8',0);		
        setPsuedoHL('p9',0);
        setPsuedoOut('p10',0);
        setPsuedoOut('p12',0);
		MoveBox(3,140,-76);                                       		
		if(nStarted == 0 )
		{
            setTimeout("setButtonEnable('step',1)",800);	
		}	        				
	}
	if(nStep == 18)
	{
        setPsuedoOut('p5',0);
        setPsuedoOut('p7',0);
        setPsuedoOut('p8',0);		
        setPsuedoHL('p9',0);
        setPsuedoOut('p10',0);
        setPsuedoOut('p12',0);
		MoveBox(5,-100,-76);                                       		
		if(nStarted == 0 )
		{
            setTimeout("setButtonEnable('step',1)",800);	
		}	        				
	}	
	if(nStep == 19)
	{
        setPsuedoOut('p5',0);
        setPsuedoOut('p7',0);
        setPsuedoOut('p8',0);		
        setPsuedoHL('p9',0);
        setPsuedoOut('p10',0);
        setPsuedoOut('p12',0);
		MoveBox(1,190,-76);                                       		
		if(nStarted == 0 )
		{
            setTimeout("setButtonEnable('step',1)",800);	
		}	        				
	}
	if(nStep == 20)
	{
        setPsuedoOut('p5',0);
        setPsuedoOut('p7',0);
        setPsuedoOut('p8',0);		
        setPsuedoHL('p9',0);
        setPsuedoOut('p10',0);
        setPsuedoOut('p12',0);
		MoveBox(0,0,-76);
		MoveBox(8,0,-76);
		MoveBox(9,0,-76);
		if(nStarted == 0 )
		{
            setTimeout("setButtonEnable('step',1)",800);	
		}	        				
	}
	if(nStep == 21)
	{
        setPsuedoOut('p5',0);
        setPsuedoOut('p7',0);
        setPsuedoOut('p8',0);		
        setPsuedoHL('p9',0);
        setPsuedoOut('p10',0);
        setPsuedoOut('p12',0);
		MoveBox(8,-440,-76);
		if(nStarted == 0 )
		{
            setTimeout("setButtonEnable('step',1)",800);	
		}	        				
	}		
	if(nStep == 22)
	{
        setPsuedoOut('p5',0);
        setPsuedoOut('p7',0);
        setPsuedoOut('p8',0);		
        setPsuedoHL('p9',0);
        setPsuedoOut('p10',0);
        setPsuedoOut('p12',0);                                       
		MoveBox(1,40,-76);
		MoveBox(2,40,-76);                                       
		MoveBox(3,40,-76);
		MoveBox(4,40,-76);                                       
		MoveBox(5,40,-76);
		MoveBox(6,40,-76);                                       
		MoveBox(7,40,-76);
		if(nStarted == 0 )
		{
            setTimeout("setButtonEnable('step',1)",800);	
		}	        				
	}	
	if(nStep == 23)
	{
        setPsuedoOut('p5',0);
        setPsuedoOut('p7',0);
        setPsuedoOut('p8',0);		
        setPsuedoHL('p9',0);
        setPsuedoOut('p10',0);
        setPsuedoOut('p12',0);                                                                             
		MoveBox(9,-100,-76);
		if(nStarted == 0 )
		{
            setTimeout("setButtonEnable('step',1)",800);	
		}	        				
	}		
	if(nStarted == 1 )
	{
	   setTimeout("UpdateStart()",1000);
	}
    if(nStarted == 0 )
    {	
	   nStep++;
    }
}
// Increments animation and calls StepAnimation for the next animation to animate
function UpdateStart()
{
    nStep += 1
	setTimeout("StepAnimation()",1000);
}
//Stops Animation
var nStopped = 0
function StopAnimation()
{
	if( nStopped == 0 )
	{
		nStarted = -1;
        nStopped = 1;
		changeTxt('stop',"Resume");
	}
	else if( nStopped == 1 )
	{
		nStopped = 0;
		nStarted = 1;
		changeTxt('stop',"Stop");
		setButtonEnable('step',1);
		StepAnimation();
	}
}
//Reloads the page
function ResetAnimation() 
{
	window.location.reload(true);
}
/*
	FUNCTION: setButtonEnable( ID , SWITCH )   
	Description
	-----------
	Retrieves the ID of the specified div and sets the property of the button to false (disable).
*/
function setButtonEnable(ID,SWITCH) 
{
	if(SWITCH == 1)
	{
		document.getElementById(""+ID+"").disabled = false;
	}
	if(SWITCH == 0)
	{
		document.getElementById(""+ID+"").disabled = true;
	}
}
/*
	FUNCTION: setOpacity(ID,OPACITY,TIME)
	Description
	-----------
	Changes background color from white to yellow.
*/
function setPsuedoHL(ID,TIME) 
{
	var anim = manager.createAnimObject(""+ID+"");  
  	anim.add
	({
			  property: 	Prop.backgroundColor, 
			  to: 			new Col(255,255,00),  
    		  duration:		1000
	 });
}
/*
	FUNCTION: setOpacity(ID,OPACITY,TIME)
	Description
	-----------
	Changes background color back to white from yellow.
*/
function setPsuedoOut(ID) 
{
	var anim = manager.createAnimObject(""+ID+"");  
  	anim.add
	({
			  property: 	Prop.backgroundColor, 
			  to: 			new Col(255,255,255),  
    		  duration:		0
	 });
}
/*
	FUNCTION: Move(id,x,y,time)
	Description
	-----------
	Moxes Div boxes by divId, X position , Y position
*/
function Move(id,x,y,time) 
{
	var anim = manager.createAnimObject(""+id+"");  
   	anim.add({property: Prop.position, to: new Pos(x,y),   
     duration: time,
	 ease:	jsAnimEase.parabolicNeg  
	 });
}
/*
	FUNCTION: MoveBox(bId,posx,posy)
	Description
	-----------
	Moxes Div boxes relative to the current position by divId, X position , Y position
*/
function MoveBox(bId,posx,posy)
{
    var topPosition = document.getElementById("box"+bId).offsetTop;
    topPosition += posy; 
    var leftPosition = document.getElementById("box"+bId).offsetLeft;
    leftPosition += posx;
    Move('box'+bId,leftPosition,topPosition, 1000);               
}
/*
	FUNCTION: setOpacity(ID,OPACITY,TIME)
	Description
	-----------
	Gets the element within the specified divID and replaces it with 
	whatever TXT indicated in TXT. 
*/
function changeTxt(ID,TXT) {
    document.getElementById(""+ID+"").innerHTML = TXT; 
}