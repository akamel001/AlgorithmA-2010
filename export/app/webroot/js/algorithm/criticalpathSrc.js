/**************************** 
 *  Name:    Sean Siefert
 *  Name:	Michael Stephens
 *  File:     criticalpathSrc.js
 *  Project:  {AlgorithmA}; 2010
 *  Date Created:  March 10, 2010
 *  Purpose:
 *    Provide functions allowing the display of the critical path method.
 *  Dependencies:
 *    jsAnim.js
 *    wz_tooltip.js
 *    wz_jsgraphics.js
 *  Notes/Changelog:
 *    [List any notes such as, what has been
 *    changed and when]
 *  Functions:
 *    align()  :  Places elements.
 *    buildLines() : Builds the lines to be drawn.
 *    drawLine() : Calls the line constructor with the passed variables.
 *****************************/
var manager = new jsAnimManager(20);
var anims = new Array();
var startx = -310;
var starty = 140;
var boxWidth = 40;
var boxHeight = 40;

var posx = new Array(startx, startx + 160, startx + 160, startx + 380, startx + 380, startx + 540);
var posy = new Array(starty, starty + 80, starty - 80, starty + 80, starty - 80, starty);

var parents = new Array([-1], [0], [0, 1], [1, 2], [2, 3], [3, 4]);
var parentLines = new Array([-1], [0], [1, 2], [3, 4], [5, 6], [7, 8]);
var psuedoLines = new Array("for all nodes", "&nbsp;&nbsp;&nbsp;&nbsp;choose prerequisite node<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;with the highest time", "&nbsp;&nbsp;&nbsp;&nbsp;set maximum node time to:<br>&nbsp;&nbsp;&nbsp;&nbsp;time + prerequisite node time<br>", "<br>repeat<br>", "<br>for all nodes");
var psuedoLines2 = new Array("", "procedure findWeights(parents[1 - n])", "FOR i = 1 to length of parents do", "&nbsp;&nbsp;&nbsp;max = 0", "&nbsp;&nbsp;&nbsp;FOR j = 0 to length of parents[i] do", "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;IF maxWeight[parents[i][j]] + times[i][j] > max", "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;max = maxWeight[parents[i][j]] + times[i][j]", "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;maxParent[i] = parents[i][j]<br>", "&nbsp;&nbsp;&nbsp;&nbsp;maxWeight[i] = max", "procedure buildCriticalPath(maxParent[0 - n])", "currentNode = last node<br>", "WHILE currentNode is not 0", "&nbsp;&nbsp;&nbsp;currentNode = maxParent[currentNode]", "&nbsp;&nbsp;&nbsp;highlight currentNode");
var uniModCode = "A";
uniModCode = uniModCode.charCodeAt();
var animating = false;
var animWStep = -1;
//SWAP OR CHANGE FOR DIFFERENT IMG PATHS
var pathToImgs = "/algo/images/algorithm/criticalpath/";

 var blueImg = "url(" + pathToImgs + "cblue.png)";
 var greenImg = "url(" + pathToImgs + "cgreen.png)";
 var redImg = "url(" + pathToImgs + "cred.png)";
 var tealImg = "url(" + pathToImgs + "cteal.png)";
 /*
var blueImg = 'url(cblue.png)';
var greenImg = 'url(cgreen.png)';
var redImg = 'url(cred.png)';
var tealImg = 'url(cteal.png)';
*/
var redHex = "#d35050";
var greenHex = "#57c34e";
var blueHex = "#3798ff";
var tealHex = "#3bb2b2";

var step = new Array(8);
var buildSteps = new Array();

function Initialize ()
{
	// Set initial values of input boxes. This is so that reloading the screen doesn't break it.
	/* REQUIRED */
	// Sets up your Concept and How-To buttons.
	document.getElementById("concept").onmouseover = function()
	{
		Tip("The critical path method (CPM) is a planning tool that is used to schedule tasks in a project.  It is a weighted graph based algorithm that will calculate the minimum completion time of a project.  This is done by finding the longest path through the graph, from the start to the end, and then labeling those activities as critical.  The length of the critical path is simply the sum of all the lengths of the activities in the critical path.  If any of the activities along the critical path are delayed, it will delay the completion time of the entire project.  The CPM relies on project activities having a well defined duration and a clear predecessor/successor relationship between activities, that is a successor activity cannot be started until the predecessor activity is completed.  <br /><br />The actual algorithm first calculates the longest path to each node, starting with a weight of zero at the start node.  It does this by choosing the predecessor node with the largest sum of path to the predecessor and activity length leading to the node.  The longest path to each node is saved in this format.  Once the end node is reached, the critical path and the time to complete the critical path will be saved as well.", WIDTH, 400, FONTFACE, 'Verdana, sans-serif', FONTSIZE, '12pt', FONTCOLOR, '#000000', PADDING, 8, SHADOW, true, SHADOWCOLOR, '#CCCCCC', FADEIN, 400, FADEOUT, 800, CENTERMOUSE, true, OFFSETX, 0, BGCOLOR, '#CEFFFF');
	}
	document.getElementById("howto").onmouseover = function()
	{
		Tip("<strong>Start</strong> - This starts the process to trace the calcuation of the cumulative time of each path./><br /><br /><strong>Forward</strong> - This steps the animation forward.<br /><br /><strong>Backward</strong> - This steps the animation backward.<br /><br /><strong>Pause</strong> - This pauses the animation.<br /><br /><strong>Reset</strong> - This resets the animation.<br /><br /><strong>Input Boxes</strong> - The input boxes on the right side can be used to set the weights of the lines.  The letter before each box represents the edge that it will set the weigth for.", WIDTH, 400, FONTFACE, 'Verdana, sans-serif', FONTSIZE, '12pt', FONTCOLOR, '#000000', PADDING, 8, SHADOW, true, SHADOWCOLOR, '#CCCCCC', FADEIN, 400, FADEOUT, 800, CENTERMOUSE, true, OFFSETX, 0, BGCOLOR, '#CEFFFF');
	}
	for (i = 0; i < 9; i++) 
	{
		document.getElementById("form" + String.fromCharCode(uniModCode + i) + "data").value = lineTimeStart[i] + '';
	}
}

function initDivs ()

{
	//Inputs:	none
	//Outputs:	none
	//Purpose:	Set the background for the div for each node
	for (i = 0; i < mnodes.length; i++) 
	{
		mnodes[i].style.background = greenImg;
	}
}

function align ()
{
	//Inputs: Array of document elements to be placed
	//Outputs: No output.
	//Purpose: Place the document elements passed by nodes and labels. It references the indices in the arrays posx, posy for the placement location.
	// The indices must align with the appropriate node so that placement happens correctly. 
	var uniModCode = "A";
	uniModCode = uniModCode.charCodeAt();
	var temp;
	for (i = 0; i < mnodes.length; i++) 
	{
		manager.registerPosition(mnodes[i].id);
		mnodes[i].setPosition(posx[i], posy[i]);
		anims.push(manager.createAnimObject(mnodes[i].id));
	}
	temp = document.getElementById("forms");
	manager.registerPosition("forms");
	temp.setPosition(300, 130);
	anims.push(manager.createAnimObject("forms"));
}

function buildLines ()
{
	//Inputs:	nodes - Array of documents that need to have lines drawn
	//			names - Array of document activity names
	//			times - Array of activity lengths, corresponds to names
	//			colors - Array of the color of each line, corresponds to times
	//Outputs: 	No output.
	//Purpose: 	To call the drawLine() function for each line that needs to be drawn.
	drawLine(mnodes[0].offsetLeft + boxWidth, mnodes[0].offsetTop + boxHeight / 2, mnodes[1].offsetLeft - 9, mnodes[1].offsetTop + boxHeight / 2, 3, lineColors[0], lineNames[0], lineTimes[0]);
	drawArrowLeft(mnodes[1], lineColors[0]);
	drawLine(mnodes[0].offsetLeft + boxWidth, mnodes[0].offsetTop + boxHeight / 2, mnodes[2].offsetLeft - 9, mnodes[2].offsetTop + boxHeight / 2, 3, lineColors[1], lineNames[1], lineTimes[1]);
	drawArrowLeft(mnodes[2], lineColors[1]);
	drawLine(mnodes[1].offsetLeft + boxWidth / 2, mnodes[1].offsetTop, mnodes[2].offsetLeft + boxWidth / 2, mnodes[2].offsetTop + boxHeight + 9, 3, lineColors[2], lineNames[2], lineTimes[2]);
	drawArrowBottom(mnodes[2], lineColors[2]);
	drawLine(mnodes[1].offsetLeft + boxWidth, mnodes[1].offsetTop + boxHeight / 2, mnodes[3].offsetLeft - 9, mnodes[3].offsetTop + boxHeight / 2, 3, lineColors[3], lineNames[3], lineTimes[3]);
	drawArrowLeft(mnodes[3], (nodeColors[3] == tealImg) ? tealHex : (nodeColors[3] == redImg) ? redHex : (nodeColors[3] == blueImg) ? blueHex : greenHex)
	drawLine(mnodes[2].offsetLeft + boxWidth, mnodes[2].offsetTop + boxHeight / 2, mnodes[3].offsetLeft - 9, mnodes[3].offsetTop + boxHeight / 2, 3, lineColors[4], lineNames[4], lineTimes[4]);
	drawLine(mnodes[2].offsetLeft + boxWidth, mnodes[2].offsetTop + boxHeight / 2, mnodes[4].offsetLeft - 9, mnodes[4].offsetTop + boxHeight / 2, 3, lineColors[5], lineNames[5], lineTimes[5]);
	drawArrowLeft(mnodes[4], lineColors[5]);
	drawLine(mnodes[3].offsetLeft + boxWidth / 2, mnodes[3].offsetTop, mnodes[4].offsetLeft + boxWidth / 2, mnodes[4].offsetTop + boxHeight + 9, 3, lineColors[6], lineNames[6], lineTimes[6]);
	drawArrowBottom(mnodes[4], lineColors[6]);
	drawLine(mnodes[3].offsetLeft + boxWidth, mnodes[3].offsetTop + boxHeight / 2, mnodes[5].offsetLeft - 9, mnodes[5].offsetTop + 39 / 2, 3, lineColors[7], lineNames[7], lineTimes[7]);
	drawLine(mnodes[4].offsetLeft + boxWidth, mnodes[4].offsetTop + boxHeight / 2, mnodes[5].offsetLeft - 9, mnodes[5].offsetTop + boxHeight / 2, 3, lineColors[8], lineNames[8], lineTimes[8]);
	drawArrowLeft(mnodes[5], (nodeColors[5] == tealImg) ? tealHex : (nodeColors[5] == redImg) ? redHex : (nodeColors[5] == blueImg) ? blueHex : greenHex);
}

function drawLine ( x1, y1, x2, y2, stroke, color, name, time )
{
	//Inputs: 	x's and y's - Start and end coordinates
	//			stroke - size of line
	//			color - color of line
	//			name - name of activity(line)
	//			time - 	time of activity(line)
	//Outputs:	No output until paint() is called
	//Purpose: 	To call the necessary jsGraphics routines to build the lines that need to display. 
	//			Also calls labelLine which prints the label information for each line;
	jg.setColor(color);
	jg.setStroke(2);
	jg.drawLine(x1, y1, x2, y2);
	labelLine(x1, y1, x2, y2, color, name, time);
}

function labelLine ( x1, y1, x2, y2, color, name, time )
{
	//Inputs: 	x's and y's - Start and end coordinates
	//			color - color of line
	//			name - name of activity(line)
	//			time - 	time of activity(line)
	//Outputs: 	No output until paint() is called
	//Purpose: 	To call the necessary jsGraphics routines to print text around the lines.
	//			Takes the line start and end to calculate the midpoint and print from there
	jg.setFont("verdana", "15px", Font.ITALIC_BOLD);
	jg.drawString(name + "<br>" + time, Math.floor(average(x2, x1)), Math.floor(average(y2, y1) - 40));
}

function drawArrowLeft ( node, color )
{
	//Inputs: 	node - determines coordinates
	//			color - color of arrow
	//Outputs:	No output until paint() is called
	//Purpose: 	To call the necessary jsGraphics routines to build the arrows that need to display.
	//			Creates arrows that are on the left of an image
	jg.setColor(color);
	var xs = new Array(node.offsetLeft - 10, node.offsetLeft - 10, node.offsetLeft);
	var ys = new Array(node.offsetTop + boxHeight / 2 - 10, node.offsetTop + boxHeight / 2 + 10, node.offsetTop + boxHeight / 2);
	jg.fillPolygon(xs, ys);
}

function drawArrowBottom ( node, color )
{
	//Inputs: 	node - determines coordinates
	//			color - color of arrow
	//Outputs:	No output until paint() is called
	//Purpose: 	To call the necessary jsGraphics routines to build the arrows that need to display.
	//			Creates arrows that are on the bottom of an image
	jg.setColor(color);
	var xs = new Array(node.offsetLeft + 10, node.offsetLeft + boxWidth - 10, node.offsetLeft + boxWidth / 2);
	var ys = new Array(node.offsetTop + boxHeight + 10, node.offsetTop + boxHeight + 10, node.offsetTop + boxHeight);
	jg.fillPolygon(xs, ys);
}

function average ( a, b )
{
	
	//Inputs:	a and b
	//Outputs: 	The average of a and b
	//Purpose: 	To average a and b
	return (a + b) / 2;
}

function drawPsuedo ()
{
	//Inputs: 	none
	//Outputs:	none
	//Purpose:	To redraw the psuedocode allowing for animation
	jgp.clear();
	for (i = 1; i < psuedoLines2.length; i++) 
	{
		if (psuedoColors[i] == redHex) 
		{
			jgp.setColor("yellow");
			jgp.fillRect(-302, -25 + i * 20, 296, 25);
		}
	}
	jgp.setFont("verdana", "10px", Font.standard);
	for (i = 0; i < psuedoLines2.length; i++) 
	{
		jgp.setColor("black");
		jgp.drawString(psuedoLines2[i], -296, -20 + i * 20);
	}
	jgp.paint();
}

function drawWeights ()
{
	//Inputs:	none
	//Outputs:	none
	//Purpose: 	Draw the weights of each node
	if (animWStep != -1) 
	{
		for (i = 0; i < step[2].length; i++) 
		{
			jg.setColor(weightColors[i]);
			jg.drawString(step[2][i], mnodes[i].offsetLeft + boxWidth, mnodes[i].offsetTop - 10);
		}
	}
}

function draw ()
{
	//Inputs:	none
	//Outputs:	none
	//Purpose:	Clear the screen, and re-draw every element.
	jg.clear();
	drawPsuedo();
	drawWeights();
	buildLines();
	for (i = 0; i < mnodes.length; i++) 
	{
		mnodes[i].style.background = nodeColors[i];
	}
	jg.paint();
}

function setTimes ()
{
	//Inputs: 	Time forms on the webpage
	//Outputs:	None
	//Purpose: 	To update the internal array holding the values of the times assigned each activity
	if (animWStep == -1 || animWStep == 7) 
	{
		for (i = 0; i < 9; i++) 
		{
			lineTimes[i] = document.getElementById("form" + String.fromCharCode(uniModCode + i) + "data").value;
		}
	}
	else 
	{
		resetTimes();
	}
}

function resetTimes ()
{
	//Inputs: 	none
	//Outputs:	None
	//Purpose: 	To reset the forms to their default values
	for (i = 0; i < 9; i++) 
	{
		document.getElementById("form" + String.fromCharCode(uniModCode + i) + "data").value = lineTimeStart[i] + '';
	}
}

function resetNodes ()
{
	for (i = 0; i < nodeColors.length; i++) 
	{
		nodeColors[i] = greenImg;
	}
}

function reset ( clearWeights )
{
	//Inputs:	none
	//Outputs: 	none
	//Purpose:	Resets the screen for display
	if (clearWeights == undefined) 
	{
		clearWeights = false;
	}
	for (i = 0; i < mnodes.length; i++) 
	{
		nodeColors[i] = greenImg;
	}
	if (clearWeights) 
	{
		weightColors = new Array("white", "white", "white", "white", "white", "white");
	}
	setTimes();
	lineColors = lineColorsStart.slice(0);
	draw();
}

function resetVars ()

{
	//Inputs: 	none
	//Outputs:	none
	//Purpose:	To reset everything to a fresh state as if the page was refreshed. 
	lineTimes = lineTimeStart.slice(0);
	nodeColors = nodeColorsStart.slice(0);
	psuedoColors = psuedoColorsStart.slice(0);
	resetTimes();
	reset(true);
	buildSteps = new Array();
	step = new Array(9);
	animWStep = -1;
	animating = false;
	draw();
}

function wait ( msecs )
{
	//Inputs:	msecs - time in milliseconds to wait
	//Outputs:	none
	//Purpose:	Pauses javascript processing for the indicated amount of time
	var start = new Date().getTime();
	var cur = start
	while (cur - start < msecs) 
	{
		cur = new Date().getTime();
	}
}

function start ()
{
	animating = true;
	buildActivities();
}
//step vars holds the current state of animator step
//index 0 holds the activity times, index 1 holds max parents, index 2 holds max weights, index 3 holds outer i, index 4 holds max, index 5 holds inner i, index 6 holds anim state, index 7 holds node colors, index 8 holds weightColors, index 9 holds lineColors
//Once it is highlighting the critical path, case 4, it changes for the critical path algorithm. index 3 holds the node, number, 4 holds the previous number and the rest are the same

function buildActivities ()

{
	
	//Inputs:	none
	//Outputs:	none
	//Purpose:	Computes, as well as animates the critical path. Each case is a specific state, taking care of highlighting the appropriate, psuedocode, as well as nodes and lines
	//			the variable step, holds the state of all used variables, allowing them to be stored, and moved between. Buildsteps stores each move the function makes
	if (animWStep != -1) 
	{
		step[6] = animWStep;
		step[7] = nodeColors.slice(0);
		step[8] = weightColors.slice(0);
		step[9] = lineColors.slice(0);
		buildSteps.push(step.slice(0));
	}
	switch (animWStep)
	{
		case -1:
			animWStep++;
			setTimes();
			step = new Array(3);
			step[0] = new Array([0], [parseInt(lineTimes[0])], [parseInt(lineTimes[1]), parseInt(lineTimes[2])], [parseInt(lineTimes[3]), parseInt(lineTimes[4])], [parseInt(lineTimes[5]), parseInt(lineTimes[6])], [parseInt(lineTimes[7]), parseInt(lineTimes[8])]);
			step[1] = new Array(6);
			step[2] = new Array(0, 0, 0, 0, 0, 0);
			step[3] = 0;
			step[4] = 0;
			step[5] = 0;
			var temp = step[1];
			step[1][0] = 0;
			step[1][1] = parents[1][0];
			step[2][0] = 0;
			step[2][1] = step[0][1][0];
			step[3] = 1;
			nodeColors[0] = tealImg;
			break;
		case 0:
			if (step[3] < mnodes.length) 
				{
					lineColors = lineColorsStart.slice(0);
					psuedoColors = psuedoColorsStart.slice(0);
					psuedoColors[2] = redHex;
					psuedoColors[3] = redHex;
					step[4] = 0;
					step[5] = 0;
					animWStep = 1;
				}
			else 
				{
					step[3] = mnodes.length - 1;
					step[5] = 0;
					animWStep = 4;
				}
			break;
		case 1:
			psuedoColors = psuedoColorsStart.slice(0);
			psuedoColors[2] = redHex;
			psuedoColors[4] = redHex;
			psuedoColors[5] = redHex;
			nodeColors = nodeColorsStart.slice(0);
			nodeColors[step[3]] = tealImg;
			lineColors = lineColorsStart.slice(0);
			lineColors[parentLines[step[3]][step[5]]] = tealHex;
			if (step[2][parents[step[3]][step[5]]] + step[0][step[3]][step[5]] > step[4]) 
				{
					animWStep = 2;
				}
			else 
				{
					animWStep = 3;
				}
			break;
		case 2:
			psuedoColors = psuedoColorsStart.slice(0);
			psuedoColors[2] = redHex;
			psuedoColors[4] = redHex;
			psuedoColors[5] = redHex;
			psuedoColors[6] = redHex;
			psuedoColors[7] = redHex;
			step[4] = step[2][parents[step[3]][step[5]]] + step[0][step[3]][step[5]];
			step[1][step[3]] = parents[step[3]][step[5]];
			step[5]++;
			if (step[5] < parents[step[3]].length) 
				{
					animWStep = 1;
				}
			else 
				{
					animWStep = 3;
				}
			break;
		case 3:
			psuedoColors = psuedoColorsStart.slice(0);
			psuedoColors[2] = redHex;
			psuedoColors[8] = redHex;
			step[2][step[3]] = step[4];
			weightColors[step[3]] = redHex;
			animWStep = 0;
			step[3]++;
			break;
		case 4:
			lineColors = lineColorsStart.slice(0);
			psuedoColors = psuedoColorsStart.slice(0);
			nodeColors = nodeColorsStart.slice(0);
			psuedoColors[10] = redHex;
			step[3] = mnodes.length - 1;
			animWStep = 5;
			break;
		case 5:
			psuedoColors = psuedoColorsStart.slice(0);
			psuedoColors[11] = redHex;
			animWStep = 6;
			break;
		case 6:
			psuedoColors = psuedoColorsStart.slice(0);
			psuedoColors[11] = redHex;
			psuedoColors[12] = redHex;
			psuedoColors[13] = redHex;
			if (step[3] != 0) 
				{
					nodeColors[step[3]] = blueImg;
					if (step[3] == 5) 
					{
						step[4] = step[3];
						step[3] = step[1][step[3]];
					}
					else 
					{
						if ([step[3]] == parents[step[4]][0] && step[3] != 5) 
						{
							lineColors[parentLines[step[4]][0]] = blueHex;
						}
						else if (step[3] != 5) 
						{
							lineColors[parentLines[step[4]][1]] = blueHex;
						}
						step[4] = step[3];
						step[3] = step[1][step[3]];
					}
				}
			else 
				{
					lineColors[parentLines[step[4]]] = blueHex;
					nodeColors[0] = blueImg;
					animWStep = 7;
				}
			break;
		case 7:
			animating = false;
			break;
	}
	step[7] = nodeColors.slice(0);
	step[8] = weightColors.slice(0);
	step[9] = lineColors.slice(0);
	draw();
	if (animating) 
	{
		setTimeout(buildActivities, 750);
	}
}

function stepF ()
{
	if (animating) 
	{
		animating = false;
	}
	if (step[6] != 7) 
	{
		buildActivities();
	}
}

function stepB ()
{
	if (animating) 
	{
		animating = false;
	}
	if (buildSteps.length > 1) 
	{
		buildSteps.pop();
		step = buildSteps.pop();
		animWStep = step[6];
		nodeColors = step[7].slice();
		weightColors = step[8].slice();
		lineColors = step[9].slice();
		buildActivities();
	}
}
/////JS GRAPHICS
/* This notice must be untouched at all times.
 wz_jsgraphics.js    v. 3.05
 The latest version is available at
 http://www.walterzorn.com
 or http://www.devira.com
 or http://www.walterzorn.de
 Copyright (c) 2002-2009 Walter Zorn. All rights reserved.
 Created 3. 11. 2002 by Walter Zorn (Web: http://www.walterzorn.com )
 Last modified: 2. 2. 2009
 Performance optimizations for Internet Explorer
 by Thomas Frank and John Holdsworth.
 fillPolygon method implemented by Matthieu Haller.
 High Performance JavaScript Graphics Library.
 Provides methods
 - to draw lines, rectangles, ellipses, polygons
 with specifiable line thickness,
 - to fill rectangles, polygons, ellipses and arcs
 - to draw text.
 NOTE: Operations, functions and branching have rather been optimized
 to efficiency and speed than to shortness of source code.
 LICENSE: LGPL
 This library is free software; you can redistribute it and/or
 modify it under the terms of the GNU Lesser General Public
 License (LGPL) as published by the Free Software Foundation; either
 version 2.1 of the License, or (at your option) any later version.
 This library is distributed in the hope that it will be useful,
 but WITHOUT ANY WARRANTY; without even the implied warranty of
 MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU
 Lesser General Public License for more details.
 You should have received a copy of the GNU Lesser General Public
 License along with this library; if not, write to the Free Software
 Foundation, Inc., 59 Temple Place, Suite 330, Boston, MA  02111-1307  USA,
 or see http://www.gnu.org/copyleft/lesser.html
 */
var jg_ok, jg_ie, jg_fast, jg_dom, jg_moz;
function _chkDHTM(wnd, x, i)
// Under XUL, owner of 'document' must be specified explicitly
{
	x = wnd.document.body || null;
	jg_ie = x && typeof x.insertAdjacentHTML != "undefined" && wnd.document.createElement;
	jg_dom = (x && !jg_ie &&
	typeof x.appendChild != "undefined" &&
	typeof wnd.document.createRange != "undefined" &&
	typeof (i = wnd.document.createRange()).setStartBefore != "undefined" &&
	typeof i.createContextualFragment != "undefined");
	jg_fast = jg_ie && wnd.document.all && !wnd.opera;
	jg_moz = jg_dom && typeof x.style.MozOpacity != "undefined";
	jg_ok = !!(jg_ie || jg_dom);
}

function _pntCnvDom()
{
	var x = this.wnd.document.createRange();
	x.setStartBefore(this.cnv);
	x = x.createContextualFragment(jg_fast ? this._htmRpc() : this.htm);
	if (this.cnv) 
		this.cnv.appendChild(x);
	this.htm = "";
}

function _pntCnvIe()
{
	if (this.cnv) 
		this.cnv.insertAdjacentHTML("BeforeEnd", jg_fast ? this._htmRpc() : this.htm);
	this.htm = "";
}

function _pntDoc()
{
	this.wnd.document.write(jg_fast ? this._htmRpc() : this.htm);
	this.htm = '';
}

function _pntN()
{
	;
}

function _mkDiv(x, y, w, h)
{
	this.htm += '<div style="position:absolute;' +
	'left:' +
	x +
	'px;' +
	'top:' +
	y +
	'px;' +
	'width:' +
	w +
	'px;' +
	'height:' +
	h +
	'px;' +
	'clip:rect(0,' +
	w +
	'px,' +
	h +
	'px,0);' +
	'background-color:' +
	this.color +
	(!jg_moz ? ';overflow:hidden' : '') +
	';"><\/div>';
}

function _mkDivIe(x, y, w, h)
{
	this.htm += '%%' + this.color + ';' + x + ';' + y + ';' + w + ';' + h + ';';
}

function _mkDivPrt(x, y, w, h)
{
	this.htm += '<div style="position:absolute;' +
	'border-left:' +
	w +
	'px solid ' +
	this.color +
	';' +
	'left:' +
	x +
	'px;' +
	'top:' +
	y +
	'px;' +
	'width:0px;' +
	'height:' +
	h +
	'px;' +
	'clip:rect(0,' +
	w +
	'px,' +
	h +
	'px,0);' +
	'background-color:' +
	this.color +
	(!jg_moz ? ';overflow:hidden' : '') +
	';"><\/div>';
}

var _regex = /%%([^;]+);([^;]+);([^;]+);([^;]+);([^;]+);/g;
function _htmRpc()
{
	
	return this.htm.replace(_regex, '<div style="overflow:hidden;position:absolute;background-color:' +
	'$1;left:$2px;top:$3px;width:$4px;height:$5px"></div>\n');
}

function _htmPrtRpc()
{
	
	return this.htm.replace(_regex, '<div style="overflow:hidden;position:absolute;background-color:' +
	'$1;left:$2px;top:$3px;width:$4px;height:$5px;border-left:$4px solid $1"></div>\n');
}

function _mkLin(x1, y1, x2, y2)
{
	if (x1 > x2) 
	{
		var _x2 = x2;
		var _y2 = y2;
		x2 = x1;
		y2 = y1;
		x1 = _x2;
		y1 = _y2;
	}
	var dx = x2 - x1, dy = Math.abs(y2 - y1), x = x1, y = y1, yIncr = (y1 > y2) ? -1 : 1;
	if (dx >= dy) 
	{
		var pr = dy << 1, pru = pr - (dx << 1), p = pr - dx, ox = x;
		while (dx > 0) 
		{
			--dx;
			++x;
			if (p > 0) 
			{
				this._mkDiv(ox, y, x - ox, 1);
				y += yIncr;
				p += pru;
				ox = x;
			}
			else 
				p += pr;
		}
		this._mkDiv(ox, y, x2 - ox + 1, 1);
	}
	else 
	{
		var pr = dx << 1, pru = pr - (dy << 1), p = pr - dy, oy = y;
		if (y2 <= y1) 
		{
			while (dy > 0) 
			{
				--dy;
				if (p > 0) 
				{
					this._mkDiv(x++, y, 1, oy - y + 1);
					y += yIncr;
					p += pru;
					oy = y;
				}
				else 
				{
					y += yIncr;
					p += pr;
				}
			}
			this._mkDiv(x2, y2, 1, oy - y2 + 1);
		}
		else 
		{
			while (dy > 0) 
			{
				--dy;
				y += yIncr;
				if (p > 0) 
				{
					this._mkDiv(x++, oy, 1, y - oy);
					p += pru;
					oy = y;
				}
				else 
					p += pr;
			}
			this._mkDiv(x2, oy, 1, y2 - oy + 1);
		}
	}
}

function _mkLin2D(x1, y1, x2, y2)
{
	if (x1 > x2) 
	{
		var _x2 = x2;
		var _y2 = y2;
		x2 = x1;
		y2 = y1;
		x1 = _x2;
		y1 = _y2;
	}
	var dx = x2 - x1, dy = Math.abs(y2 - y1), x = x1, y = y1, yIncr = (y1 > y2) ? -1 : 1;
	var s = this.stroke;
	if (dx >= dy) 
	{
		if (dx > 0 && s - 3 > 0) 
		{
			var _s = (s * dx * Math.sqrt(1 + dy * dy / (dx * dx)) - dx - (s >> 1) * dy) / dx;
			_s = (!(s - 4) ? Math.ceil(_s) : Math.round(_s)) + 1;
		}
		else 
			var _s = s;
		var ad = Math.ceil(s / 2);
		var pr = dy << 1, pru = pr - (dx << 1), p = pr - dx, ox = x;
		while (dx > 0) 
		{
			--dx;
			++x;
			if (p > 0) 
			{
				this._mkDiv(ox, y, x - ox + ad, _s);
				y += yIncr;
				p += pru;
				ox = x;
			}
			else 
				p += pr;
		}
		this._mkDiv(ox, y, x2 - ox + ad + 1, _s);
	}
	else 
	{
		if (s - 3 > 0) 
		{
			var _s = (s * dy * Math.sqrt(1 + dx * dx / (dy * dy)) - (s >> 1) * dx - dy) / dy;
			_s = (!(s - 4) ? Math.ceil(_s) : Math.round(_s)) + 1;
		}
		else 
			var _s = s;
		var ad = Math.round(s / 2);
		var pr = dx << 1, pru = pr - (dy << 1), p = pr - dy, oy = y;
		if (y2 <= y1) 
		{
			++ad;
			while (dy > 0) 
			{
				--dy;
				if (p > 0) 
				{
					this._mkDiv(x++, y, _s, oy - y + ad);
					y += yIncr;
					p += pru;
					oy = y;
				}
				else 
				{
					y += yIncr;
					p += pr;
				}
			}
			this._mkDiv(x2, y2, _s, oy - y2 + ad);
		}
		else 
		{
			while (dy > 0) 
			{
				--dy;
				y += yIncr;
				if (p > 0) 
				{
					this._mkDiv(x++, oy, _s, y - oy + ad);
					p += pru;
					oy = y;
				}
				else 
					p += pr;
			}
			this._mkDiv(x2, oy, _s, y2 - oy + ad + 1);
		}
	}
}

function _mkLinDott(x1, y1, x2, y2)
{
	if (x1 > x2) 
	{
		var _x2 = x2;
		var _y2 = y2;
		x2 = x1;
		y2 = y1;
		x1 = _x2;
		y1 = _y2;
	}
	var dx = x2 - x1, dy = Math.abs(y2 - y1), x = x1, y = y1, yIncr = (y1 > y2) ? -1 : 1, drw = true;
	if (dx >= dy) 
	{
		var pr = dy << 1, pru = pr - (dx << 1), p = pr - dx;
		while (dx > 0) 
		{
			--dx;
			if (drw) 
				this._mkDiv(x, y, 1, 1);
			drw = !drw;
			if (p > 0) 
			{
				y += yIncr;
				p += pru;
			}
			else 
				p += pr;
			++x;
		}
	}
	else 
	{
		var pr = dx << 1, pru = pr - (dy << 1), p = pr - dy;
		while (dy > 0) 
		{
			--dy;
			if (drw) 
				this._mkDiv(x, y, 1, 1);
			drw = !drw;
			y += yIncr;
			if (p > 0) 
			{
				++x;
				p += pru;
			}
			else 
				p += pr;
		}
	}
	if (drw) 
		this._mkDiv(x, y, 1, 1);
}

function _mkOv(left, top, width, height)
{
	var a = (++width) >> 1, b = (++height) >> 1, wod = width & 1, hod = height & 1, cx = left + a, cy = top + b, x = 0, y = b, ox = 0, oy = b, aa2 = (a * a) << 1, aa4 = aa2 << 1, bb2 = (b * b) << 1, bb4 = bb2 << 1, st = (aa2 >> 1) * (1 - (b << 1)) + bb2, tt = (bb2 >> 1) - aa2 * ((b << 1) - 1), w, h;
	while (y > 0) 
	{
		if (st < 0) 
		{
			st += bb2 * ((x << 1) + 3);
			tt += bb4 * (++x);
		}
		else if (tt < 0) 
		{
			st += bb2 * ((x << 1) + 3) - aa4 * (y - 1);
			tt += bb4 * (++x) - aa2 * (((y--) << 1) - 3);
			w = x - ox;
			h = oy - y;
			if ((w & 2) && (h & 2)) 
			{
				this._mkOvQds(cx, cy, x - 2, y + 2, 1, 1, wod, hod);
				this._mkOvQds(cx, cy, x - 1, y + 1, 1, 1, wod, hod);
			}
			else 
				this._mkOvQds(cx, cy, x - 1, oy, w, h, wod, hod);
			ox = x;
			oy = y;
		}
		else 
		{
			tt -= aa2 * ((y << 1) - 3);
			st -= aa4 * (--y);
		}
	}
	w = a - ox + 1;
	h = (oy << 1) + hod;
	y = cy - oy;
	this._mkDiv(cx - a, y, w, h);
	this._mkDiv(cx + ox + wod - 1, y, w, h);
}

function _mkOv2D(left, top, width, height)
{
	var s = this.stroke;
	width += s + 1;
	height += s + 1;
	var a = width >> 1, b = height >> 1, wod = width & 1, hod = height & 1, cx = left + a, cy = top + b, x = 0, y = b, aa2 = (a * a) << 1, aa4 = aa2 << 1, bb2 = (b * b) << 1, bb4 = bb2 << 1, st = (aa2 >> 1) * (1 - (b << 1)) + bb2, tt = (bb2 >> 1) - aa2 * ((b << 1) - 1);
	if (s - 4 < 0 && (!(s - 2) || width - 51 > 0 && height - 51 > 0)) 
	{
		var ox = 0, oy = b, w, h, pxw;
		while (y > 0) 
		{
			if (st < 0) 
			{
				st += bb2 * ((x << 1) + 3);
				tt += bb4 * (++x);
			}
			else if (tt < 0) 
			{
				st += bb2 * ((x << 1) + 3) - aa4 * (y - 1);
				tt += bb4 * (++x) - aa2 * (((y--) << 1) - 3);
				w = x - ox;
				h = oy - y;
				if (w - 1) 
				{
					pxw = w + 1 + (s & 1);
					h = s;
				}
				else if (h - 1) 
				{
					pxw = s;
					h += 1 + (s & 1);
				}
				else 
					pxw = h = s;
				this._mkOvQds(cx, cy, x - 1, oy, pxw, h, wod, hod);
				ox = x;
				oy = y;
			}
			else 
			{
				tt -= aa2 * ((y << 1) - 3);
				st -= aa4 * (--y);
			}
		}
		this._mkDiv(cx - a, cy - oy, s, (oy << 1) + hod);
		this._mkDiv(cx + a + wod - s, cy - oy, s, (oy << 1) + hod);
	}
	else 
	{
		var _a = (width - (s << 1)) >> 1, _b = (height - (s << 1)) >> 1, _x = 0, _y = _b, _aa2 = (_a * _a) << 1, _aa4 = _aa2 << 1, _bb2 = (_b * _b) << 1, _bb4 = _bb2 << 1, _st = (_aa2 >> 1) * (1 - (_b << 1)) + _bb2, _tt = (_bb2 >> 1) - _aa2 * ((_b << 1) - 1), pxl = new Array(), pxt = new Array(), _pxb = new Array();
		pxl[0] = 0;
		pxt[0] = b;
		_pxb[0] = _b - 1;
		while (y > 0) 
		{
			if (st < 0) 
			{
				pxl[pxl.length] = x;
				pxt[pxt.length] = y;
				st += bb2 * ((x << 1) + 3);
				tt += bb4 * (++x);
			}
			else if (tt < 0) 
			{
				pxl[pxl.length] = x;
				st += bb2 * ((x << 1) + 3) - aa4 * (y - 1);
				tt += bb4 * (++x) - aa2 * (((y--) << 1) - 3);
				pxt[pxt.length] = y;
			}
			else 
			{
				tt -= aa2 * ((y << 1) - 3);
				st -= aa4 * (--y);
			}
			if (_y > 0) 
			{
				if (_st < 0) 
				{
					_st += _bb2 * ((_x << 1) + 3);
					_tt += _bb4 * (++_x);
					_pxb[_pxb.length] = _y - 1;
				}
				else if (_tt < 0) 
				{
					_st += _bb2 * ((_x << 1) + 3) - _aa4 * (_y - 1);
					_tt += _bb4 * (++_x) - _aa2 * (((_y--) << 1) - 3);
					_pxb[_pxb.length] = _y - 1;
				}
				else 
				{
					_tt -= _aa2 * ((_y << 1) - 3);
					_st -= _aa4 * (--_y);
					_pxb[_pxb.length - 1]--;
				}
			}
		}
		var ox = -wod, oy = b, _oy = _pxb[0], l = pxl.length, w, h;
		for (var i = 0; i < l; i++) 
		{
			if (typeof _pxb[i] != "undefined") 
			{
				if (_pxb[i] < _oy || pxt[i] < oy) 
				{
					x = pxl[i];
					this._mkOvQds(cx, cy, x, oy, x - ox, oy - _oy, wod, hod);
					ox = x;
					oy = pxt[i];
					_oy = _pxb[i];
				}
			}
			else 
			{
				x = pxl[i];
				this._mkDiv(cx - x, cy - oy, 1, (oy << 1) + hod);
				this._mkDiv(cx + ox + wod, cy - oy, 1, (oy << 1) + hod);
				ox = x;
				oy = pxt[i];
			}
		}
		this._mkDiv(cx - a, cy - oy, 1, (oy << 1) + hod);
		this._mkDiv(cx + ox + wod, cy - oy, 1, (oy << 1) + hod);
	}
}

function _mkOvDott(left, top, width, height)
{
	var a = (++width) >> 1, b = (++height) >> 1, wod = width & 1, hod = height & 1, hodu = hod ^ 1, cx = left + a, cy = top + b, x = 0, y = b, aa2 = (a * a) << 1, aa4 = aa2 << 1, bb2 = (b * b) << 1, bb4 = bb2 << 1, st = (aa2 >> 1) * (1 - (b << 1)) + bb2, tt = (bb2 >> 1) - aa2 * ((b << 1) - 1), drw = true;
	while (y > 0) 
	{
		if (st < 0) 
		{
			st += bb2 * ((x << 1) + 3);
			tt += bb4 * (++x);
		}
		else if (tt < 0) 
		{
			st += bb2 * ((x << 1) + 3) - aa4 * (y - 1);
			tt += bb4 * (++x) - aa2 * (((y--) << 1) - 3);
		}
		else 
		{
			tt -= aa2 * ((y << 1) - 3);
			st -= aa4 * (--y);
		}
		if (drw && y >= hodu) 
			this._mkOvQds(cx, cy, x, y, 1, 1, wod, hod);
		drw = !drw;
	}
}

function _mkRect(x, y, w, h)
{
	var s = this.stroke;
	this._mkDiv(x, y, w, s);
	this._mkDiv(x + w, y, s, h);
	this._mkDiv(x, y + h, w + s, s);
	this._mkDiv(x, y + s, s, h - s);
}

function _mkRectDott(x, y, w, h)
{
	this.drawLine(x, y, x + w, y);
	this.drawLine(x + w, y, x + w, y + h);
	this.drawLine(x, y + h, x + w, y + h);
	this.drawLine(x, y, x, y + h);
}

function jsgFont()
{
	this.PLAIN = 'font-weight:normal;';
	this.BOLD = 'font-weight:bold;';
	this.ITALIC = 'font-style:italic;';
	this.ITALIC_BOLD = this.ITALIC + this.BOLD;
	this.BOLD_ITALIC = this.ITALIC_BOLD;
}

var Font = new jsgFont();
function jsgStroke()
{
	this.DOTTED = -1;
}

var Stroke = new jsgStroke();
function jsGraphics(cnv, wnd)
{
	this.setColor = function(x)
	{
		this.color = x.toLowerCase();
	};
	this.setStroke = function(x)
	{
		this.stroke = x;
		if (!(x + 1)) 
		{
			this.drawLine = _mkLinDott;
			this._mkOv = _mkOvDott;
			this.drawRect = _mkRectDott;
		}
		else if (x - 1 > 0) 
		{
			this.drawLine = _mkLin2D;
			this._mkOv = _mkOv2D;
			this.drawRect = _mkRect;
		}
		else 
		{
			this.drawLine = _mkLin;
			this._mkOv = _mkOv;
			this.drawRect = _mkRect;
		}
	};
	this.setPrintable = function(arg)
	{
		this.printable = arg;
		if (jg_fast) 
		{
			this._mkDiv = _mkDivIe;
			this._htmRpc = arg ? _htmPrtRpc : _htmRpc;
		}
		else 
			this._mkDiv = arg ? _mkDivPrt : _mkDiv;
	};
	this.setFont = function(fam, sz, sty)
	{
		this.ftFam = fam;
		this.ftSz = sz;
		this.ftSty = sty || Font.PLAIN;
	};
	this.drawPolyline = this.drawPolyLine = function(x, y)
	{
		for (var i = x.length - 1; i;) 
		{
			--i;
			this.drawLine(x[i], y[i], x[i + 1], y[i + 1]);
		}
	};
	this.fillRect = function(x, y, w, h)
	{
		this._mkDiv(x, y, w, h);
	};
	this.drawPolygon = function(x, y)
	{
		this.drawPolyline(x, y);
		this.drawLine(x[x.length - 1], y[x.length - 1], x[0], y[0]);
	};
	this.drawEllipse = this.drawOval = function(x, y, w, h)
	{
		this._mkOv(x, y, w, h);
	};
	this.fillEllipse = this.fillOval = function(left, top, w, h)
	{
		var a = w >> 1, b = h >> 1, wod = w & 1, hod = h & 1, cx = left + a, cy = top + b, x = 0, y = b, oy = b, aa2 = (a * a) << 1, aa4 = aa2 << 1, bb2 = (b * b) << 1, bb4 = bb2 << 1, st = (aa2 >> 1) * (1 - (b << 1)) + bb2, tt = (bb2 >> 1) - aa2 * ((b << 1) - 1), xl, dw, dh;
		if (w) 
			while (y > 0) 
			{
				if (st < 0) 
				{
					st += bb2 * ((x << 1) + 3);
					tt += bb4 * (++x);
				}
				else if (tt < 0) 
				{
					st += bb2 * ((x << 1) + 3) - aa4 * (y - 1);
					xl = cx - x;
					dw = (x << 1) + wod;
					tt += bb4 * (++x) - aa2 * (((y--) << 1) - 3);
					dh = oy - y;
					this._mkDiv(xl, cy - oy, dw, dh);
					this._mkDiv(xl, cy + y + hod, dw, dh);
					oy = y;
				}
				else 
				{
					tt -= aa2 * ((y << 1) - 3);
					st -= aa4 * (--y);
				}
			}
		this._mkDiv(cx - a, cy - oy, w, (oy << 1) + hod);
	};
	this.fillArc = function(iL, iT, iW, iH, fAngA, fAngZ)
	{
		var a = iW >> 1, b = iH >> 1, iOdds = (iW & 1) | ((iH & 1) << 16), cx = iL + a, cy = iT + b, x = 0, y = b, ox = x, oy = y, aa2 = (a * a) << 1, aa4 = aa2 << 1, bb2 = (b * b) << 1, bb4 = bb2 << 1, st = (aa2 >> 1) * (1 - (b << 1)) + bb2, tt = (bb2 >> 1) - aa2 * ((b << 1) - 1), // Vars for radial boundary lines
 xEndA, yEndA, xEndZ, yEndZ, iSects = (1 << (Math.floor((fAngA %= 360.0) / 180.0) << 3)) |
		(2 << (Math.floor((fAngZ %= 360.0) / 180.0) << 3)) |
		((fAngA >= fAngZ) << 16), aBndA = new Array(b + 1), aBndZ = new Array(b + 1);
		// Set up radial boundary lines
		fAngA *= Math.PI / 180.0;
		fAngZ *= Math.PI / 180.0;
		xEndA = cx + Math.round(a * Math.cos(fAngA));
		yEndA = cy + Math.round(-b * Math.sin(fAngA));
		_mkLinVirt(aBndA, cx, cy, xEndA, yEndA);
		xEndZ = cx + Math.round(a * Math.cos(fAngZ));
		yEndZ = cy + Math.round(-b * Math.sin(fAngZ));
		_mkLinVirt(aBndZ, cx, cy, xEndZ, yEndZ);
		while (y > 0) 
		{
			if (st < 0) // Advance x

			{
				st += bb2 * ((x << 1) + 3);
				tt += bb4 * (++x);
			}
			else if (tt < 0) // Advance x and y

			{
				st += bb2 * ((x << 1) + 3) - aa4 * (y - 1);
				ox = x;
				tt += bb4 * (++x) - aa2 * (((y--) << 1) - 3);
				this._mkArcDiv(ox, y, oy, cx, cy, iOdds, aBndA, aBndZ, iSects);
				oy = y;
			}
			else // Advance y
 
			{
				tt -= aa2 * ((y << 1) - 3);
				st -= aa4 * (--y);
				if (y && (aBndA[y] != aBndA[y - 1] || aBndZ[y] != aBndZ[y - 1])) 
				{
					this._mkArcDiv(x, y, oy, cx, cy, iOdds, aBndA, aBndZ, iSects);
					ox = x;
					oy = y;
				}
			}
		}
		this._mkArcDiv(x, 0, oy, cx, cy, iOdds, aBndA, aBndZ, iSects);
		if (iOdds >> 16) // Odd height

		{
			if (iSects >> 16) // Start-angle > end-angle

			{
				var xl = (yEndA <= cy || yEndZ > cy) ? (cx - x) : cx;
				this._mkDiv(xl, cy, x + cx - xl + (iOdds & 0xffff), 1);
			}
			else if ((iSects & 0x01) && yEndZ > cy) 
				this._mkDiv(cx - x, cy, x, 1);
		}
	};
	/* fillPolygon method, implemented by Matthieu Haller.
	 This javascript function is an adaptation of the gdImageFilledPolygon for Walter Zorn lib.
	 C source of GD 1.8.4 found at http://www.boutell.com/gd/
	 THANKS to Kirsten Schulz for the polygon fixes!
	 The intersection finding technique of this code could be improved
	 by remembering the previous intertersection, and by using the slope.
	 That could help to adjust intersections to produce a nice
	 interior_extrema. */
	this.fillPolygon = function(array_x, array_y)
	{
		var i;
		var y;
		var miny, maxy;
		var x1, y1;
		var x2, y2;
		var ind1, ind2;
		var ints;
		var n = array_x.length;
		if (!n) 
			
			return;
		miny = array_y[0];
		maxy = array_y[0];
		for (i = 1; i < n; i++) 
		{
			if (array_y[i] < miny) 
				miny = array_y[i];
			if (array_y[i] > maxy) 
				maxy = array_y[i];
		}
		for (y = miny; y <= maxy; y++) 
		{
			var polyInts = new Array();
			ints = 0;
			for (i = 0; i < n; i++) 
			{
				if (!i) 
				{
					ind1 = n - 1;
					ind2 = 0;
				}
				else 
				{
					ind1 = i - 1;
					ind2 = i;
				}
				y1 = array_y[ind1];
				y2 = array_y[ind2];
				if (y1 < y2) 
				{
					x1 = array_x[ind1];
					x2 = array_x[ind2];
				}
				else if (y1 > y2) 
				{
					y2 = array_y[ind1];
					y1 = array_y[ind2];
					x2 = array_x[ind1];
					x1 = array_x[ind2];
				}
				else 
					continue;
				//  Modified 11. 2. 2004 Walter Zorn
				if ((y >= y1) && (y < y2)) 
					polyInts[ints++] = Math.round((y - y1) * (x2 - x1) / (y2 - y1) + x1);
				else if ((y == maxy) && (y > y1) && (y <= y2)) 
					polyInts[ints++] = Math.round((y - y1) * (x2 - x1) / (y2 - y1) + x1);
			}
			polyInts.sort(_CompInt);
			for (i = 0; i < ints; i += 2) 
				this._mkDiv(polyInts[i], y, polyInts[i + 1] - polyInts[i] + 1, 1);
		}
	};
	this.drawString = function(txt, x, y)
	{
		this.htm += '<div style="position:absolute;white-space:nowrap;' +
		'left:' +
		x +
		'px;' +
		'top:' +
		y +
		'px;' +
		'font-family:' +
		this.ftFam +
		';' +
		'font-size:' +
		this.ftSz +
		';' +
		'color:' +
		this.color +
		';' +
		this.ftSty +
		'">' +
		txt +
		'<\/div>';
	};
	/* drawStringRect() added by Rick Blommers.
	 Allows to specify the size of the text rectangle and to align the
	 text both horizontally (e.g. right) and vertically within that rectangle */
	this.drawStringRect = function(txt, x, y, width, halign)
	{
		this.htm += '<div style="position:absolute;overflow:hidden;' +
		'left:' +
		x +
		'px;' +
		'top:' +
		y +
		'px;' +
		'width:' +
		width +
		'px;' +
		'text-align:' +
		halign +
		';' +
		'font-family:' +
		this.ftFam +
		';' +
		'font-size:' +
		this.ftSz +
		';' +
		'color:' +
		this.color +
		';' +
		this.ftSty +
		'">' +
		txt +
		'<\/div>';
	};
	this.drawImage = function(imgSrc, x, y, w, h, a)
	{
		this.htm += '<div style="position:absolute;' +
		'left:' +
		x +
		'px;' +
		'top:' +
		y +
		'px;' +
		// w (width) and h (height) arguments are now optional.
		// Added by Mahmut Keygubatli, 14.1.2008
		(w ? ('width:' + w + 'px;') : '') +
		(h ? ('height:' + h + 'px;') : '') +
		'">' +
		'<img src="' +
		imgSrc +
		'"' +
		(w ? (' width="' + w + '"') : '') +
		(h ? (' height="' + h + '"') : '') +
		(a ? (' ' + a) : '') +
		'>' +
		'<\/div>';
	};
	this.clear = function()
	{
		this.htm = "";
		if (this.cnv) 
			this.cnv.innerHTML = "";
	};
	this._mkOvQds = function(cx, cy, x, y, w, h, wod, hod)
	{
		var xl = cx - x, xr = cx + x + wod - w, yt = cy - y, yb = cy + y + hod - h;
		if (xr > xl + w) 
		{
			this._mkDiv(xr, yt, w, h);
			this._mkDiv(xr, yb, w, h);
		}
		else 
			w = xr - xl + w;
		this._mkDiv(xl, yt, w, h);
		this._mkDiv(xl, yb, w, h);
	};
	this._mkArcDiv = function(x, y, oy, cx, cy, iOdds, aBndA, aBndZ, iSects)
	{
		var xrDef = cx + x + (iOdds & 0xffff), y2, h = oy - y, xl, xr, w;
		if (!h) 
			h = 1;
		x = cx - x;
		if (iSects & 0xff0000) // Start-angle > end-angle

		{
			y2 = cy - y - h;
			if (iSects & 0x00ff) 
			{
				if (iSects & 0x02) 
				{
					xl = Math.max(x, aBndZ[y]);
					w = xrDef - xl;
					if (w > 0) 
						this._mkDiv(xl, y2, w, h);
				}
				if (iSects & 0x01) 
				{
					xr = Math.min(xrDef, aBndA[y]);
					w = xr - x;
					if (w > 0) 
						this._mkDiv(x, y2, w, h);
				}
			}
			else 
				this._mkDiv(x, y2, xrDef - x, h);
			y2 = cy + y + (iOdds >> 16);
			if (iSects & 0xff00) 
			{
				if (iSects & 0x0100) 
				{
					xl = Math.max(x, aBndA[y]);
					w = xrDef - xl;
					if (w > 0) 
						this._mkDiv(xl, y2, w, h);
				}
				if (iSects & 0x0200) 
				{
					xr = Math.min(xrDef, aBndZ[y]);
					w = xr - x;
					if (w > 0) 
						this._mkDiv(x, y2, w, h);
				}
			}
			else 
				this._mkDiv(x, y2, xrDef - x, h);
		}
		else 
		{
			if (iSects & 0x00ff) 
			{
				if (iSects & 0x02) 
					xl = Math.max(x, aBndZ[y]);
				else 
					xl = x;
				if (iSects & 0x01) 
					xr = Math.min(xrDef, aBndA[y]);
				else 
					xr = xrDef;
				y2 = cy - y - h;
				w = xr - xl;
				if (w > 0) 
					this._mkDiv(xl, y2, w, h);
			}
			if (iSects & 0xff00) 
			{
				if (iSects & 0x0100) 
					xl = Math.max(x, aBndA[y]);
				else 
					xl = x;
				if (iSects & 0x0200) 
					xr = Math.min(xrDef, aBndZ[y]);
				else 
					xr = xrDef;
				y2 = cy + y + (iOdds >> 16);
				w = xr - xl;
				if (w > 0) 
					this._mkDiv(xl, y2, w, h);
			}
		}
	};
	this.setStroke(1);
	this.setFont("verdana,geneva,helvetica,sans-serif", "12px", Font.PLAIN);
	this.color = "#000000";
	this.htm = "";
	this.wnd = wnd || window;
	if (!jg_ok) 
		_chkDHTM(this.wnd);
	if (jg_ok) 
	{
		if (cnv) 
		{
			if (typeof(cnv) == "string") 
				this.cont = document.all ? (this.wnd.document.all[cnv] || null) : document.getElementById ? (this.wnd.document.getElementById(cnv) || null) : null;
			else if (cnv == window.document) 
				this.cont = document.getElementsByTagName("body")[0];
			// If cnv is a direct reference to a canvas DOM node
			// (option suggested by Andreas Luleich)
			else 
				this.cont = cnv;
			// Create new canvas inside container DIV. Thus the drawing and clearing
			// methods won't interfere with the container's inner html.
			// Solution suggested by Vladimir.
			this.cnv = this.wnd.document.createElement("div");
			this.cnv.style.fontSize = 0;
			this.cont.appendChild(this.cnv);
			this.paint = jg_dom ? _pntCnvDom : _pntCnvIe;
		}
		else 
			this.paint = _pntDoc;
	}
	else 
		this.paint = _pntN;
	this.setPrintable(false);
}

function _mkLinVirt(aLin, x1, y1, x2, y2)
{
	var dx = Math.abs(x2 - x1), dy = Math.abs(y2 - y1), x = x1, y = y1, xIncr = (x1 > x2) ? -1 : 1, yIncr = (y1 > y2) ? -1 : 1, p, i = 0;
	if (dx >= dy) 
	{
		var pr = dy << 1, pru = pr - (dx << 1);
		p = pr - dx;
		while (dx > 0) 
		{
			--dx;
			if (p > 0) //  Increment y

			{
				aLin[i++] = x;
				y += yIncr;
				p += pru;
			}
			else 
				p += pr;
			x += xIncr;
		}
	}
	else 
	{
		var pr = dx << 1, pru = pr - (dy << 1);
		p = pr - dy;
		while (dy > 0) 
		{
			--dy;
			y += yIncr;
			aLin[i++] = x;
			if (p > 0) //  Increment x

			{
				x += xIncr;
				p += pru;
			}
			else 
				p += pr;
		}
	}
	for (var len = aLin.length, i = len - i; i;) 
		aLin[len - (i--)] = x;
};
function _CompInt(x, y)
{
	
	return (x - y);
}
