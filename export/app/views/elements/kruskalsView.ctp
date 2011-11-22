<!-- Begin Template Table -->
				<table width="984px" id="algo-table" border="2" cellpadding="5">
					<tr height="5%" class="algo-table-top">
				<!-- Begin Contols -->				
						<td colspan="6" class="main-controls">
							<div style="float: left;" align="left" id="control-button-box">
								<!-- Insert Buttons here (use <button>s only!) -->
								<button id="demo" onclick="this.disabled=true; InitializeTimer(); StartTheTimer()">Demo</button>
								<button id="forward" onclick="Forward()">Forward</button>
								<button id="back" disabled="true" onclick="Back()">Back</button>
								<button id="custom" disabled="true" onclick="">Custom</button>
								<button id="reset"onclick="window.location.reload(); Initialize()">Reset</button>
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
						<div id='psuedoCode1'><strong>function</strong> Kruskal(array of edges) </div>
						<div id='psuedoCode2'>Define a cluster C(v)={v}.</div>
						<div id='psuedoCode3'>Comparison sort all edges, using the weights as keys.</div>
     						<div id='psuedoCode4'>Define a forest T</div><br>
						<div id='psuedoCode5'><strong>while</strong> T has fewer than n edges <strong>do</strong></div>
						<div id='psuedoCode6'>&nbsp&nbsp&nbsp&nbsp Let C(u) be the cluster containing one node of <br>
								      &nbsp&nbsp&nbsp&nbsp an edge</div>
						<div id='psuedoCode7'>&nbsp&nbsp&nbsp&nbsp Let C(v) be the cluster containing the other <br>
								      &nbsp&nbsp&nbsp&nbsp node of an edge</div><br>
						<div id='psuedoCode8'>&nbsp&nbsp&nbsp&nbsp <strong>if</strong> C(v) != C(u) <strong>then</strong></div>
						<div id='psuedoCode9'>&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp Add edge (v,u) to T</div>
						<div id='psuedoCode10'>&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp Merge C(v) and C(u) into one cluster, that <br>
								       &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp is, union C(v) and C(u).</div><br>
						<div id='psuedoCode11'><strong>return</strong> tree T</div>
				<!-- End Psuedo -->

				<!-- Begin View -->
						<td colspan="5">
							<div class="workarea" id="workarea">
								<!-- Enter your objects here!! -->
								<div class="node" id="A">A</div>
								<div class="node" id="B">B</div>
								<div class="node" id="C">C</div>
								<div class="node" id="D">D</div>
								<div class="node" id="E">E</div>
								<div class="node" id="F">F</div>
								
								<div class="edge" id="AB"></div>
								<div class="edge" id="AD"></div>
								<div class="edge" id="BC"></div>
								<div class="edge" id="BE"></div>
								<div class="edge" id="CF"></div>
								<div class="edge" id="DE"></div>
								<div class="edge" id="EF"></div>
							</div>
						</td>
				<!-- End View -->
					</tr>
				
				<!-- Begin Settings -->
					<tr height="5%" id="algo-table-bottom">
						<td colspan="6" align="center" class="main-controls">
							Enter weight for edges (1-99)<br>
							AB<input id="ABin" type="text" size="1" onblur="ChangeNumber('AB')" value="7"/>&nbsp
							AD<input id="ADin" type="text" size="1" onblur="ChangeNumber('AD')" value="5"/>&nbsp
							BC<input id="BCin" type="text" size="1" onblur="ChangeNumber('BC')" value="8"/>&nbsp
							BE<input id="BEin" type="text" size="1" onblur="ChangeNumber('BE')" value="7"/>&nbsp
							CF<input id="CFin" type="text" size="1" onblur="ChangeNumber('CF')" value="5"/>&nbsp
							DE<input id="DEin" type="text" size="1" onblur="ChangeNumber('DE')" value="15"/>&nbsp
							EF<input id="EFin" type="text" size="1" onblur="ChangeNumber('EF')" value="8"/>&nbsp	
						</td>
					</tr>
				<!-- End Settings -->
				</table>
		<!-- End Template Table -->