				<table width="984px" id="algo-table" border="2" cellpadding="5">
					<tr height="5%" class="algo-table-top">
				<!-- Begin Contols -->				
						<td colspan="6" class="main-controls">
							<div style="float: left;" align="left" id="control-button-box">
								<button onclick="push(currentLinkNumber)">Push</button>
								<button onclick="pushStep()">Forward</button>
								<button onclick="pop(currentLinkNumber)">Pop</button>
								<button onclick="popStep()">Back</button>
								<button onclick="javascript:location.reload(true)">Reset</button>
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
							<pre>class LinkedList
	firstNode <- null
	lastNode <- null
	
function push(value)
  {
	
<div id = "pseudo1">    new node(value)</div>
<div id = "pseudo2">    lastNode.nextNode <- new node</div>
  }
function pop()
  {
	
<div id = "pseudo3">    nodeBeforeLast.nextNode <- null</div>
<div id = "pseudo4">    delete lastNode</div>
  }</pre>	
						</td>
				<!-- End Psuedo -->

				<!-- Begin View -->
						<td colspan="5" valign="top">
							<div id="workarea" class="workarea">
								<div id="rowHold"></div>

								<img id="nullPointer1" style="visibility: hidden;" src="/algo/images/algorithm/linkedlist/NullLinkImg.gif" width="100" height = "100" />
								<img id="nextPointer1" style="visibility: hidden;" src="/algo/images/algorithm/linkedlist/NextLinkImg.gif" width="100" height = "100" />
								
								
								<img id="nullPointer2" style="visibility: hidden;" src="/algo/images/algorithm/linkedlist/NullLinkImg.gif" width="100" height = "100" />
								<img id="nextPointer2" style="visibility: hidden;" src="/algo/images/algorithm/linkedlist/NextLinkImg.gif" width="100" height = "100" />
								
								
								<img id="nullPointer3" style="visibility: hidden;" src="/algo/images/algorithm/linkedlist/NullLinkImg.gif" width="100" height = "100" />
								<img id="nextPointer3" style="visibility: hidden;" src="/algo/images/algorithm/linkedlist/NextLinkImg.gif" width="100" height = "100" />
								
								
								<img id="nullPointer4" style="visibility: hidden;" src="/algo/images/algorithm/linkedlist/NullLinkImg.gif" width="100" height = "100" />
								<img id="nextPointer4" style="visibility: hidden;" src="/algo/images/algorithm/linkedlist/NextLinkImg.gif" width="100" height = "100" />
								
								
								<img id="nullPointer5" style="visibility: hidden;" src="/algo/images/algorithm/linkedlist/NullLinkImg.gif" width="100" height = "100" />
								<img id="nextPointer5" style="visibility: hidden;" src="/algo/images/algorithm/linkedlist/NextLinkImg.gif" width="100" height = "100" />
							</div>
						</td>
				<!-- End View -->
					</tr>
				
				<!-- Begin Settings 
					<tr height="20%" id="algo-table-bottom"></tr>
				 End Settings -->
				</table>      