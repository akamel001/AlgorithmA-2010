/**************************** 
*   Name:           Derrick Keith
*	Partner:		Tim Herr
*	Team: 			A
*   File:           dijkstras.js 
*   Project:        AlgorithmA 2010 
*   Date            Created: March 7, 2010 
*   Date            Modded: March 22, 2010 
*
*   Purpose: The of this file is to use javaScript to animate Dijkstra's Algorithm
*     
*   Dependencies: 
*               jsAnim.js, pbMan.js, jquery-latest.js, wz_tooltip.js
* 
*    
*   Notes/Changelog: 
*	  	Note(1) Idea
*		- Every Edge Weight could take in an input and the graph could find the shortest path based on the inputs entered.
*		- User could have the option to click a starting node say A (Change color to indicate it was selected) and a final node say E(Change Color to indicate it was selected). 
*			Animation will locate the shortest path to the points selected.
*		- For look, User could have the option to change the nodes to images s.a. Countries, Places, Houses .....
*    
*
* Functions:
*   Initialize()       												: Draws graph onto the screen and Dijkstra's table  
*   setEase()           											: Eases a color from background color to a color specified and duration.
*   setAllGraphLines()           									: Draws all the lines nodes 
*   StartAnimation()         										: Starts Animation by setting start variable to 1 and setting stops to 0, then calls StepAnim and disables start button* 
*   StepAnimation()          										: Steps through 45 animations, disables start and step then increments by 1 at the end.
*	UpdateStart()													: Increments step by and calls StepAnim to continue animation
*	ResetAnim()														: Reloads page.
* 	setButtonEnable(ID,SWITCH)										: Disables or Enables buttons 
*	DrawGraphLineColor(FROMX,FROMY,TOX,TOY,RED,GREEN,BLUE,DURATION)	: Draws Line with RGB.
*	setOpacity(ID,OPACITY,TIME) 									: Eases the Opacity of Images or divId's
*   setEase(ID,RED,GREEN,BLUE,TIME) 								: Eases background color of divId specified
*   setPsuedoHL(ID,TIME) 											: Default Yellow background Higlight 
*   setPsuedoOut(ID)												: Default White background Highlight
*	changeTxt(ID,TXT) 												: Changes txt within HTML
*****************************/ 

var manager = new jsAnimManager(40); // Manager for js Animation, 40 means number of frames per second. Default is 40 if not specified

//Called on HTML load, Draws everything on the screen
function Initialize()
{
	setEase('A',00,00,00,1000); // Eases divA from white to black with a duration of a second
	setEase('B',00,00,00,1000);
	setEase('C',00,00,00,1000);
	setEase('D',00,00,00,1000);
	setEase('E',00,00,00,1000);	
	
	//Draws the Graph lines
	DrawGraphLineColor(78,120,221,60,0,0,0,2000);// A to B
	DrawGraphLineColor(77,150,186,180,0,0,0,2000);//A to C
	DrawGraphLineColor(291,50,418,50,0,0,0,2000); //B to D
	DrawGraphLineColor(243,79,210,168,0,0,0,2000); //B to C
	DrawGraphLineColor(244,182,431,70,0,0,0,2800);//C to D	
	DrawGraphLineColor(250,200,358,200,0,0,0,2000);//C to E
	DrawGraphLineColor(400,168,438,76,0,0,0,2000);//E to D
    
	//Sets the Dijkstras table to be transparent 
	for( i = 0; i < 6; i++ )
	{
		setOpacity('nVertex'+i,0.0,0);
		setOpacity("DT-A1"+i+"",0.0,0);		
		setOpacity("DT-A2"+i+"",0.0,0);
		setOpacity("DT-A3"+i+"",0.0,0);
		setOpacity("DT-A4"+i+"",0.0,0);
		setOpacity("DT-A5"+i+"",0.0,0);
		setOpacity("DT-A6"+i+"",0.0,0);		
		setOpacity("ST-A"+i+"",0.0,0);
	}
	//Enable all buttons
	setTimeout("setButtonEnable('start',1)",3000);
	setTimeout("setButtonEnable('step',1)",3000);
	setTimeout("setButtonEnable('reset',1)",3000);	
	setTimeout("setButtonEnable('pause',1)",3000);
	//Tool Tip
	document.getElementById("concept").onmouseover = function () 
    {
	   Tip(
       "The Dijkstra's algorithm is a grap search algorithm to find the shortest path for a graph with nonnegative edge path costs. "+
       "Dijkstra's Algorithm has a complexity of O(V+ E).  "+
       " The Merge Sort is based on a 'divide and conquer' strategy. "+
       " For any vertex (v) in the graph, the algorithm finds the path with the lowest cost between the vertex to another vertex. "+ 
       " Another use for this algorithm is to find the lowest cost path from a certain destination to a final destination . ", 
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
       "<strong>Start</strong> - Starts the Dijkstra's animation.<br /><br /><strong>"+
       "Stop</strong> - Stops the animation at its current location.<br /><br /><strong>"+
       "Step</strong> - Steps through the algorithm as the animation is shown.<br /><br /><strong>"+
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
	// d[u] <- 0 -- Animation One
	if(nStep == 0)
	{
		setPsuedoHL('p0',500);
		setOpacity('DT-A11',1.0,1000);
		if(nStarted == 0 )
		{
            setTimeout("setButtonEnable('step',1)",1200);	
		}
	}
	// for each v in the set V do -- Animation Two
	if(nStep == 1)
	{
        setPsuedoOut('p0');
    	setPsuedoHL('p1',0);
    	setEase('B',0,0,255,500);
    	setEase('C',0,0,255,500);
    	setEase('D',0,0,255,500);
    	setEase('E',0,0,255,500);                    	
		if(nStarted == 0 )
		{
            setTimeout("setButtonEnable('step',1)",1000);	
		}	    	
     }
     //d <- inifin -- Animation Three
     if(nStep == 2)
     {
        setPsuedoOut('p1');        
    	setEase('B',0,0,0,500);
    	setEase('C',0,0,0,500);
    	setEase('D',0,0,0,500);
    	setEase('E',0,0,0,500);            	
		setPsuedoHL('p2',0);
	   setTimeout("setOpacity('DT-A12',1.0,500)",300);
	   setTimeout("setOpacity('DT-A13',1.0,500)",600);
	   setTimeout("setOpacity('DT-A14',1.0,500)",900);
	   setTimeout("setOpacity('DT-A15',1.0,500)",1200);
	   setTimeout("setOpacity('DT-A16',1.0,500)",1500);
	   setTimeout("setOpacity('nVertex0',1.0,500)",300);	   
	   setTimeout("setOpacity('nVertex1',1.0,500)",300);
	   setTimeout("setOpacity('nVertex2',1.0,500)",600);
	   setTimeout("setOpacity('nVertex3',1.0,500)",900);
	   setTimeout("setOpacity('nVertex4',1.0,500)",1200);
	   setTimeout("setOpacity('nVertex5',1.0,500)",1500);	   
		if(nStarted == 0 )
		{
            setTimeout("setButtonEnable('step',1)",2000);	
		}		
	}
	//S <- Empty -- Animation Four
	if(nStep == 3)
	{
        setPsuedoOut('p2');	
		setPsuedoHL('p3',0);
		setOpacity('ST-A0',1.0,500);
		if(nStarted == 0 )
		{
            setTimeout("setButtonEnable('step',1)",800);	
		}	        				
	}
	//Q <- V -- Animation Five
	if(nStep == 4)
	{
        setPsuedoOut('p3');	
		setPsuedoHL('p4',0);
		setTimeout("setEase('DT-A01',0,0,255,500)",500);
		setTimeout("setEase('DT-A02',0,0,255,500)",500);
		setTimeout("setEase('DT-A03',0,0,255,500)",500);
		setTimeout("setEase('DT-A04',0,0,255,500)",500);
		setTimeout("setEase('DT-A05',0,0,255,500)",500);                        		
		if(nStarted == 0 )
		{
            setTimeout("setButtonEnable('step',1)",1500);	
		}        				
	}
	//while Q is not empty -- Animation Six
	if(nStep == 5 )
	{
        setPsuedoOut('p4');	
		setPsuedoHL('p5',0);
		setEase('DT-A01',255,255,255,100);
		setEase('DT-A02',255,255,255,100);
		setEase('DT-A03',255,255,255,100);
		setEase('DT-A04',255,255,255,100);
        setEase('DT-A05',255,255,255,100);
        setOpacity('DT-A10',1.0,500);
		if(nStarted == 0 )
		{
            setTimeout("setButtonEnable('step',1)",800);	
		}
	}
	// u <- Extract-Min ( Q ) -- Animation Seven
	if(nStep == 6)
	{
        setOpacity('DT-A10',0.0,0);
        setPsuedoOut('p5');	
		setPsuedoHL('p6',0);        
		setEase('DT-A11',255,0,0,100);	
        setEase('A',255,0,0,500);        
		if(nStarted == 0 )
		{
            setTimeout("setButtonEnable('step',1)",800);	
		}		
	}
	// S <- S union {u} -- Animation Eight
	if(nStep == 7)
	{
        setPsuedoOut('p6');
		setPsuedoHL('p7',0);        	
        setOpacity('ST-A1',1.0,500);        	   
		if(nStarted == 0 )
		{
            setTimeout("setButtonEnable('step',1)",800);	
		}       
	}
	//for each v in Adj[u] do -- Animation Nine
	if( nStep == 8 )
	{
        setPsuedoOut('p7');
		setPsuedoHL('p8',0); 	   
    	setEase('B',0,0,255,500);
    	setEase('C',0,0,255,500);
        setOpacity('nVertex1',1.0,0);
        setOpacity('nVertex2',1.0,0);        
    	DrawGraphLineColor(78,120,221,60,255,0,0,2000);// A to B
        DrawGraphLineColor(77,150,186,180,255,0,0,2000);//A to C
		if(nStarted == 0 )
		{
            setTimeout("setButtonEnable('step',1)",2500);	
		}
	}
	//if d[B] > edgeWeight(A,B) -- Animation Ten
	if( nStep == 9 )
	{
        setPsuedoOut('p8');
		setPsuedoHL('p9',0);
    	setEase('B',0,0,0,500);
    	setEase('C',0,0,0,500);
        setEase('DT-A12',0,0,255,500);
		if(nStarted == 0 )
		{
            setTimeout("setButtonEnable('step',1)",1000);	
		}     
	}
	//then d[B] <- d[A] + w(A,B) -- Animation Eleven
	if( nStep == 10 )
	{
        setPsuedoOut('p9');
		setPsuedoHL('p10',0);
        setEase('DT-A12',255,255,255,0);
        setTimeout("changeTxt('DT-A12',5)",500);
        setTimeout("changeTxt('nVertex1','0+5')",500); 
		if(nStarted == 0 )
		{
            setTimeout("setButtonEnable('step',1)",800);	
		}              
	}
	//if d[C] > edgeWeight(A,C) -- Animation Twelve
	if( nStep == 11 )
	{
        setPsuedoOut('p10');
		setPsuedoHL('p9',0);
        setEase('DT-A13',0,0,255,500);
		if(nStarted == 0 )
		{
            setTimeout("setButtonEnable('step',1)",800);	
		}
	}
	//then d[C] <- d[A] + w(A,C) -- Animation Thirteen
	if( nStep == 12 )
	{
        setPsuedoOut('p9');
		setPsuedoHL('p10',0);
        setEase('DT-A13',255,255,255,0);
        setTimeout("changeTxt('DT-A13',6)",500);
        setTimeout("changeTxt('nVertex2','0+6')",500);   	
		if(nStarted == 0 )
		{
            setTimeout("setButtonEnable('step',1)",800);	
		}
	}
	//while Q is not Empty do -- Animation Fourteen
	if( nStep == 13)
	{
        setPsuedoOut('p10');	
		setPsuedoHL('p5',0);
        setOpacity('DT-A20',1.0,500);
        setOpacity('DT-A22',1.0,500);
        setOpacity('DT-A23',1.0,500);        
        setOpacity('DT-A24',1.0,500);
        setOpacity('DT-A25',1.0,500);        
		if(nStarted == 0 )
		{
            setTimeout("setButtonEnable('step',1)",800);	
		}	        				        
	}
	// u <- Extract-Min ( Q ) -- Animation Fifteen
	if(nStep == 14)
	{
        setOpacity('DT-A20',0.0,0);
        setPsuedoOut('p5');	
		setPsuedoHL('p6',0);        
		setEase('DT-A22',255,0,0,100);
        setEase('B',255,0,0,500);		
		if(nStarted == 0 )
		{
            setTimeout("setButtonEnable('step',1)",800);	
		}
	}
	// S <- S union {u} -- Animation Sixteen
	if(nStep == 15)
	{
        setPsuedoOut('p6');
		setPsuedoHL('p7',0);        	
        setOpacity('ST-A2',1.0,500);        	   
		if(nStarted == 0 )
		{
            setTimeout("setButtonEnable('step',1)",800);	
		}      
	}
	//for each v in Adj[u] do -- Animation Seventeen
	if( nStep == 16 )
	{
        setPsuedoOut('p7');
		setPsuedoHL('p8',0); 	   
    	setEase('C',0,0,255,500);
    	setEase('D',0,0,255,500);
    	DrawGraphLineColor(291,50,418,50,255,0,0,2000);// B to D
        DrawGraphLineColor(243,79,210,168,255,0,0,2000);//B to C
		if(nStarted == 0 )
		{
            setTimeout("setButtonEnable('step',1)",2500);	
		}               
	}
	//if d[C] > edgeWeight(B,C) -- Animation Eighteen
	if( nStep == 17 )
	{
        setPsuedoOut('p8');
		setPsuedoHL('p9',0);
    	setEase('D',0,0,0,500);
    	setEase('C',0,0,0,500);
        setEase('DT-A23',0,0,255,500);
		if(nStarted == 0 )
		{
            setTimeout("setButtonEnable('step',1)",800);	
		}       
	}
	//then d[C] <- d[B] + w(B,C) -- Animation Nineteen
	if( nStep == 18 )
	{
        setPsuedoOut('p9');
		setPsuedoHL('p10',0);
        setEase('DT-A23',255,255,255,0);
        setTimeout("changeTxt('DT-A23',7)",500);
        setTimeout("changeTxt('nVertex2','5+2')",500); 
		if(nStarted == 0 )
		{
            setTimeout("setButtonEnable('step',1)",800);	
		}               
	}
	//if d[D] > edgeWeight(B,D) -- Animation Twenty
	if( nStep == 19 )
	{
        setPsuedoOut('p10');
		setPsuedoHL('p9',0);
        setEase('DT-A24',0,0,255,500);
		if(nStarted == 0 )
		{
            setTimeout("setButtonEnable('step',1)",800);	
		}
	}
	//then d[D] <- d[B] + w(B,D) -- Animation Twenty One
	if( nStep == 20 )
	{
        setPsuedoOut('p9');
		setPsuedoHL('p10',0);
        setEase('DT-A24',255,255,255,0);
        setTimeout("changeTxt('DT-A24',11)",500);
        setTimeout("changeTxt('nVertex3','6+5')",500);   	
		if(nStarted == 0 )
		{
            setTimeout("setButtonEnable('step',1)",800);	
		}
	}
	//while Q is not Empty do -- Animation Twenty Two
	if( nStep == 21)
	{
        setPsuedoOut('p10');	
		setPsuedoHL('p5',0);
        setOpacity('DT-A30',1.0,500);
        setOpacity('DT-A32',1.0,500);
        setOpacity('DT-A33',1.0,500);        
        setOpacity('DT-A34',1.0,500);
        setOpacity('DT-A35',1.0,500);        
		if(nStarted == 0 )
		{
            setTimeout("setButtonEnable('step',1)",800);	
		}       				        
	}
	// u <- Extract-Min ( Q ) -- Animation Twenty Three
	if(nStep == 22)
	{
        setOpacity('DT-A30',0.0,0);
        setPsuedoOut('p5');	
		setPsuedoHL('p6',0);        
		setEase('DT-A33',255,0,0,100);
        setEase('C',255,0,0,500);		
		if(nStarted == 0 )
		{
            setTimeout("setButtonEnable('step',1)",800);	
		}   		
	}
	// S <- S union {u} -- Animation Twenty Four
	if(nStep == 23)
	{
        setPsuedoOut('p6');
		setPsuedoHL('p7',0);        	
        setOpacity('ST-A3',1.0,500);        	   
		if(nStarted == 0 )
		{
            setTimeout("setButtonEnable('step',1)",800);	
		}  
	}
	//for each v in Adj[u] do -- Animation Twenty Five
	if( nStep == 24 )
	{
        setPsuedoOut('p7');
		setPsuedoHL('p8',0); 	   
    	setEase('E',0,0,255,500);
    	setEase('D',0,0,255,500);
    	setEase('B',0,0,255,500);    	
    	DrawGraphLineColor(244,182,431,70,255,0,0,2800);// C to D
        DrawGraphLineColor(250,200,358,200,255,0,0,2000);// C to E
		if(nStarted == 0 )
		{
            setTimeout("setButtonEnable('step',1)",2500);	
		}             
	}
	//if d[C] > edgeWeight(B,C) -- Animation Twenty Six
	if( nStep == 25 )
	{
        setPsuedoOut('p8');
		setPsuedoHL('p9',0);
    	setEase('E',0,0,0,500);
    	setEase('D',0,0,0,500);
    	setEase('DT-A22',0,0,255,500);    	
		if(nStarted == 0 )
		{
            setTimeout("setButtonEnable('step',1)",800);	
		}         
	}
	//if d[C] > edgeWeight(D,C) -- Animation Twenty Seven
	if( nStep == 26 )
	{
	    setEase('B',255,0,0,500);
        setEase('DT-A22',255,0,0,500);    			
        setPsuedoOut('p8');
		setPsuedoHL('p9',0);
    	setEase('DT-A34',0,0,255,500);    	
		if(nStarted == 0 )
		{
            setTimeout("setButtonEnable('step',1)",800);	
		}         
	}
	//then d[C] <- d[D] + w(D,C) -- Animation Twenty Eight
	if( nStep == 27 )
	{
        setPsuedoOut('p9');
		setPsuedoHL('p10',0);
        setEase('DT-A34',255,255,255,0);
        setTimeout("changeTxt('DT-A34',15)",500);
        setTimeout("changeTxt('nVertex3','7+8')",500); 
		if(nStarted == 0 )
		{
            setTimeout("setButtonEnable('step',1)",800);	
		}       
	}
	//if d[D] > edgeWeight(B,D) -- Animation Twenty Nine
	if( nStep == 28 )
	{
        setPsuedoOut('p10');
		setPsuedoHL('p9',0);
        setEase('DT-A35',0,0,255,500);
		if(nStarted == 0 )
		{
            setTimeout("setButtonEnable('step',1)",800);	
		}
	}
	//then d[D] <- d[B] + w(B,D) -- Animation Thirty
	if( nStep == 29 )
	{
        setPsuedoOut('p9');
		setPsuedoHL('p10',0);
        setEase('DT-A35',255,255,255,0);
        setTimeout("changeTxt('DT-A35',10)",500);
        setTimeout("changeTxt('nVertex4','7+3')",500);   	
		if(nStarted == 0 )
		{
            setTimeout("setButtonEnable('step',1)",800);	
		}
	}	
		//while Q is not Empty do -- Animation Thirty One
	if( nStep == 30)
	{
        setPsuedoOut('p10');	
		setPsuedoHL('p5',0);
        setOpacity('DT-A40',1.0,500);
        setOpacity('DT-A42',1.0,500);
        setOpacity('DT-A43',1.0,500);        
        setOpacity('DT-A44',1.0,500);
        setOpacity('DT-A45',1.0,500);        
		if(nStarted == 0 )
		{
            setTimeout("setButtonEnable('step',1)",800);	
		}	        				        
	}
	// u <- Extract-Min ( Q ) -- Animation Thirty Two
	if(nStep == 31)
	{
        setOpacity('DT-A40',0.0,0);
        setPsuedoOut('p5');	
		setPsuedoHL('p6',0);        
		setEase('DT-A45',255,0,0,100);
        setEase('E',255,0,0,500);		
		if(nStarted == 0 )
		{
            setTimeout("setButtonEnable('step',1)",800);	
		}	
	}
	// S <- S union {u} -- Animation Thirty Three
	if(nStep == 32)
	{
        setPsuedoOut('p6');
		setPsuedoHL('p7',0);        	
        setOpacity('ST-A4',1.0,500);        	   
		if(nStarted == 0 )
		{
            setTimeout("setButtonEnable('step',1)",800);	
		}        
	}
	//for each v in Adj[u] do -- Animation Thirty Four
	if( nStep == 33 )
	{
        setPsuedoOut('p7');
		setPsuedoHL('p8',0); 	   
    	setEase('C',0,0,255,500);
    	setEase('D',0,0,255,500);
    	DrawGraphLineColor(400,168,438,76,255,0,0,2800);// E to D
		if(nStarted == 0 )
		{
            setTimeout("setButtonEnable('step',1)",2500);	
		}             
	}
	//if d[C] > edgeWeight(E,C) -- Animation Thirty Five
	if( nStep == 34 )
	{
        setPsuedoOut('p8');
		setPsuedoHL('p9',0);
    	setEase('D',0,0,0,500);
    	setEase('DT-A33',0,0,255,500);    	
		if(nStarted == 0 )
		{
            setTimeout("setButtonEnable('step',1)",800);	
		}       
	}
	//if d[C] > edgeWeight(E,D) -- Animation Thirty Six
	if( nStep == 35 )
	{
	    setEase('C',255,0,0,500);
        setEase('DT-A33',255,0,0,500);    			
        setPsuedoOut('p8');
		setPsuedoHL('p9',0);
    	setEase('DT-A44',0,0,255,500);    	
		if(nStarted == 0 )
		{
            setTimeout("setButtonEnable('step',1)",800);	
		}     
	}
	//then d[D] <- d[E] + w(E,D) -- Animation Thirty Seven
	if( nStep == 36 )
	{
        setPsuedoOut('p9');
		setPsuedoHL('p10',0);
        setEase('DT-A44',255,255,255,0);
        setTimeout("changeTxt('DT-A44',12)",500);
        setTimeout("changeTxt('nVertex3','10+2')",500); 
		if(nStarted == 0 )
		{
            setTimeout("setButtonEnable('step',1)",800);	
		}              
	}
	//while Q is not Empty do -- Animation Thirty Eight
	if( nStep == 37)
	{
        setPsuedoOut('p10');	
		setPsuedoHL('p5',0);
        setOpacity('DT-A50',1.0,500);
        setOpacity('DT-A52',1.0,500);
        setOpacity('DT-A53',1.0,500);        
        setOpacity('DT-A54',1.0,500);
        setOpacity('DT-A55',1.0,500);        
		if(nStarted == 0 )
		{
            setTimeout("setButtonEnable('step',1)",1000);	
		}        				        
	}
	// u <- Extract-Min ( Q ) -- Animation Thirty Nine
	if(nStep == 38)
	{
        setOpacity('DT-A50',0.0,0);
        setPsuedoOut('p5');	
		setPsuedoHL('p6',0);        
		setEase('DT-A54',255,0,0,100);
        setEase('D',255,0,0,500);		
		if(nStarted == 0 )
		{
            setTimeout("setButtonEnable('step',1)",800);	
		}	
	}
	// S <- S union {u} -- Animation Fourty
	if(nStep == 39)
	{
        setPsuedoOut('p6');
		setPsuedoHL('p7',0);        	
        setOpacity('ST-A5',1.0,500);        	   
		if(nStarted == 0 )
		{
            setTimeout("setButtonEnable('step',1)",800);	
		}  
	}
	//for each v in Adj[u] do -- Animation Fourty One
	if( nStep == 40 )
	{
        setPsuedoOut('p7');
		setPsuedoHL('p8',0); 	   
    	setEase('B',0,0,255,500);
    	setEase('C',0,0,255,500);
    	setEase('E',0,0,255,500);    	
		if(nStarted == 0 )
		{
            setTimeout("setButtonEnable('step',1)",800);	
		}             
	}	
	//if d[C] > edgeWeight(D,B) -- Animation Fourty Two
	if( nStep == 41 )
	{
	    setEase('B',255,0,0,500);
        setPsuedoOut('p8');
		setPsuedoHL('p9',0);
    	setEase('DT-A22',0,0,255,500);    	
		if(nStarted == 0 )
		{
            setTimeout("setButtonEnable('step',1)",800);	
		}     
	}
	//if d[C] > edgeWeight(D,C) -- Animation Fourty Three
	if( nStep == 42 )
	{
	    setEase('B',255,0,0,500);
        setEase('DT-A22',255,0,0,500);    			
        setPsuedoOut('p8');
		setPsuedoHL('p9',0);
    	setEase('DT-A33',0,0,255,500);    	
		if(nStarted == 0 )
		{
            setTimeout("setButtonEnable('step',1)",800);	
		}        
	}	
	//if d[C] > edgeWeight(D,E) -- Animation Fourty Four
	if( nStep == 43 )
	{
	    setEase('C',255,0,0,500);
        setEase('DT-A33',255,0,0,500);    			
        setPsuedoOut('p8');
		setPsuedoHL('p9',0);
    	setEase('DT-A45',0,0,255,500);    	
		if(nStarted == 0 )
		{
            setTimeout("setButtonEnable('step',1)",800);	
		}        
	}	
	//Show Shortest Path -- Animation Fourty Five
	if( nStep == 45 )
	{
	    setEase('E',255,0,0,500);
        setEase('DT-A45',255,0,0,500);    			
        setPsuedoOut('p9');
		setButtonEnable('stop',0);
        DrawGraphLineColor(77,150,186,180,255,255,255,2000);//A to C
        DrawGraphLineColor(291,50,418,50,255,255,255,2000);//B to D
    	DrawGraphLineColor(244,182,431,70,255,255,255,2800);// C to D        		   
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
	FUNCTION: DrawGraphLineColor(FROMX,FROMY,TOX,TOY,RED,GREEN,BLUE,DURATION)
	Description
	-----------
	Draws multiple div's from a coordinate (X,Y) to a coordinate (X2,Y2), duration indicates the speed. 
	RED 0 - 255, GREEN 0 - 255, BLUE 0 -255. 3 indicates is the thickness of the lines
*/
function DrawGraphLineColor(FROMX,FROMY,TOX,TOY,RED,GREEN,BLUE,DURATION)
{
	var anim1 = manager.createAnimObject("workarea");
	anim1.add({
			  	property: Prop.line, 
				from: new Attrib(FROMX,FROMY,3,RED,GREEN,BLUE), 
				to: new Attrib(TOX,TOY,3,RED,GREEN,BLUE), 
				duration: DURATION
			 });
}
/*
	FUNCTION: setOpacity(ID,OPACITY,TIME)
	Description
	-----------
	J-Query animation. Takes in a div ID and sets the opacity of the element from 0.0 to 1.0. 
	1.0 will set the opacity to 100% 
	DURATION indicates the speed
*/
function setOpacity(ID,OPACITY,DURATION) 
{
		$("#"+ID+"").animate({ 
    	opacity: OPACITY,
  	}, DURATION );
}
/*
	FUNCTION: setEase(ID,RED,GREEN,BLUE,TIME)
	Description
	-----------
	Changes the background color from the default background specified in the css stylesheet to RGB - 0 to 255. The duration gives it a Ease look
	NOTE: if background color not specified in css, the default color will ease from black.
*/
function setEase(ID,RED,GREEN,BLUE,DURATION) 
{
	 var anim = manager.createAnimObject(""+ID+"");  
	 anim.add
	 ({
		property: Prop.backgroundColor, 
		to: new Col(RED,GREEN,BLUE),  
		duration: DURATION
	  }); 
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
	FUNCTION: setOpacity(ID,OPACITY,TIME)
	Description
	-----------
	Gets the element within the specified divID and replaces it with 
	whatever TXT indicated in TXT. 
*/
function changeTxt(ID,TXT) {
    document.getElementById(""+ID+"").innerHTML = TXT; 
}