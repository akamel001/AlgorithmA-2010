/*********************************************************
*	Name:		Danny Vargas
*	File:		pbMan.js
*	Created:	February 14, 2010
*	Dependency:	jsAnim.js
*	Notes:		Makes use of the jsAnim library to maintain a playback 
				queue for utility functionality.
				
				Follows closely to the style of jsAnim with a few 
				differences:
					1) Only 2 layers
						- Top Lever - Manager
						- Bottom Layer - Playback Animation Object
					2) This does not control the functions found in jsAnim. 
						This is merely a queue that each animation will take.
				
				Because of this, the playback queue relies on a manager
				to be passed in for each task property.
*	Functions:	
		pbManager(...)		 	:	The main playback manager.
			step()				:	Steps through each animation in queue.
			createpbObject:	Creates a single playback instance.
	
		pbObject			:	A single playback instance.
			step				:	Plays the animations set by parameters.
			add					:	Takes in a series of parameters that setups
									a single animation.
		
		playProp				:	A class with several preset tasks.
			swap				:	Swaps two elements for a specified time.
					

***********************************************************/

// An array of playback managers.
var playbackQueue = new Array();
var playbackId = 0;

/*!
*	The main playback manager.
*		* Maintains a list of all playback objects. Each object must be created
*			for each individual animation.
*		* Once initialized, the manager is always running by calling step by a 
*			pre-specified interval.
*		* Step will only play the next animation sequence when jsAnim's manager
*			reports that no other sequential animation is currently playing.
*			(this is done by a global flag called "sequentID")
*		* It will clear itself completely when all tasks have been completed.
*/
function pbManager (timestep)
{
	// Creates a new instance of itself within the global playback managers
	playbackQueue[playbackId] = this;
	this.myId = playbackId;
	playbackId++;

	// Timestep - time in milliseconds pbManager polls itself.
	if (timestep)
		this.timestep = timestep;
	else
		this.timestep = 40;
	
	// List of playback objects - these are the actual animations.
	// Only one per object.
	this.pbObjects = new Array();
	this.playbackIndex = 0;
	
	// Used to keep track of the current playback object being played.
	this.curPlayback = 0;
	
	// User creates a playback object here. 
	// 		manager : the jsAnim manager being used in this sequence.
	this.createPBObject = function(manager)
	{
		var id = this.playbackIndex;
		this.pbObjects[id] = new pbObject(id,manager);
		this.playbackIndex++;
		return this.pbObjects[id];
	}
	
	// Completely clears the manager for the next set of animations of needed.
	this.clear = function()
	{
		for (x in this.pbObjects)
			delete this.pbObjects[x];
		this.playbackIndex = 0;
		this.curPlayback = 0;
	}
	
	/*!
	* The main loop of the manager.
	*	* Once if finds that no squential animation is playing, it will play 
	* 		the next animation within the queue.
	*	* When all animations have been played, clear the manager.
	*/
	this.step = function ()
	{
		if (sequentID == -1)
		{
			if (this.curPlayback < this.playbackIndex)
			{	// Play next if there is still more in the queue
				this.pbObjects[this.curPlayback].step();
				this.curPlayback++;
			}
			else
			{	// Clear out queue if done
				this.clear();
			}
				
		}
		
		// Continues to poll itself here. Never stops.
		setTimeout("playbackQueue[" + this.myId + "].step()", this.timestep);
	}
	
	// Begin to poll itself.
	this.step();
	return true;
}

/*!
*	An instance of a playback animation
*		* Only houses one animation at a time. If you add another animation, 
*			it will override the current settings.
*		* Only performs one animation sequence for now. Therefore the properties
*			it takes in is limited.
*		* Just like jsAnim, you initialize the animation using a class block.
*			pbAnimation.add ( { property: playProp.swap, object1: obj .... } );
*		* Has an internal step function that calls the appropriate play property.
*/
function pbObject (id, manager)
{
	// Internal parameters - initialize
	this.property = 0;
	this.object1 = 0;
	this.object2 = 0;
	this.duration = 0;
	this.manager = manager;
	this.id = 0;
	
	/*!
	*	Main step function. Only performs it's action if a property is set
	*		Since there is no way to (to my knowledge) know what animation is set
	*		 all properties must use a play function with the same number of parameters.
	*/
	this.step = function()
	{
		if(this.property)
		{
			this.property.play(this.object1, this.object2, this.duration, this.manager);
		}
	}

	// The main way to initialize the object.
	this.set = function (params)
	{
		this.id = id;
		this.property = params.property;
		this.object1 = params.object1;
		this.object2 = params.object2;
		this.duration = params.duration;
		this.manager = manager;
	}
	
	return true;
}

/*!
*	The playProp Class
*		* This class lists all the play animation sequences that a user can specify.
*		* Each sequence must use a sub function "play" which takes in the same number of
*			arguements. Naming them can differ and the use may vary however.
*		* Each sequence must use a jsAnim manager as an arguement (last).
*			- This is used to create new animation objects.
*/
var playProp = 
{
	/*!
	*	Swap
	*		* Swaps two elements by ID strings.
	*		* Makes heavy use of jsAnim Utility functions.
	*/
	swap : 
	{
		play : function(ID1, ID2, duration1, manager)
		{
			var obj1 = document.getElementById(ID1);
			var obj2 = document.getElementById(ID2);
			var obj1Pos = new Pos(parseInt(jsAnimUtil.getCSS(obj1, 'left')), parseInt(jsAnimUtil.getCSS(obj1, 'top')));
			var obj2Pos = new Pos(parseInt(jsAnimUtil.getCSS(obj2, 'left')), parseInt(jsAnimUtil.getCSS(obj2, 'top')));
			
			var animObj1 = manager.createAnimObject(ID1);
			var animObj2 = manager.createAnimObject(ID2);
			
			animObj1.add({property: Prop.position, from: obj1Pos, to: obj2Pos, duration: duration1});
			animObj2.add({property: Prop.position, from: obj2Pos, to: obj1Pos, duration: duration1});
			animObj2.sequential();
		}
	}
	
	/*! Add More Here */
	
}