<!-- Begin Template Table -->
				<table width="984px" id="algo-table" border="2" cellpadding="5">
					<tr height="5%" class="algo-table-top">
				<!-- Begin Contols -->				
						<td colspan="6" class="main-controls">
							<div style="float: left;" align="left" id="control-button-box">
								<!-- Insert Buttons here (use <button>s only!) -->
								<button id="stop" onClick="StopAnimation()" disabled=true >Stop</button>
								<button id="reset" onClick="ResetAnimation()" disabled=true >Reset</button>
								<button id="start" onClick="StartAnimation()" disabled=true >Start</button>
								<button id="step" onClick="StepAnimation()" disabled=true >Step</button>
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
							<!-- Dijkstra's Algorithm -->
                            <div id="psuedo">
                                <div id="" style="	background-color:#FFFFFF;font-size: 12px;text-indent: 5pt;line-height: 1.8em;">
                                <b>procedure</b> dijkstra</div>
                            	<div id="p0" class="psuedo">d[ u ] &larr; 0 <br /></div>
	                            <div id="p1" class="psuedo"><b>for each</b> v in the set V <b>do</b> <br /></div>
    	                        <div id="p2" style="text-indent:45pt;" class="psuedo">d [ v ] &larr; &infin;<br /></div>
        	                    <div id="p3" class="psuedo">S &larr; Empty<br /></div>
            	                <div id="p4" class="psuedo">Q &larr; V<br /></div>
                	            <div id="p5" class="psuedo"><b>while</b> Q is not Empty <b>do</b><br /></div>
                    	        <div id="p6" style="text-indent: 45pt;" class="psuedo">u &larr; Extract-Min( Q )<br /></div>
                        	    <div id="p7" style="text-indent: 45pt;" class="psuedo">S &larr; S union { u }<br /></div>
                            	<div id="p8" style="text-indent: 45pt;" class="psuedo"><b>for each</b> v in Adj[ u ] <b>do</b><br /></div>
	                            <div id="p9" style="text-indent: 60pt;" class="psuedo"><b>if</b>  d[ v ] > edgeWeight( u, v )<br /></div>
    	                     	<div id="p10" style="text-indent: 60pt;" class="psuedo"><b>then</b> d[ v ] &larr; d[ u ] + w( u, v ) <br /></div>
        	                </div>
						</td>
				<!-- End Psuedo -->

				<!-- Begin View -->
						<td colspan="5">
							<div class="workarea" id="workarea">
                                <!--Citties or Nodes Images are of a square with a transparent circle with a white letter A...E -->								
                                <img id="A" class="A" width="70" onClick="StartA('A')" height="70" src="/algo/images/algorithm/dijkstras/A.gif" />
                                <img id="B" class="B" width="70" onClick="StartA('B')" height="70" src="/algo/images/algorithm/dijkstras/B.gif" />
                                <img id="C" class="C" width="70" onClick="StartA('C')" height="70" src="/algo/images/algorithm/dijkstras/C.gif" />
                                <img id="D" class="D" width="70" onClick="StartA('D')" height="70" src="/algo/images/algorithm/dijkstras/D.gif" />
                                <img id="E" class="E" width="70" onClick="StartA('E')" height="70" src="/algo/images/algorithm/dijkstras/E.gif" />
                                <!-- Begining of Dijsktra Table -->
                                <div id="dijkstraTable">
									<!-- First Row in div Dijkstra Table -->
                                    <div class="row">
                                    	<div id="DT-A00" class="rowData" style="border-bottom: 1px solid black;">Q:</div> 
                                        <div id="DT-A01" class="rowData" style="border-bottom: 1px solid black;">A</div>
                                        <div id="DT-A02" class="rowData" style="border-bottom: 1px solid black;">B</div>
                                        <div id="DT-A03" class="rowData" style="border-bottom: 1px solid black;">C</div>
                                        <div id="DT-A04" class="rowData" style="border-bottom: 1px solid black;">D</div>
                                        <div id="DT-A05" class="rowData" style="border-bottom: 1px solid black;">E</div>
                                    </div>
									<!-- Second Row in div Dijkstra Table -->
                                	<div class="row">
                                    	<div id="DT-A10" class="rowData">&rarr;</div> 
                                        <div id="DT-A11" class="rowData">0</div>
                                        <div id="DT-A12" class="rowData">&infin;</div>
                                        <div id="DT-A13" class="rowData">&infin;</div>
                                        <div id="DT-A14" class="rowData">&infin;</div>
                                        <div id="DT-A15" class="rowData">&infin;</div>
                                    </div>
									<!-- Third Row in div Dijkstra Table -->
                                	<div class="row">
                                    	<div id="DT-A20" class="rowData">&rarr;</div> 
                                        <div id="DT-A21" class="rowData">0</div>
                                        <div id="DT-A22" class="rowData">5</div>
                                        <div id="DT-A23" class="rowData">6</div>
                                        <div id="DT-A24" class="rowData">&infin;</div>
                                        <div id="DT-A25" class="rowData">&infin;</div>
                                    </div>
									<!-- Fourth Row in div Dijkstra Table -->
                                	<div class="row">
                                    	<div id="DT-A30" class="rowData">&rarr;</div> 
                                        <div id="DT-A31" class="rowData">&nbsp;</div>
                                        <div id="DT-A32" class="rowData">&nbsp;</div>
                                        <div id="DT-A33" class="rowData">7</div>
                                        <div id="DT-A34" class="rowData">11</div>
                                        <div id="DT-A35" class="rowData">&infin;</div>
                                    </div>
									<!-- Fifth Row in div Dijkstra Table -->
                                	<div class="row">
                                    	<div id="DT-A40" class="rowData">&rarr;</div> 
                                        <div id="DT-A41" class="rowData">&nbsp;</div>
                                        <div id="DT-A42" class="rowData">&nbsp;</div>
                                        <div id="DT-A43" class="rowData">&nbsp;</div>
                                        <div id="DT-A44" class="rowData">15</div>
                                        <div id="DT-A45" class="rowData">10</div>
                                    </div>
									<!-- Sixed Row in div Dijkstra Table -->
                                	<div class="row">
                                    	<div id="DT-A50" class="rowData">&nbsp;</div> 
                                        <div id="DT-A51" class="rowData">&nbsp;</div>
                                        <div id="DT-A52" class="rowData">&nbsp;</div>
                                        <div id="DT-A53" class="rowData">&nbsp;</div>
                                        <div id="DT-A54" class="rowData">12</div>
                                        <div id="DT-A55" class="rowData">&nbsp;</div>
                                    </div>
                                </div>
                                <!-- Last Row displays all the shortest paths -->                                
                                <div id="shortestPathRow">
                                	<div class="row">
                                    	<div id="ST-A0" class="rowData"><i>S:</i></div> 
                                        <div id="ST-A1" class="rowData">A</div>
                                        <div id="ST-A2" class="rowData">B</div>
                                        <div id="ST-A3" class="rowData">C</div>
                                        <div id="ST-A4" class="rowData">E</div>
                                        <div id="ST-A5" class="rowData">D</div>
                                    </div>                                	
                                </div>
                                <!-- Vertecies  A ... E  -->                                
                               	<div id="nVertex0"><i>0</i></div> 
                                <div id="nVertex1">&infin;</div>
                                <div id="nVertex2">&infin;</div>
                                <div id="nVertex3">&infin;</div>
                                <div id="nVertex4">&infin;</div>
                                                                 
                                <!-- Edgeweight A to B -->                                                            
                                <div id="edge-ab" class="edgeWeightStyle">5</div>
                                <!-- Edgeweight A to C -->
                                <div id="edge-ac" class="edgeWeightStyle">6</div> 
                                <!-- Edgeweight C to E -->                                                               
                                <div id="edge-ce" class="edgeWeightStyle">3</div>
                                <!-- Edgeweight B to D -->                                
                                <div id="edge-bd" class="edgeWeightStyle">6</div> 
                                <!--Edgeweight B to C-->                                                               
                                <div id="edge-bc" class="edgeWeightStyle">2</div>
                                <!-- Edgeweight E to D -->                                
                                <div id="edge-ed" class="edgeWeightStyle">2</div>
                                <!-- Edgeweight C to D -->                                
                                <div id="edge-cd" class="edgeWeightStyle">8</div>
                        	</div>
						</td>
				<!-- End View -->
					</tr>
				</table>
		<!-- End Template Table -->