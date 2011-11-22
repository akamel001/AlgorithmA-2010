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
* This file is called by insertionSort.html
* 
* Notes/Changelog:
* March 16, 2010 	- 	Added Comments to the code
* March 18, 2010	-	More Coding Standard Implementation
* 
* Functions:
* Swap ( nSwp1, nSwp2 )	-	function that animates the naMoves for box 1 to position of box2 and box 2 to position of box 1
*
* Swap2 ( nSwp1, nSwp2 )	-	function that is used by Initalization to move boxes into position
*
* Insertion ( unsorted )	-	function that naMoves the boxes into numberical order
*
* Undo2 ( )	-	function that undoes all of the highlights in the psuedocode
*
* Initialize ( )	-	function that runs as the page is loaded, will pre-run
* 			the algorithm and creates the list of nanaMoves for the
* 			algorithm to run
*
* Res ( ) 	- 	function that runs to enable and disable certain buttons in firefox	
*		
*
* Forward ( ) 	-	function that steps forward through the entire animation when the "Demo" button is pushed in the
* 			HTML file 		
*	
* Forward2 ( ) 	-	function that steps forward through the animation one
* 			step at a time as the "Forward" button is pushed in the
* 			HTML file
* 			
* Back ( ) 	-	function that steps back through the animation one step
* 			at a time as the "back" button is pushed in the HTML
* 			file
* Highlight ( variable ) 	-	function that unhighlights a line of psuedocode
* 				and a div box
* 
* Undo ( ) 	-	function that undoes all the higlights in the psuedocode
* 
* InitializeTimer ( ) 	-	first of three function required to run the
* 				timer for the demo
* 				
* StopTheClock ( ) 	-	second of three functions required to run the
* 				timer for the demo
* 				
* StartTheTimer ( ) 	-	third of three functions required to run the
* 				timer for the demo
* 				
**********************************************************/

// GLOBAL VARIABLES ARE YOUR FRIEND!!!

// Global variables required by pbMan and jsAnim to run the animations
var manager = new jsAnimManager ( );
var playback = new pbManager ( );

// Global variables list of global variables used in running the
// algorithm/animation
//the moves array is the array the naMoves are stored
var naMoves = new Array;
var nCounter = 0;
naMoves[0] = 'psuedoCode0'

// Global variables for the timer
var nSecs
var bTimerId = null
var bTimerRunning = false
var nDelay = 500

/**********************************************************
* Swap( nSwp1, nSwp2 )	-	function that animates the naMoves for box 1 to position of box2 and box 2 to position of box 1
***********************************************************/
function Swap( nSwp1, nSwp2 )
{
    if ( nSwp1 != nSwp2 )
    {
        mov1 = 'box'+nSwp1
        mov2 = 'box'+nSwp2
        var swap1 = playback.createPBObject ( manager );
        swap1.set ( { property: playProp.swap, object1: mov1, object2: mov2, duration: 500 } );
    }
}
/**********************************************************
* Swap2(nSwp1, nSwp2)	-	function that is used by Initalization to move boxes into position
***********************************************************/
function Swap2 ( nSwp1, nSwp2 )
{
    if ( nSwp1 != nSwp2 )
    {
        var naTemp = new Array;
        naTemp[0] = nSwp1;
        naTemp[1] = nSwp2;
        naMoves.push ( naTemp );
    }
}

/**********************************************************
* Insertion(naUnsorted)	-	function that naMoves the boxes into numberical order
**********************************************************/
function Insertion(naUnsorted) 
{
    for (i=1; i<naUnsorted.length; i++)
    {
        naMoves.push('psuedoCode1');
	current = naUnsorted[i];
	var count = i;
        Swap2(current,11);
	for ( j=i-1; j>=0;j-- )
        {
	    if (naUnsorted[j]>=current)
	    {
                naMoves.push('psuedoCode2');
                Swap2(naUnsorted[j],11);
		naUnsorted[j+1]=naUnsorted[j];
		count--;
	    }
	}
        naMoves.push ('psuedoCode3');
        Swap2(current,11);
	naUnsorted[count]=current;
        naMoves.push ('psuedoCode4');
    }
    return naUnsorted;
}

/**********************************************************
* Initialize ( ) 	-	function that runs as the page is loaded, will pre-run
* 			the algorithm and creates the list of naMoves for the
* 			algorithm to run
**********************************************************/
function Initialize() 
{
    var naUnsorted = new Array;
    naUnsorted[0] = 5;
    naUnsorted[1] = 0;
    naUnsorted[2] = 8;
    naUnsorted[3] = 3;
    naUnsorted[4] = 9;
    naUnsorted[5] = 7;
    naUnsorted[6] = 1;
    naUnsorted[7] = 6;
    naUnsorted[8] = 2;
    naUnsorted[9] = 4;

    var sorted = Insertion(naUnsorted);
    naMoves.push('psuedoCode5');
	
	document.getElementById ( "concept" ).onmouseover = function ( ) {
		Tip( 'Insertion sort is a simple sorting algorithm, a comparison sort in which the sorted array (or list) is built one entry at a time. It is much less efficient on large lists than more advanced algorithms such as quicksort, heapsort, or merge sort. In abstract terms, every iteration of insertion sort removes an element from the input data, inserting it into the correct position in the already-sorted list, until no input elements remain. The choice of which element to remove from the input is arbitrary, and can be made using almost any choice algorithm.',WIDTH, 500, FONTFACE, 'Verdana, sans-serif', FONTSIZE, '12pt',FONTCOLOR, '#000000',PADDING, 8, SHADOW, true, SHADOWCOLOR, '#CCCCCC', FADEIN, 400, FADEOUT, 800,CENTERMOUSE, true, OFFSETX, 0 ,BGCOLOR, '#FFFFCC');
	}
	document.getElementById ( "howto" ).onmouseover = function( ) {
		Tip( '<strong>Demo</strong> - Starts the Insertion Sort  animation.<br /><br /><strong>Forward</strong> - Allows the user to step through the sort one step at a time. Walkthrough is enabled when this button is pressed.<br /><br /><strong>Back</strong> - Enables the back feature allowing user to step back through the sort.<br /><br /><strong>Reset</strong> - Resets the Insertion Sort animation to the beginning.' ,WIDTH, 400, FONTFACE, 'Verdana, sans-serif', FONTSIZE, '12pt',FONTCOLOR, '#000000',PADDING, 8, SHADOW, true, SHADOWCOLOR, '#CCCCCC', FADEIN, 400, FADEOUT, 800,CENTERMOUSE, true, OFFSETX, 0 ,BGCOLOR, '#CEFFFF');
	}
}

/**********************************************************
* Highlight ( variable ) 	-	function that highlights a line of psuedocode
* 				and a div box
**********************************************************/
function Highlight ( sVariable )
{
    var anim = manager.createAnimObject ( sVariable );  
    anim.add ( { property: Prop.backgroundColor, to: new Col ( 255,255,0 ), duration:0 } );
}

/**********************************************************
* Undo ( ) 	-	function that undoes all the higlights in the psuedocode
**********************************************************/
function Undo( )
{
    for ( i = 0; i <= 5; i++ )
    {
        sVariable = 'psuedoCode' + i; 
        var anim = manager.createAnimObject ( sVariable ); 
        anim.add ({ property: Prop.backgroundColor, to: new Col ( 255,255,255 ), duration:0 } );
    }
}

/**********************************************************
* Undo2 ( )	-	function that undoes all of the highlights in the psuedocode
************************************************************/
function Undo2( )
{
    for ( i = 0; i <= 5; i++ )
    {
        sVariable = 'psuedoCode' + i;
        var anim = manager.createAnimObject ( sVariable );
        anim.add ( { property: Prop.backgroundColor, to: new Col ( 255,255,255 ), duration:0 } ); 
    }
}

var nCounter = 0

/**********************************************************
* Forward ( ) 	-	function that steps forward through the entire animation when the "Demo" button is pushed in the
* 			HTML file 
************************************************************/
function Forward ( )
{
    document.getElementById ( "s1" ).disabled = true;
    document.getElementById ( "b1" ).disabled = false;
    if ( nCounter == naMoves.length - 1)
    {
        Undo2 ( );
        Highlight ( naMoves [nCounter] );
        document.getElementById ( "f1" ).disabled = true;
        document.getElementById ( "b1" ).disabled = true;
    }
    else
    {
        var naTemp = naMoves[nCounter]
        document.getElementById ( "b1" ).disabled = false;
        if ( naTemp.length == 2 )
        {
            Swap ( naTemp[0], naTemp[1] );
        }
        else
        {
            Undo2 ( );
            Highlight (naMoves[nCounter] );
        }
        nCounter++;
    }
}


/**********************************************************
* Back ( ) 	-	function that steps back through the animation one step
* 			at a time as the "back" button is pushed in the HTML
* 			file
************************************************************/
function Back ( )
{
    if ( nCounter == 0 )
    {
        document.getElementById ( "b1" ).disabled = true;
        Undo ( );
    }
    if (nCounter == naMoves.length - 1)
    {
        Undo2 ( );
        Highlight (naMoves[nCounter] );        
        if ( nCounter != 0 )
        {
            nCounter--;
        }
    }
    else
    {
        if ( nCounter != 0 )
        {
            nCounter--;
        }
        var naTemp = naMoves[nCounter];
        if ( naTemp.length == 2 )
        {
            swap ( naTemp[0], naTemp[1] );
        }
        else
        {
            Undo2 ( );
            Highlight ( naMoves[nCounter] );
        }
    }
    
}

/**********************************************************
* Res ( ) 	- 	function that runs to enable and disable certain buttons in firefox	
************************************************************/
function Res ( )
{
    document.getElementById ( "s1" ).disabled = false;
    document.getElementById ( "f1" ).disabled = false;
    document.getElementById ( "b1" ).disabled = true;    
}

/**********************************************************
* Forward2 ( ) 	-	function that steps forward through the animation one
* 			step at a time as the "Forward" button is pushed in the
* 			HTML file
************************************************************/
function Forward2 ( )
{
    document.getElementById ( "f1" ).disabled = true;
    if ( nCounter == naMoves.length - 1 )
    {
        Undo2 ( );
        Highlight ( naMoves[nCounter] );
    }
    else
    {
        var naTemp = naMoves[nCounter];
        if ( naTemp.length == 2 )
        {
            Swap ( naTemp[0], naTemp[1] );
        }
        else
        {
            Undo2 ( );
            Highlight ( naMoves[nCounter] );
        }
    }
    nCounter++;
}

/**********************************************************
* InitializeTimer ( ) 	-	first of three function required to run the
* 				timer for the demo
************************************************************/
function InitializeTimer ( )
{
    // Set the length of the timer, in seconds
    nSecs = 1
    StopTheClock ( )
    StartTheTimer ( )
}

/**********************************************************
* StopTheClock ( ) 	-	second of three functions required to run the
* 				timer for the demo
************************************************************/
function StopTheClock ( )
{
    if ( bTimerRunning )
        clearTimeout ( bTimerId )
    bTimerRunning = false
}

/**********************************************************
* StartTheTimer ( ) 	-	third of three functions required to run the
* 				timer for the demo
************************************************************/
function StartTheTimer ( )
{
    if ( nSecs == 0 )
    {
        StopTheClock ( );
        Forward2 ( );
        InitializeTimer ( );
    }
    else
    {
        self.status = nSecs
        nSecs = nSecs - 1
        bTimerRunning = true
        bTimerId = self.setTimeout ( "StartTheTimer ( )", nDelay )
    }
}