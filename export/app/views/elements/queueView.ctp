				<table width="984px" id="algo-table" border="2" cellpadding="5">
					<tr height="5%" class="algo-table-top">
				<!-- Begin Contols -->				
						<td colspan="6" class="main-controls">
							<div style="float: left;" align="left" id="control-button-box">
								<button onclick="push()">PushBack</button>
								<button onclick="pop()">PopFront</button>
								<!--Doesn't completely reset at the moment
								<button onclick="reset()">Reset</button>-->
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
							<pre>
function Queue() 
    this.data = [];
    this.length = 0;

    <div id="pushhigh">this.enqueue = function(obj) 
        this.data.push(obj);
        this.length = this.data.length;</div>
		
		
	<div id="pophigh">this.dequeue = function()
        var ret = this.data[0];
        this.data.splice(0,1);
        this.length = this.data.length;
        return ret;</div>
</pre>
						</td>
				<!-- End Psuedo -->

				<!-- Begin View -->
						<td colspan="5" valign="top">
							<div id="workarea" class="workarea">
								<div id="0" class="image" style="visibility: hidden; opacity : 0; position:absolute;">
									<img src="/algo/images/algorithm/queue/Box.gif" id = "0" >
									<div class="text">0</div>
								</div>
								<div id="1" class="image" style="visibility: hidden; opacity : 0; position:absolute;">
									<img src="/algo/images/algorithm/queue/Box.gif" id = "1" >
									<div class="text">1</div>
								</div>
								<div id="2" class="image" style="visibility: hidden; opacity : 0; position:absolute;">
									<img src="/algo/images/algorithm/queue/Box.gif" id = "2" >
									<div class="text">2</div>
								</div>
								<div id="3" class="image" style="visibility: hidden; opacity : 0; position:absolute;">
									<img src="/algo/images/algorithm/queue/Box.gif" id = "3" >
									<div class="text">3</div>
								</div>
								<div id="4" class="image" style="visibility: hidden; opacity : 0; position:absolute;">
									<img src="/algo/images/algorithm/queue/Box.gif" id = "4" >
									<div class="text">4</div>
								</div>
								<div id="5" class="image" style="visibility: hidden; opacity : 0; position:absolute;">
									<img src="/algo/images/algorithm/queue/Box.gif" id = "5" >
									<div class="text">5</div>
								</div>
							</div>
						</td>
				<!-- End View -->
					</tr>
				
				<!-- Begin Settings 
					<tr height="20%" id="algo-table-bottom"></tr>
				 End Settings -->
				</table>      