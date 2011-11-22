				<!-- Begin Template Table -->
				<table width="984px" id="algo-table" border="2" cellpadding="5">
					<tr height="5%" class="algo-table-top">
				<!-- Begin Contols -->				
						<td colspan="6" class="main-controls">
							<div style="float: left;" align="left" id="control-button-box">
								<!-- Insert Buttons here (use <button>s only!) -->
								<button id="play" onclick="Play()">Play</button>
								<button id="forward" onclick="Forward()">Forward</button>
								<button id="back" disabled="true" onclick="Backward()">Back</button>
								<!--<button id="custom" onclick="ActivateCustom()">Custom</button>-->
								<button id="reset" onclick="javascript:location.reload(true)">Reset</button>
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
						<td width="35% class="psuedocode" id="psuedocode">				
							<!-- Enter Psudo Here -->
							<b>function</b> Prims ( G )<br />
							{G is a weighted connected graph with vertices V and edges E}<br />
							<div id = "pseudo1">
							<b>array</b> V<sub>new</sub>[]<br />
							<b>array</b> E<sub>new</sub>[]<br />
							x = random node from V<br />
							V<sub>new</sub>.push( x )<br />
							</div>
							<b>repeat</b><br />
								<ul>
								<ul>
								<div id = "pseudo2"><b>array</b> Connected = edges connected to, but not in V<sub>new</sub><br /></div>
								<div id = "pseudo3">edge = findMinimumWeightOf( Connected )<br />
								{edge is a set of vertices [u,v] such that u is in V<sub>new</sub> and v is not}<br /></div>
								<div id = "pseudo4">E<sub>new</sub>.push( edge )<br />
								V<sub>new</sub>.push( v )<br /></div>
								</ul>
								</ul>
							<b>until</b> V<sub>new</sub> = V<br />
							<div id = "pseudo5"><b>return</b> E<sub>new</sub><br /></div>
						</td>
				<!-- End Psuedo -->

				<!-- Begin View -->
						<td colspan="5">
							<div class="workarea" onmousedown="PlaceNode(event)" id="workarea">
								<!-- Enter your objects here!! -->
							</div>
						</td>
				<!-- End View -->
					</tr>
				
				<!-- Begin Settings -->
					<tr height="5%" id="algo-table-bottom">
						<!--<td colspan="6" align="center" class="main-controls">							
							<button id="AddNode" disabled="true" onclick="AddNode()">Add Node</button>
							<button id="AddEdge" disabled="true" onclick="AddEdge()">Add Edge</button>
							<button id="Done" disabled="true" onclick="CustomDone()">Done</button>
							<button id="demo" onclick="PlayDemo()">Demo</button>
						</td>-->
					</tr>
				<!-- End Settings -->
				</table>
		<!-- End Template Table -->