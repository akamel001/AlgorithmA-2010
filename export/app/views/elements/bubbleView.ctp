				<table width="984px" id="algo-table" border="2" cellpadding="5">
					<tr height="5%" class="algo-table-top">
				<!-- Begin Contols -->				
						<td colspan="6" class="main-controls">
							<div style="float: left;" align="left" id="control-button-box">				
								<button onclick="startPressed()">Start</button>
								<button onclick="forwardPressed()">Forward</button>
								<button onclick="backPressed()">Back</button>
								<button onclick="resetPressed()">Reset</button>
							</div>

							<div style="float: right;" align="right" id="info-button-box">
								<button id="concept" onMouseOut="UnTip();">Concept</button>
								<button id="howto" onMouseOut="UnTip();">How-to</button>
							</div>
						</td>
				<!-- End Controls -->
					</tr>

					<tr height="90%" class="algo-table-middle">
				<!-- Begin Psuedo -->
						<td width="25%" class="psuedocode" id="psuedocode">
						<pre>function bubbleSort( T[1..n] )
{
 while array not sorted
     for i := 0 to array.length 
         if array[i] > array[i+1]
		 
<div id = "psuedo1">             temp := A[i+1] </div>
<div id = "psuedo2">             A[i+1] := A[i]</div>
<div id = "psuedo3">             A[i] := temp</div>
    
	
}</pre>
						</td>
				<!-- End Psuedo -->

				<!-- Begin View -->
						<td colspan="5">
							<div id="workarea" class="workarea">							
								<div id="rowHold"></div>
								<img id="box1" src="/algo/images/algorithm/bubblesort/Bubble0.gif" width="100" height="100" style="visibility: hidden;" />
								<img id="box2" src="/algo/images/algorithm/bubblesort/Bubble1.gif" width="100" height="100" style="visibility: hidden;" />
								<img id="box3" src="/algo/images/algorithm/bubblesort/Bubble2.gif" width="100" height="100" style="visibility: hidden;" />
								<img id="box4" src="/algo/images/algorithm/bubblesort/Bubble3.gif" width="100" height="100" style="visibility: hidden;" />
								<img id="box5" src="/algo/images/algorithm/bubblesort/Bubble4.gif" width="100" height="100" style="visibility: hidden;" />
							</div>
						</td>
				<!-- End View -->
					</tr>
				
				<!-- Begin Settings 
					<tr height="20%" id="algo-table-bottom"></tr>
				 End Settings -->
				</table>      