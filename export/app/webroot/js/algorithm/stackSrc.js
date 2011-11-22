/*********************************************************
*	Name:			Gerren Willis and Victor Herrera
*	File:			Stackfunc.js
*	Created:		February 14, 2010
*	Description: 	Stacks are a type of container adaptors, specifically designed to operate in a LIFO context (last-in first-out), 
*					where elements are inserted and extracted only from the end of the container.
*					Stacks are implemented as containers adaptors, which are classes that use an encapsulated object of a specific 											
*					container class as its underlying container, providing a specific set of member functions to access its elements. 	
*					Elements are pushed/popped from the "back" of the specific container, which is known as the top of the stack.
*	Dependencies:	jsAnim.js
*	Function:
*			pushCode	:	first thing thats called when push back button is pressed. 
*							Handles pseudo code for push back and calls the 	
*							animation for push back
*			popCode()	:	first thing thats called when pop back button is pressed. 
*							Handles pseudo code for pop back and calls the 	
*							animation for pop back
*			selectText():	handles arrow animation and handles input functionality
*			appear()	:	animation for the pushback part of the algorithm
*			fade()		:	animation for the popback algorithm
*			stretch()	:	animates the black lines that connects the stack
*********************************************************/




var manager = new jsAnimManager(); //manager for jsanim

var stack_num = 1; //keeps track of number of stacks
var last = 1; //keeps track of the last stack
var popping_back = 0; //
var value = 0; //keeps track of inputed value
var counter = 1; //Keeps track of lines of the pseudo code 
var once = 1; //Flag to keep push back from being called repeatidly 
var onceBack = 1; //flag to keep pop back from being called repeatidly
var flag = 0; //flag to keep transition from popback to push back psudo code from being called repeadtidly
var flag2 = 1; //flag to keep transition from pushback to popback psudo code from being called repeadtidly

function Initialize()
{
	document.getElementById("concept").onmouseover = function () {
		Tip("In computer science, a stack is an abstract data type and data structure based on the principle of Last In First Out (LIFO). Stacks are used extensively at every level of a modern computer system. For example, a modern PC uses stacks at the architecture level, which are used in the basic design of an operating system for interrupt handling and operating system function calls. Among other uses, stacks are used to run a Java Virtual Machine, and the Java language itself has a class called 'Stack', which can be used by the programmer. The stack is ubiquitous.<br /><br />A stack-based computer system is one that stores temporary information primarily in stacks, rather than hardware CPU registers (a register-based computer system).",WIDTH, 500, FONTFACE, 'Verdana, sans-serif', FONTSIZE, '12pt',FONTCOLOR, '#000000',PADDING, 8, SHADOW, true, SHADOWCOLOR, '#CCCCCC', FADEIN, 400, FADEOUT, 800,CENTERMOUSE, true, OFFSETX, 0 ,BGCOLOR, '#FFFFCC');
	}
	document.getElementById("howto").onmouseover = function() {
		Tip("<strong>Push Back</strong> - Push a random element to the structure to the back of the list.<br /><br /><strong>Pop Back</strong> - Remove an element from the back of the list.<br /><br /><strong>Reset</strong> - Reset the stack to be empty.<br /><br /><strong>Set Value</strong> - Set value to be added.<br /><br />",WIDTH, 400, FONTFACE, 'Verdana, sans-serif', FONTSIZE, '12pt',FONTCOLOR, '#000000',PADDING, 8, SHADOW, true, SHADOWCOLOR, '#CCCCCC', FADEIN, 400, FADEOUT, 800,CENTERMOUSE, true, OFFSETX, 0 ,BGCOLOR, '#CEFFFF');
	}
}
/*********************************************************
*	Function Name: 			pushCode
*	Function Description:	first thing thats called when push back button is pressed. Handles pseudo code for push back and calls the 	
							animation for push back
*********************************************************/
function pushCode() 
{

		if(stack_num<5 && once && flag2)
{	
		 
		once = 0; 
		flag = 0; 
		
		 document.getElementById("function1").innerHTML = "Pushback"; 
		 document.getElementById("function2").innerHTML = "PROCEDURE pushback(i : integer)"; 
		 document.getElementById("function3").innerHTML = "VAR newNode : Pointer"; 
		 document.getElementById("function4").innerHTML = "BEGIN"; 
	     document.getElementById("function5").innerHTML = "&nbsp newNode.value = i";
		 document.getElementById("function6").innerHTML = "&nbsp IF (list.first == list.last)"; 
		 document.getElementById("function7").innerHTML = "&nbsp &nbsp list.first = newNode"; 
		 document.getElementById("function8").innerHTML = "&nbsp ELSE"; 
	     document.getElementById("function9").innerHTML = "&nbsp &nbsp list.last.next = newNode";
		 document.getElementById("function10").innerHTML = "&nbsp ENDIF"; 
	     document.getElementById("function11").innerHTML = "&nbsp list.last = newNode"; 
      	 document.getElementById("function12").innerHTML = "&nbsp newNode.next = NULL"; 
	     document.getElementById("function13").innerHTML = "END"; 
	
	if(counter ==1)
			{
			
			//highlight first line in red
			setTimeout(function(){
			document.getElementById("function1").style.backgroundColor = "yellow";
			}, 500);
			counter++;
			
			}
				
			if(counter ==2)
			{
			
			//unhighlight first line and then highlight second line
			setTimeout(function(){
			document.getElementById("function1").style.backgroundColor = "white";
			document.getElementById("function2").style.backgroundColor = "yellow";
			}, 1000);
			counter++;
			
			}

			if(counter ==3)
			{

			//unhighlight first line and then highlight second line
			setTimeout(function(){
			document.getElementById("function2").style.backgroundColor = "white";
			document.getElementById("function5").style.backgroundColor = "yellow";
			appear(); //push back animation call 
			}, 1500);
			counter++;
			
			}

			if(counter ==4)
			{
			
			//unhighlight first line and then highlight second line
			setTimeout(function(){
			document.getElementById("function5").style.backgroundColor = "white";
			document.getElementById("function9").style.backgroundColor = "yellow";
			}, 3000); //waits an extra 1500 to delay on the previouse line
			counter++;
		
			}

			if(counter ==5)
			{
			
			//unhighlight first line and then highlight second line
			setTimeout(function(){
			document.getElementById("function9").style.backgroundColor = "white";
			document.getElementById("function11").style.backgroundColor = "yellow";
			}, 3500);
			counter++;
		
			}
			
			if (counter ==6)
			{

			//unhighlight first line and then highlight second line
			setTimeout(function(){
			document.getElementById("function11").style.backgroundColor = "white";
			document.getElementById("function12").style.backgroundColor = "yellow";
			}, 4000);
			counter++;
		
			}

			if (counter ==7)
			{

			//unhighlight first line and then highlight second line
			setTimeout(function(){
			document.getElementById("function12").style.backgroundColor = "white";
			document.getElementById("function13").style.backgroundColor = "yellow";
			 
			}, 4500);
			counter ++; 
			}
           if(counter ==8)
			{
			
			//highlight first line in red
			setTimeout(function(){
			
			document.getElementById("function13").style.backgroundColor = "white";
			document.getElementById("function1").style.backgroundColor = "yellow";
			}, 5000);
			counter = 1;
		    
			
			}
			setTimeout(function(){
			
			once = 1;
			flag = 1; 
			}, 5200);
}
	
}
/*********************************************************
*	Function Name: 			popCode()
*	Function Description:	first thing thats called when pop back button is pressed. Handles pseudo code for pop back and calls the 	
							animation for pop back
*********************************************************/
function popCode()
{
		if(stack_num >1 && flag && onceBack)
		{
			flag2 = 0; 
			onceBack = 0; 
	  	 document.getElementById("function1").innerHTML = "PopBack"; 
		 document.getElementById("function2").innerHTML = "PROCEDURE popback"; 
		 document.getElementById("function3").innerHTML = "BEGIN"; 
		 document.getElementById("function4").innerHTML = "&nbsp IF (list != empty)"; 
	     document.getElementById("function5").innerHTML = "&nbsp &nbsp Object obj = list.last";
		 document.getElementById("function6").innerHTML = "&nbsp &nbsp list.last = null"; 
		 document.getElementById("function7").innerHTML = "&nbsp &nbsp list.first = list.size()-2"; 
		 document.getElementById("function8").innerHTML = "&nbsp &nbsp return obj"; 
	     document.getElementById("function9").innerHTML = "&nbsp ENDIF";
		 document.getElementById("function10").innerHTML = "&nbsp ELSE"; 
	     document.getElementById("function11").innerHTML = "&nbsp &nbsp return null"; 
      	 document.getElementById("function12").innerHTML = "END"; 
	     document.getElementById("function13").innerHTML = ""; 
	 
		 
		 	 	if(counter ==1)
			{
			
			//highlight first line in red
			setTimeout(function(){
			document.getElementById("function1").style.backgroundColor = "yellow";
			}, 500);
			counter++;
			
			
			}
				
			if(counter ==2)
			{
			
			//unhighlight first line and then highlight second line
			setTimeout(function(){
			document.getElementById("function1").style.backgroundColor = "white";
			document.getElementById("function2").style.backgroundColor = "yellow";
			}, 1000);
			counter++;
			
			}

			if(counter ==3)
			{

			//unhighlight first line and then highlight second line
			setTimeout(function(){
			document.getElementById("function2").style.backgroundColor = "white";
			document.getElementById("function5").style.backgroundColor = "yellow";
			}, 1500);
			counter++;
		
			}

			if(counter ==4)
			{
			
			//unhighlight first line and then highlight second line
			setTimeout(function(){
			document.getElementById("function5").style.backgroundColor = "white";
			document.getElementById("function6").style.backgroundColor = "yellow";
			}, 2000);
			counter++;
		
			}

			if(counter ==5)
			{
			
			//unhighlight first line and then highlight second line
			setTimeout(function(){
			document.getElementById("function6").style.backgroundColor = "white";
			document.getElementById("function7").style.backgroundColor = "yellow";
			}, 2500);
			counter++;
		
			}
			
			if (counter ==6)
			{

			//unhighlight first line and then highlight second line
			setTimeout(function(){
			document.getElementById("function7").style.backgroundColor = "white";
			document.getElementById("function8").style.backgroundColor = "yellow";
			fade(); //pop back animation is being called
			}, 3000);
			counter++;
		
			}

			if (counter ==7)
			{

			//unhighlight first line and then highlight second line
			setTimeout(function(){
			document.getElementById("function8").style.backgroundColor = "white";
			document.getElementById("function12").style.backgroundColor = "yellow";
			}, 4500); //waits an extra 1500 to delay on the previouse line
			counter++;
	        if(counter ==8)
			{
			
			//highlight first line in red
			setTimeout(function(){
			
			document.getElementById("function12").style.backgroundColor = "white";
			document.getElementById("function1").style.backgroundColor = "yellow";
			 
			}, 5000);
			counter = 1;
		    
			
			}
			
			setTimeout(function(){
			
			onceBack = 1;
			flag2 = 1; 
			}, 5200);
		
		}
	}
		   
		
}
/*********************************************************
*	Function Name: 			selectText()
*	Function Description:	handles arrow animation and handles input functionality
*********************************************************/
function selectText() 
{
	var stack_num_behind = stack_num-1; //keeps track of the first previouse stack
	var pickup = stack_num_behind-1;  //keeps track of the second previouse stack 
	var attatch = stack_num +1;
   if(popping_back) // if you are poping back
   {
      document.getElementById("text"+ stack_num_behind).innerHTML = ""; 
	  document.getElementById("bottom"+ stack_num_behind).innerHTML = ""; 
	  document.getElementById("arrow" + stack_num).src = "/algo/images/algorithm/stack/blank.png";
	  if(stack_num>2)
	  {
	  document.getElementById("bottom"+ pickup).innerHTML = "Last";
	  document.getElementById("arrow" + stack_num_behind).src = "/algo/images/algorithm/stack/arrow.png";
	  }
	  
   }
   if(!popping_back) //if you are not popping back
   {
	
	document.getElementById("text"+stack_num).innerHTML = value;
	document.getElementById("bottom"+stack_num).innerHTML = "Last";
	document.getElementById("arrow" + attatch).src = "/algo/images/algorithm/stack/arrow.png";
	
	if(stack_num > 1)
	{
    document.getElementById("arrow" + stack_num).src = "/algo/images/algorithm/stack/blank.png";
	document.getElementById("bottom"+stack_num_behind).innerHTML = "";
	document.getElementById("bottom1").innerHTML = "First";
	}
	
   }
}
/*********************************************************
*	Function Name: 			setTarget()
*	Function Description:	sets the input value into the stack
*********************************************************/
function setTarget() 
{
	
	value = document.getElementById("input1").value;

}
/*********************************************************
*	Function Name: 			appear()
*	Function Description:	animation for the pushback part of the algorithm
*********************************************************/
function appear ()
{
	popping_back = 0; 
 
     selectText(); 
	 
      if (stack_num <= 5)
{
	var anim = manager.createAnimObject("Stack" + stack_num); 
	var anim2 = manager.createAnimObject("bottom" + stack_num);
	var anim3 = manager.createAnimObject("text" + stack_num);
    anim.add({property: Prop.backgroundColor, from: new Col(255,255,255), to: new Col(100,205,55),  
        duration:500}); 
	 anim2.add({property: Prop.backgroundColor, from: new Col(255,255,255), to: new Col(10,105,55),  
        duration:500});
	  anim3.add({property: Prop.backgroundColor, from: new Col(255,255,255), to: new Col(100,205,55),  
        duration:500});// this is for fadeing in to view animation
	 
	
	 
	 
}

stack_num++;
last--;
if(last<1)
{
	last = 0; 
}
if(stack_num>2)
{
stretch();
}
if(stack_num>5)
{
	stack_num = 6;
}

}
/*********************************************************
*	Function Name: 			fade()
*	Function Description:	animation for the popback algorithm
*********************************************************/
function fade () 
{
	 
	 popping_back = 1;
	
     selectText(); 
	
     if (stack_num <= 6)
{
	
	 
	
	stack_behind_one = stack_num - 1; 

	stack_behind_2 = stack_behind_one -1;
 
	if(stack_behind_one == 0)
	{
		stack_behind_one = 1; 
	}
	var anim = manager.createAnimObject("Stack" + stack_behind_one); 
	var anim2 = manager.createAnimObject("bottom" + stack_behind_one);
	var anim3 = manager.createAnimObject("text" + stack_behind_one);
	var anim4 = manager.createAnimObject("spacer" + stack_behind_2);
	var anims = manager.createAnimObject("spacer"+stack_behind_2); 
	if(stack_behind_one>1)
	{
	
	
    anims.add({property: Prop.dimension, to: new Dim(1,5),   
    duration: 1000});  
    anim4.add({property: Prop.backgroundColor, from: new Col(0,0,0), to: new Col(255,255,255),  
        duration:1000}); 
    anim.add({property: Prop.backgroundColor, from: new Col(100,205,55), to: new Col(255,255,255),  
        duration:1000}); 
	 anim2.add({property: Prop.backgroundColor, from: new Col(10,105,55), to: new Col(255,255,255),  
        duration:1000});
	  anim3.add({property: Prop.backgroundColor, from: new Col(100,205,55), to: new Col(255,255,255),  
        duration:1000});
	}// this is for the fadeing out animation
	 
	if(stack_behind_one==1 && last == 0)
	{
		var fin = manager.createAnimObject("Stack1");
		var fin2 = manager.createAnimObject("bottom1");
	var fin3 = manager.createAnimObject("text1");
			fin.add({property: Prop.backgroundColor, from: new Col(100,205,55), to: new Col(255,255,255), duration:1000}); 
			 fin2.add({property: Prop.backgroundColor, from: new Col(10,105,55), to: new Col(255,255,255),  
        duration:1000});
			   fin3.add({property: Prop.backgroundColor, from: new Col(100,205,55), to: new Col(255,255,255),  
        duration:1000});
			   last = 1; 

	}//this is to fade away the last stack
	 
	 
}

stack_num--;
if (stack_num <1)
{
stack_num= 1;
}

}
/*********************************************************
*	Function Name: 			stretch()
*	Function Description:	animates the black lines that connects the stack
*********************************************************/
function stretch () 
{
	
    
	st_stack_behind = stack_num - 2;
	
      if (st_stack_behind <= 4)
{
	var anim3 = manager.createAnimObject("spacer" + st_stack_behind);
    anim3.add({property: Prop.backgroundColor, from: new Col(255,255,255), to: new Col(0,0,0),  
        duration:1000}); 
	
	var anim = manager.createAnimObject("spacer"+st_stack_behind); 
    anim.add({property: Prop.dimension, to: new Dim(20,5),   
    duration: 1000});  
}


	  
	 
}


