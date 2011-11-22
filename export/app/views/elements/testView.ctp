		<!-- Begin Template Table FLY DAMMIT -->
				<table width="984px" id="algo-table" border="2" cellpadding="5">
					<tr height="5%" class="algo-table-top">
				<!-- Begin Contols -->				
						<td colspan="6" class="main-controls">
							<div style="float: left;" align="left" id="control-button-box">
								<!-- Insert Buttons here (use <button>s only!) -->
								<button id="playpause" onclick="PlayPause('playpause')">Pause!</button>
								<button id="start" onclick="NormalAnimation()">Normal</button>
								<button id="reset" onclick="SequenceAnimation()">Sequenced</button>
								<button id="lineAnim" onclick="LineAnimation()">Draw Line</button>
								<button id="eraseLine" onclick="EraseALine()">Erase Line</button>
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
							<!-- Enter Psudo Here -->
							Psuedo Code.
						</td>
				<!-- End Psuedo -->

				<!-- Begin View -->
						<td colspan="5">
							<div class="workarea" id="workarea">
								<!-- Enter your objects here!! -->
								<div id="box1" class="plain-box-style"></div>
								<div id="box2" class="plain-box-style"></div>
								<div id="box3" class="plain-box-style"></div>
							</div>
						</td>
				<!-- End View -->
					</tr>
				
				<!-- Begin Settings --> 
					<tr height="20%" id="algo-table-bottom">
						<td colspan="2" width="50%" align="center">
							X <input id="toPosX" size="1" maxlength="3" type="text" value="500" onchange="updatePosition();">
							Y <input id="toPosY" size="1" maxlength="3" type="text" value="200" onchange="updatePosition();">
							Radius <input id="toRadius" size="1" maxlength="2" type="text" value="10" onchange="updatePosition();">
						</td>
						<td colspan="1" width="50%" align="center">
							Red <input id="toRed" size="1" maxlength="3" type="text" value="0" onchange="updateColor();">
							Green <input id="toGreen" size="1" maxlength="3" type="text" value="0" onchange="updateColor();">
							Blue <input id="toBlue" size="1" maxlength="3" type="text" value="0" onchange="updateColor();">
						</td>
					</tr>
				<!-- End Settings -->
				</table>
		<!-- End Template Table -->