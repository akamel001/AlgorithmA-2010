	<!-- Begin Template Table -->
				<table width="984px" id="algo-table" border="2" cellpadding="5">
					<tr height="5%" class="algo-table-top">
				<!-- Begin Contols -->				
						<td colspan="6" class="main-controls">
							<div style="float: left;" align="left" id="control-button-box">
								<!-- Insert Buttons here (use <button>s only!) -->
								<button id="Insert" onClick="Insert()">Insert</button>
								<button id="Find" onClick="Find()">Find</button>
                                <button id="Reset" onClick="Reset()">Reset</button>
								
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
						<td width="28%" class="psuedocode" id="psuedocode">				
							<!-- Enter Psudo Here -->
                            <div id = "pseduo">
<pre>
INSERT(int x)
   <div id="pseudo0">if(x not in tree)</div><div id="pseudo1">	searchInsert(root,x)</div>
SearchInsert(node,x)<div id="pseudo2">if(numLinks == 3)</div><div id="split">	node = split(node)</div><div id="pseudo3">if(there are no links)	node.add(x)
   else
      	search(node.linkWhereXWouldGo)</div>
        
        
Find()<div id="find1">	Binary_Search(value)</div>
</pre>
						</div>
						</td>
				<!-- End Psuedo -->

				<!-- Begin View -->
						<td colspan="5">
							<div class="workarea" id="workarea">
							</div>
						</td>
				<!-- End View -->
					</tr>
				
				<!-- Begin Settings --> 
					<tr height="20%" id="algo-table-bottom">
						<td colspan="2" width="100%" align="center">
						       <input id="input" type="text">Input
						</td>
					</tr>
				<!-- End Settings -->
				</table>
		<!-- End Template Table -->