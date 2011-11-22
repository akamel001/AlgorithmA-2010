/*******************************************************************************
* Name: Mark Mata and Roddy Nguyen
* File: kruskalSrc.js
* Project: {AlgorithmA}; 2010
* Date Created: March 4, 2010
* Date Modded: March 19, 2010
* Purpose:
* This javascript file runs all of the animations and also runs the algorithm
* that calculates the moves for the animation. 
* 
* Dependencies:
* This file is called by kruskalsView.html
* 
* Notes/Changelog:
* March 19, 2010 	- 	Added Comments to the code
* 
* Functions:
* PriorityQueue ( value )	-	class takes an initial value (0) that is
* 					used to create the priority queue class
* 					
* Initialize()	-	function that runs as the page is loaded, will pre-run
* 			the algorithm and creates the list of moves for the
* 			algorithm to run
*
* Swap(nSwp1, nSwp2)	-	uses jsAnim and pbMan to swap the positions of
* 				two different div boxes
*
* Varcheck(nsVariable)	-	Checks to see if the variable inputed is
*				"proper"
*
* Push()	-	manually push an element into a list
*
* Pop()	-	manually pop an element off a list
*
* Highlight( variable )	-	function that highlights a line of psuedocode
*
* Undo() 	-	function that undoes all the higlights in the psuedocode
*
* Init()	-	function used to reset the buttons
*
* Forward() 	-	function that steps forward through the animation one
* 			step at a time as the timer goes through the naPqMoves
* 			array
* 					
* InitializeTimer() 	-	first of three function required to run the
* 				timer for the demo
* 				
* StopTheClock() 	-	second of three functions required to run the
* 				timer for the demo
* 				
* StartTheTimer() 	-	third of three functions required to run the
* 				timer for the demo
*******************************************************************************/

Function.prototype.method = function (name, func) 
{
    this.prototype[name] = func;
    return this;
};

// GLOBAL VARIABLES ARE YOUR FRIEND!!!

// Global variables required by pbMan and jsAnim to run the animations
var manager = new jsAnimManager();
var playback = new pbManager();

// Array of moves used by the timers
var nPqMoves=new Array;
// Counter used by the function Push()
var nPushCount=0
// Array used by Push() to save the priority Queue
var naSorted=new Array;
// Counter used by Push() to assign div boxes to a number that is pushed into
// the array
var nCounter=0;

// Global variables required for the demo animation
// counter required for stepping through the array of moves
var nSecs
var bTimerID = null
var bTimerRunning = false
var nDelay = 550

/*******************************************************************************
* PriorityQueue ( value )	-	class takes an initial value (0) that is
* 					used to create the priority queue class
* {
* 	naPqArray 	
* 	push()
* 	sort()
* 	pop()
* 	look()
* }
*******************************************************************************/
function PriorityQueue( value )
{
    this.create(value);
}

    PriorityQueue.method('push', function (value)
    {
        this.naPqArray.push(value);
        if (this.naPqArray.length>=2)
        {
            this.sort();
        }
        return this.naPqArray;
    });
    
    PriorityQueue.method('sort', function ()
    {
	nPqMoves.push("psuedoCode3")
	nPqMoves.push("psuedoCode4")
        for (i=1; i<this.naPqArray.length; i++)
        {
            var naCurrent=this.naPqArray[i];                
            var nCount=i;
            for (j=i-1; j>=0; j--)
            {
                if (this.naPqArray[j]>=naCurrent)
                {
                    nTemp=new Array;
                    nTemp[0]=naCurrent;
                    nTemp[1]=this.naPqArray[j];
                    nPqMoves.push(nTemp);
                    this.naPqArray[j+1]=this.naPqArray[j];
                    nCount--;
                }   
            }
            this.naPqArray[nCount]=naCurrent;
        }
        return this.naPqArray;
    });
    
    PriorityQueue.method('pop', function ()
    {
	nPqMoves.push("psuedoCode5")
	nPqMoves.push("psuedoCode6")
        return this.naPqArray.pop();
    });
    
    PriorityQueue.method('look', function ()
    {
        return this.naPqArray;
    });
            
    PriorityQueue.method('create', function (value)
    {
        this.naPqArray=new Array;
        return this.naPqArray;
    });
    
/*******************************************************************************
* Initialize()	-	function that runs as the page is loaded, will pre-run
* 			the algorithm and creates the list of moves for the
* 			algorithm to run
*******************************************************************************/
function Initialize()
{
    var naUnsorted=new Array;
    naUnsorted[0]=8;
    naUnsorted[1]=7;
    naUnsorted[2]=6;
    naUnsorted[3]=5;
    naUnsorted[4]=4;
    naUnsorted[5]=3;
    naUnsorted[6]=2;
    naUnsorted[7]=1;
    naUnsorted[8]=0;
    var pqTest1 = new PriorityQueue(0);
    for (k=0; k<naUnsorted.length; k++)
    {
	nPqMoves.push("psuedoCode1")
	nPqMoves.push("psuedoCode2")
        naTemp=new Array;
        naTemp[0]=naUnsorted[k];
        naTemp[1]=k+10;
        nPqMoves.push(naTemp);
        pqTest1.push(naUnsorted[k]);
    }
    naUnsorted=pqTest1.look();
    for (k=naUnsorted.length-1; k>=0; k--)
    {
        naTemp=new Array;
        naTemp[0]=naUnsorted[k];
        naTemp[1]=k+40;
        nPqMoves.push(naTemp);
        pqTest1.pop();
        pqTest1.look();
    }
	
	document.getElementById("concept").onmouseover = function () {
		Tip("A priority queue is used so that the most urgent task can be quickly determined and processed (ie. The operating system to respond rapidly to key strokes on the keyboard).",WIDTH, 500, FONTFACE, 'Verdana, sans-serif', FONTSIZE, '12pt',FONTCOLOR, '#000000',PADDING, 8, SHADOW, true, SHADOWCOLOR, '#CCCCCC', FADEIN, 400, FADEOUT, 800,CENTERMOUSE, true, OFFSETX, 0 ,BGCOLOR, '#FFFFCC');
	}
	document.getElementById("howto").onmouseover = function() {
		Tip("<strong>Demo</strong> - Plays through a prespecified animation showcasing all functions of a priority queue.<br /><br /><strong>Push</strong> - Push a prespecified value onto the queuue.<br /><br /><strong>Pop</strong> - Remove the last element of the queue.<br /><br /><strong>Reset</strong> - Resets the queue to nothing.<br /><br />",WIDTH, 400, FONTFACE, 'Verdana, sans-serif', FONTSIZE, '12pt',FONTCOLOR, '#000000',PADDING, 8, SHADOW, true, SHADOWCOLOR, '#CCCCCC', FADEIN, 400, FADEOUT, 800,CENTERMOUSE, true, OFFSETX, 0 ,BGCOLOR, '#CEFFFF');
	}
}

/*******************************************************************************
* Swap(nSwp1, nSwp2)	-	uses jsAnim and pbMan to swap the positions of
* 				two different div boxes
*******************************************************************************/
function Swap(nSwp1, nSwp2)
{
    if (nSwp1!=nSwp2)
    {
        sMov1='box'+nSwp1
        sMov2='box'+nSwp2
        var swap1 = playback.createPBObject(manager);
        swap1.set({property: playProp.swap, object1: sMov1, object2: sMov2, duration: 450});
    }
}

/*******************************************************************************
* Varcheck(nsVariable)	-	Checks to see if the variable inputed is
*				"proper"
*******************************************************************************/
function Varcheck(nsVariable)
{
    if (nsVariable==1)
    {
        return true;
    }
    else if (nsVariable==2)
    {
        return true;
    }
    else if (nsVariable==3)
    {
        return true;
    }
    else if (nsVariable==4)
    {
        return true;
    }
    else if (nsVariable==5)
    {
        return true;
    }
    else if (nsVariable==6)
    {
        return true;
    }
    else if (nsVariable==7)
    {
        return true;
    }
    else if (nsVariable==8)
    {
        return true;
    }
    else if (nsVariable==9)
    {
        return true;
    }
    else
    {
        return false;
    }
}

/*******************************************************************************
* Push()	-	manually push an element into a list
*******************************************************************************/
function Push()
{
    document.getElementById("s1").disabled=true;
    document.getElementById("b1").disabled=false;
    var nsVariable=document.getElementById("txt").value;
    if (Varcheck(nsVariable)==true)
    {
	Undo();
	Highlight("psuedoCode1");
	Undo();
	Highlight("psuedoCode2");
	Undo();
        document.getElementById("box"+nPushCount).innerHTML=nsVariable;
        Swap(nPushCount,nPushCount+10);
	naSorted.push([nsVariable, nPushCount]);	
        nPushCount=nPushCount+1;
	if (naSorted.length!=1)
	{
	    Highlight("psuedoCode3");
	    Undo();
	    Highlight("psuedoCode4");
	    for(i=naSorted.length-1; i>=1; i--)
	    {
		if (naSorted[i][0]<naSorted[i-1][0])
		{
		    var naTemp=naSorted[i];
		    naSorted[i]=naSorted[i-1];
		    naSorted[i-1]=naTemp;
		    Swap(naSorted[i][1],naSorted[i-1][1]);
		}
	    }
	}
        if (nPushCount==9)
        {
            document.getElementById("f1").disabled=true;
            document.getElementById("f2").disabled=true;
        }
    }
    else
    {
        alert("Invalid Entry");
    }
}

/*******************************************************************************
* Pop()	-	manually pop an element off a list
*******************************************************************************/
function Pop()
{
    document.getElementById("f1").disabled=true;
    document.getElementById("f2").disabled=true;
    Undo();
    Highlight("psuedoCode5");
    Undo();
    Highlight("psuedoCode6");
    nTemp=naSorted.length-1;
    if (nTemp==0)
    {
	document.getElementById("b1").disabled=true;
    }
    Swap(naSorted[nTemp][1],naSorted[nTemp][1]+40)
    naSorted.pop();
}

/*******************************************************************************
* Highlight( variable )	-	function that highlights a line of psuedocode
*******************************************************************************/
function Highlight(sVariable)
{
    var anim = manager.createAnimObject(sVariable);  
    anim.add({property: Prop.backgroundColor, to: new Col(255,255,0), duration:250});
    anim.sequential();
}

/*******************************************************************************
* Undo() 	-	function that undoes all the higlights in the psuedocode
*******************************************************************************/
function Undo()
{
    for (j=1; j<=6; j++)
    {
        var sVariable='psuedoCode'+j; 
        var anim = manager.createAnimObject(sVariable); 
        anim.add({property: Prop.backgroundColor, to: new Col(255,255,255), duration:0});
    }
}

/*******************************************************************************
* Init()	-	function used to reset the buttons
*******************************************************************************/
function Init()
{
    document.getElementById("s1").disabled=false;
    document.getElementById("f1").disabled=false;
    document.getElementById("b1").disabled=true; 
}

/*******************************************************************************
* Forward() 	-	function that steps forward through the animation one
* 			step at a time as the "Forward" button is pushed in the
* 			HTML file
*******************************************************************************/
function Forward()
{    
    document.getElementById("f1").disabled=true;
    document.getElementById("f2").disabled=true;
    if (nCounter==nPqMoves.length-2)
    {
        nCounter++;
    }
    else
    {
        var temp=nPqMoves[nCounter];
        if (temp.length==2)
        {
            Swap(temp[0],temp[1]);
        }
        else
        {
            Undo();
            Highlight(nPqMoves[nCounter]);
        }
        nCounter++;
    }
}

/*******************************************************************************
* InitializeTimer() 	-	first of three function required to run the
* 				timer for the demo
*******************************************************************************/
function InitializeTimer()
{
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
    if(bTimerRunning)
    {
        clearTimeout(bTimerID)
    }
    bTimerRunning = false
}

/*******************************************************************************
* StartTheTimer() 	-	third of three functions required to run the
* 				timer for the demo
*******************************************************************************/
function StartTheTimer()
{
    if (nSecs==0)
    {
        StopTheClock();
        Forward();
        InitializeTimer();
    }
    else
    {
        self.status = nSecs
        nSecs = nSecs - 1
        bTimerRunning = true
        bTimerID = self.setTimeout("StartTheTimer()", nDelay)
    }
}