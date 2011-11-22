				<table width="984px" id="algo-table" border="2" cellpadding="5">
					<tr height="5%" class="algo-table-top">
				<!-- Begin Contols -->				
						<td colspan="6" class="main-controls">
							<div style="float: left;" align="left" id="control-button-box">
								<button onclick="playAnimation()">Start</button>
								<button onclick="step()">Forward</button>
								<button onclick="back()">Back</button>
								<button onclick="reset()">Reset</button>
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
						<td width="25%" class="psuedocode" id="psuedocode-column">	
<pre> Set A[n + 1] to x. 
 Set i to 1.
 Repeat this loop:
 <div id="compare">  If A[i] = x, then exit the loop.</div>
 <div id="incr">	Set i to i + 1.</div>
 <div id="decr">	or if in reverese Set i to i - 1</div>
<div id="found">Return i.</div>
<div id="notfound">Return Not Found.</div>
						
</pre>
						</td>
				<!-- End Psuedo -->

				<!-- Begin View -->
						<td colspan="5" align="center">
							<div class="workarea" id="workarea">
								<div class="image">
									<img id = "0" src="/algo/images/algorithm/sequential/circle.gif">
									<div class="text">0</div>
								</div>
								<div class="image">
									<img id = "1" src="/algo/images/algorithm/sequential/circle.gif">
									<div class="text">1</div>
								</div>
								<div class="image">
									<img id = "2" src="/algo/images/algorithm/sequential/circle.gif">
									<div class="text">2</div>
								</div>
								<div class="image">
									<img id = "3" src="/algo/images/algorithm/sequential/circle.gif">
									<div class="text">3</div>
								</div>
								<div class="image">
									<img id = "4" src="/algo/images/algorithm/sequential/circle.gif">
									<div class="text">4</div>
								</div>
								<div class="image">
									<img id = "5" src="/algo/images/algorithm/sequential/circle.gif">
									<div class="text">5</div>
								</div>
								<div class="image">
									<img id = "6" src="/algo/images/algorithm/sequential/circle.gif">
									<div class="text">6</div>
								</div>
							</div>
						</td>
				<!-- End View -->
					</tr>
				
				<!-- Begin Settings -->
					<tr height="20%" id="algo-table-bottom">
						<td colspan="6" align="center">
							<input type="text" size="3" maxlength="3" name="input1" />
							<button onclick="setTarget()">Set Target Node</button>
						</td>
					</tr>
				<!-- End Settings -->
				</table>