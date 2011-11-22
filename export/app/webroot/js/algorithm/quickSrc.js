/**********************************************************
* Name: Mark Mata and Roddy Nguyen
* File: main.js
* Project: {AlgorithmA}; 2010
* Date Created: February 14, 2010
* Date Modded: March 16, 2010
* Purpose:
* This javascript file runs all of the animations and also runs the algorithm
* that calculates the moves for the animation. 
* 
* Dependencies:
* This file is called by quickSort.html
* 
* Notes/Changelog:
* March 16, 2010 	- 	Added Comments to the code
* 
* Functions:
* Swap(nSwp1, nSwp2)	-	function that animates the naMoves for box 1 to position of box2 and box 2 to position of box 1
*
* Swap2(nSwp1, nSwp2)	-	function that is used by Initalization to move boxes into position
*
* Check(naUnsorted,nStrt,nStp)	-	checks to see if the array is unsorted	
*
* qsort2(naUnsorted,nStrt,nStp)	-	sorts and pushes the unsorted element to the end of the array. 	
*
* qsort(naUnsorted,nStrt,nStp)	- sorts and pushes the unsorted element to the end of the array after pseudocode highlights and unhighlight corresponding element.	
*
* Undo2()	-	function that undoes all of the highlights in the psuedocode
*
* Initialize() 	-	function that runs as the page is loaded, will pre-run
* 			the algorithm and creates the list of naMoves for the
* 			algorithm to run
*
* Res() 	- 	function that runs to enable and disable certain buttons in firefox	
*		
* 			
* Forward() 	-	function that steps forward through the animation one
* 			step at a time as the "Forward" button is pushed in the
* 			HTML file
* 			
* Back() 	-	function that steps back through the animation one step
* 			at a time as the "back" button is pushed in the HTML
* 			file
* 			
* Highlight(variable) 	-	function that highlights a line of psuedocode
* 				and a div box
*
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
**********************************************************/

// GLOBAL VARIABLES ARE YOUR FRIEND!!!

// Global variables required by pbMan and jsAnim to run the animations
var manager = new jsAnimManager();
var playback = new pbManager();

// Global variables list of global variables used in running the
// algorithm/animation
//the naMoves array is the array the naMoves are stored
var naMoves=new Array;
naMoves[0]='psuedoCode0'
var nCounter=0

// Global variables used by the timer
var nSecs
var bTimerId = null
var bTimerRunning = false
var nDelay = 750

/**********************************************************
* Swap(nSwp1, nSwp2)	-	function that animates the naMoves for box 1 to position of box2 and box 2 to position of box 1
************************************************************/
function Swap(nSwp1, nSwp2)
{
    if (nSwp1!=nSwp2)
    {
	nMov1='box'+nSwp1;
	nMov2='box'+nSwp2;
	var Swap1 = playback.createPBObject(manager);
	Swap1.set({property: playProp.swap, object1: nMov1, object2: nMov2, duration: 500});
    }
}

/**********************************************************
* Swap2(nSwp1, nSwp2)	-	function that animates the naMoves for box 1 to position of box2 and box 2 to position of box 1
************************************************************/
function Swap2(nSwp1, nSwp2)
{
    if (nSwp1!=nSwp2)
    {
	naMoves.push([nSwp1,nSwp2]);
    }
}

/**********************************************************
* Check(naUnsorted,nStrt,nStp)	-	checks to see if the array is unsorted
************************************************************/
function Check(naUnsorted,nStrt,nStp)
{
    for (i=nStrt; i<=nStp; i++)
    {
        if (naUnsorted[i]<naUnsorted[i-1])
        {
	    return false;
	}                
    }
    
    if (nStrt-nStp==0)
    {
	Swap2(naUnsorted[nStrt],naUnsorted[nStrt]+10);
    }
    return true
}

/**********************************************************
* Initialize() 	-	function that runs as the page is loaded, will pre-run
* 			the algorithm and creates the list of naMoves for the
* 			algorithm to run
************************************************************/
function Initialize()
{
    var naUnsorted=new Array;
    naUnsorted[0]=5;
    naUnsorted[1]=0;
    naUnsorted[2]=8;
    naUnsorted[3]=3;
    naUnsorted[4]=9;
    naUnsorted[5]=7;
    naUnsorted[6]=1;
    naUnsorted[7]=6;
    naUnsorted[8]=2;
    naUnsorted[9]=4;
    
    var naSorted=qsort2(naUnsorted,0,naUnsorted.length-1);
	
	document.getElementById("concept").onmouseover = function () {
		Tip("Quicksort is an in-place divide-and-conquer massively recursive sorting algorithm that on average makes O(nlogn) (big O notation) comparisons to sort n items. However, in the worst case, it makes O(n<sup>2</sup>) comparisons. Typically, quicksort is significantly faster in practice than other O(nlogn) algorithms, because its inner loop can be efficiently implemented on most architectures, and in most real-world data. It is possible to make design choices which minimize the probability of requiring quadratic time. Quick Sort is a comparison sort and in efficient implementations it is not considered a stable sort.",WIDTH, 500, FONTFACE, 'Verdana, sans-serif', FONTSIZE, '12pt',FONTCOLOR, '#000000',PADDING, 8, SHADOW, true, SHADOWCOLOR, '#CCCCCC', FADEIN, 400, FADEOUT, 800,CENTERMOUSE, true, OFFSETX, 0 ,BGCOLOR, '#FFFFCC');
	}
	document.getElementById("howto").onmouseover = function() {
		Tip("<strong>Demo</strong> - Starts the Quick Sort animation.<br /><br /><strong>Forward</strong> - Allows the user to step through the sort one step at a time. Walkthrough is enabled when this button is pressed.<br /><br /><strong>Back</strong> - Enables the back feature allowing user to step back through the sort.<br /><br /><strong>Reset</strong> - Resets the Quick Sort animation to the beginning.",WIDTH, 400, FONTFACE, 'Verdana, sans-serif', FONTSIZE, '12pt',FONTCOLOR, '#000000',PADDING, 8, SHADOW, true, SHADOWCOLOR, '#CCCCCC', FADEIN, 400, FADEOUT, 800,CENTERMOUSE, true, OFFSETX, 0 ,BGCOLOR, '#CEFFFF');
	}
}

/**********************************************************
* qsort2(naUnsorted,nStrt,nStp)	-	sorts and pushes the unsorted element to the end of the array. 
************************************************************/
function qsort2(naUnsorted,nStrt,nStp)
{
    naMoves.push('psuedoCode1');
    naMoves.push('psuedoCode2');
    Swap2(30,nStrt+20);    
    
    if (Check(naUnsorted,nStrt,nStp)==true)
    {
        naMoves.push('psuedoCode5');
        Swap2(30,nStrt+20);
	return naUnsorted;
    }
    
    naMoves.push('psuedoCode3');
    var pivot=naUnsorted[nStrt];
    var ppnt=nStrt+1;
    
    naMoves.push('psuedoCode4');
    for (look=ppnt; look<=nStp; look++)
    {
	if (naUnsorted[look]<=pivot)
	{
	    Swap2(naUnsorted[look],naUnsorted[ppnt]);
	    var naTemp=naUnsorted[look];
	    naUnsorted[look]=naUnsorted[ppnt];
	    naUnsorted[ppnt]=naTemp;
	    ppnt++;
	}
    }
    
    naMoves.push('psuedoCode8');
    Swap2(30,nStrt+20);
    Swap2(naUnsorted[nStrt],naUnsorted[ppnt-1]);
    naMoves.push('psuedoCode5');
    var mov1=naUnsorted[nStrt]
    var nMov2=naUnsorted[nStrt]+10
    Swap2(mov1,nMov2)
    var naTemp=naUnsorted[nStrt];
    naMoves.push('psuedoCode6')
    naUnsorted[nStrt]=naUnsorted[ppnt-1];
    naUnsorted[ppnt-1]=naTemp;
    
    qsort2(naUnsorted,nStrt,ppnt-2);            
    qsort2(naUnsorted,ppnt,nStp);
    
    for (i=0; i<=naUnsorted.length; i++)
    {
	Swap2()
    }
    
    return naUnsorted
}

/**********************************************************
* qsort(naUnsorted,nStrt,nStp)	- sorts and pushes the unsorted element to the end of the array after pseudocode highlights and unhighlight corresponding element.
************************************************************/
function qsort(naUnsorted,nStrt,nStp)
{
    highlight('psuedoCode1');
    highlight('psuedoCode2');
    Swap(30,nStrt+20)
    if (nStrt-nStp==0)
    {
	Swap(naUnsorted[nStrt],naUnsorted[nStrt]+10);
    }
    
    if (Check(naUnsorted,nStrt,nStp)==true)
    {
        Swap(30,nStrt+20)
	return naUnsorted;
    }
    
    highlight('psuedoCode3');
    var pivot=naUnsorted[nStrt]
    var ppnt=nStrt+1
    
    highlight('psuedoCode4');
    for (look=ppnt; look<=nStp; look++)
    {
	if (naUnsorted[look]<=pivot)
	{
	    Swap(naUnsorted[look],naUnsorted[ppnt])
	    var naTemp=naUnsorted[look];
	    naUnsorted[look]=naUnsorted[ppnt];
	    naUnsorted[ppnt]=naTemp;
	    ppnt++;
	}
    }
    
    
    highlight('psuedoCode8');
    Swap(30,nStrt+20);
    Swap(naUnsorted[nStrt],naUnsorted[ppnt-1]);
    highlight('psuedoCode5');
    var nMov1=naUnsorted[nStrt]
    var nMov2=naUnsorted[nStrt]+10
    Swap(nMov1,nMov2)
    var naTemp=naUnsorted[nStrt];
    highlight('psuedoCode6')
    naUnsorted[nStrt]=naUnsorted[ppnt-1];
    naUnsorted[ppnt-1]=naTemp;
    
    qsort(naUnsorted,nStrt,ppnt-2);            
    qsort(naUnsorted,ppnt,nStp);
    
    for (i=0; i<=naUnsorted.length; i++)
    {
	Swap()
    }
    return naUnsorted
}

/**********************************************************
* Highlight(variable) 	-	function that highlights a line of psuedocode
* 				and a div box
************************************************************/
function Highlight(variable)
{
    var anim = manager.createAnimObject(variable);  
    anim.add({property: Prop.backgroundColor, to: new Col(255,255,0), duration:500});
    Undo(2);
}

/**********************************************************
* Undo() 	-	function that undoes all the higlights in the psuedocode
************************************************************/
function Undo()
{
    for (i=0; i<=8; i++)
    {
        variable='psuedoCode'+i; 
        var anim = manager.createAnimObject(variable); 
        anim.add({property: Prop.backgroundColor, to: new Col(255,255,255), duration:0});
    }
}

/**********************************************************
* Undo2()	-	function that undoes all of the highlights in the psuedocode
************************************************************/
function Undo2()
{
    for (i=0; i<=8; i++)
    {
        variable='psuedoCode'+i;
        var anim = manager.createAnimObject(variable);
        anim.add({property: Prop.backgroundColor, to: new Col(255,255,255), duration:0});
    }
}

/**********************************************************
* Back() 	-	function that steps back through the animation one step
* 			at a time as the "back" button is pushed in the HTML
* 			file
************************************************************/
function Back()
{
    if (nCounter==0)
    {
        document.getElementById("b1").disabled=true;
        Undo();
    }
    if (nCounter==naMoves.length-1)
    {
        Undo2();
        Highlight(naMoves[nCounter]);        
        if (nCounter!=0)
        {
            counter--;
        }
    }
    else
    {
        if (nCounter!=0)
        {
            nCounter--;
        }
        var nTemp=naMoves[nCounter]
        if (nTemp.length==2)
        {
            Swap(nTemp[0],nTemp[1]);
        }
        else
        {
            Undo2();
            Highlight(naMoves[nCounter]);
        }
    }
    
}

/**********************************************************
* Res() 	- 	function that runs to enable and disable certain buttons in firefox	
************************************************************/
function Res()
{
    Initialize();
    naMoves=new Array;
    document.getElementById("s1").disabled=false;
    document.getElementById("f1").disabled=false;
    document.getElementById("b1").disabled=true;    
}

/**********************************************************
* Forward() 	-	function that steps forward through the animation one
* 			step at a time as the "Forward" button is pushed in the
* 			HTML file
************************************************************/
function Forward()
{
    document.getElementById("s1").disabled=true;
    document.getElementById("b1").disabled=false;
    if (nCounter==naMoves.length-1)
    {
        if (nCounter>=naMoves.length)
        {
            Undo2();
        }
        Highlight("psuedoCode7");
        nCounter++;
    }
    else
    {
        var nTemp=naMoves[nCounter];
        if (nTemp.length==2)
        {
            Swap(nTemp[0],nTemp[1]);
        }
        else
        {
            Undo2();
            Highlight(naMoves[nCounter]);
        }
        nCounter++;
    }
}

/**********************************************************
* Forward2() 	-	function that steps forward through the animation one
* 			step at a time as the "Forward" button is pushed in the
* 			HTML file
************************************************************/
function Forward2()
{
    document.getElementById("s1").disabled=true;
    document.getElementById("f1").disabled=true;
    if (nCounter==naMoves.length-1)
    {
        if (nCounter>=naMoves.length)
        {
            Undo2();
        }
        Highlight("psuedoCode7");
        nCounter++;
    }
    else
    {
        var nTemp=naMoves[nCounter];
        if (nTemp.length==2)
        {
            Swap(nTemp[0],nTemp[1]);
        }
        else
        {
            Undo2();
            Highlight(naMoves[nCounter]);
        }
        nCounter++;
    }
}

/**********************************************************
* InitializeTimer() 	-	first of three function required to run the
* 				timer for the demo
************************************************************/
function InitializeTimer()
{
    // Set the length of the timer, in seconds
    nSecs = 1
    StopTheClock()
    StartTheTimer()
}

/**********************************************************
* StopTheClock() 	-	second of three functions required to run the
* 				timer for the demo
************************************************************/
function StopTheClock()
{
    if(bTimerRunning)
        clearTimeout(bTimerId)
    bTimerRunning = false
}

/**********************************************************
* StartTheTimer() 	-	third of three functions required to run the
* 				timer for the demo
************************************************************/
function StartTheTimer()
{
    if (nSecs==0)
    {
        StopTheClock();
        Forward2();
        InitializeTimer();
    }
    else
    {
        self.status = nSecs
        nSecs = nSecs - 1
        bTimerRunning = true
        bTimerId = self.setTimeout("StartTheTimer()", nDelay)
    }
}