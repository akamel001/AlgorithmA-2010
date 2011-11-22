<html>
<head>
	<!-- NOTE - Remove this everything surrounding Template Table before uploading! -->

	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
	<link rel="stylesheet" type="text/css" href="css/style.css"></script>
	<link rel="stylesheet" type="text/css" href="css/algorithmLayout.css"></script>
	<link rel="stylesheet" type="text/css" href="css/testStyle.css"></script>
	<link rel="stylesheet" type="text/css" href="css/mergeStyle.css"></script>

	<script language="JavaScript" type="text/javascript" src="js/jsAnim.js"></script>
	<script language="JavaScript" type="text/javascript" src="js/pbMan.js"></script>
	<script language="JavaScript" type="text/javascript" src="js/testSrc.js"></script>
	<script language="javascript" type="text/javascript" src="js/mergeSrc.js"></script>
	
</head>
<body onLoad="Initialize()">
<script language="JavaScript" type="text/javascript" src="js/wz_tooltip.js"></script>

<!-- Begin Template Table -->
								<table width="984px" id="algo-table" border="2" cellpadding="5">
					<tr height="5%" class="algo-table-top">
				<!-- Begin Contols -->				
						<td colspan="6" class="main-controls">
							<div style="float: left;" align="left" id="control-button-box">
								<button id="start" onClick="StartAnimation()" disabled=true >Start</button>
								<button id="step" onClick="StepAnimation()" disabled=true >Step</button>
								<button id="stop" onClick="StopAnimation()" disabled=true >Stop</button>
								<button id="reset" onClick="ResetAnimation()" disabled=true >Reset</button>
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
							<!-- Merge Sort Algorithm -->                                                   
                            <div id="psuedo">
                            	<div id="p0" class="psuedo"><b>procedure</b> mergesort(array T[1 .. n])<br /></div>
	                            <div id="p1" style="text-indent: 25pt;" class="psuedo">
                                    array U[1..&lfloor;n/2&rfloor;]&larr; array T[1..&lfloor;n/2&rfloor;]<br />
                                </div>
    	                        <div id="p2" style="text-indent: 25pt;" class="psuedo">
                                    array V[1..&lfloor;n/2&rfloor;]&larr; array T[1+&lfloor;n/2&rfloor;..n]<br />
                                </div>
        	                    <div id="p3" style="text-indent: 25pt;" class="psuedo">mergesort(array U)<br /></div>
            	                <div id="p4" style="text-indent: 25pt;" class="psuedo">mergesort(array V)<br /></div>
                	            <div id="p5" style="text-indent: 25pt;" class="psuedo">merge(U,V,T)</div>
                	            <br />
                    	        <div id="p6" class="psuedo"><b>procedure</b> merge(array U,V,T)</div>
                        	    <div id="p7" style="text-indent: 25pt;" class="psuedo">i, j &larr; 1</div>
                        	    <div id="p8" style="text-indent: 25pt;" class="psuedo">array U[ m+1 ], array V[ n+1 ] &larr; &infin;<br /></div>
                            	<div id="p9" style="text-indent: 25pt;" class="psuedo"><b>for</b> k &larr; 1 m <b>to</b> n <b>do</b><br /></div>
	                            <div id="p10" style="text-indent: 35pt;" class="psuedo"><b>if</b> U[ i ] < V[j]<br /></div>
    	                     	<div id="p11" style="text-indent: 45pt;" class="psuedo">
                                 <b>then</b> array T[ k ] &larr; U[ i ]; i &larr; i + 1  <br /></div>
    	                     	<div id="p12" style="text-indent: 45pt;" class="psuedo"><b>else</b> T[ k ] &larr; V[ j ]; j &larr; j + 1<br /></div>                                     	                     	
        	                </div>
						</td>				<!-- End Psuedo -->

				<!-- Begin View -->
						<td colspan="5">
							<div id="workarea" class="workarea">
		                        <div id="box0" class="boxStyle">
								    <h1 class="h1box">0</h1>
								</div>
								<div id="box1" class="boxStyle">
									<h1 class="h1box">8</h1>
								</div>
								<div id="box2" class="boxStyle">
									<h1 class="h1box">3</h1>
								</div>
								<div id="box3" class="boxStyle">
									<h1 class="h1box">4</h1>
								</div>
								<div id="box4" class="boxStyle">
									<h1 class="h1box">3</h1>
								</div>
								<div id="box5" class="boxStyle">
									<h1 class="h1box">5</h1>
								</div>            
								<div id="box6" class="boxStyle">
									<h1 class="h1box">1</h1>
								</div>            
								<div id="box7" class="boxStyle">
									<h1 class="h1box">2</h1>
							   </div>
								<div id="box8" class="boxStyle">
									<h1 class="h1box">0</h1>
								</div>            
								<div id="box9" class="boxStyle">
									<h1 class="h1box">9</h1>
							   </div>                                           
							</div>
						</td>
				<!-- End View -->
					</tr>
				
				<!-- Begin Settings 
					<tr height="20%" id="algo-table-bottom">
						<td colspan="6" align="center">
							
						</td>
					</tr>
				End Settings -->
				</table>		
                <!-- End Template Table --></body>
</html>
