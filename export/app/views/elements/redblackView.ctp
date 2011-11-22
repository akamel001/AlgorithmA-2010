<!-- Begin Template Table FLY DAMMIT -->

	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
	<link rel="stylesheet" type="text/css" href="css/style.css"></script>
	<link rel="stylesheet" type="text/css" href="css/algorithmLayout.css"></script>
	<link rel="stylesheet" type="text/css" href="css/testStyle.css"></script>

	<script language="JavaScript" type="text/javascript" src="js/jsAnim.js"></script>
	<script language="JavaScript" type="text/javascript" src="js/pbMan.js"></script>
	<script language="JavaScript" type="text/javascript" src="js/testSrc.js"></script>
	<script language="JavaScript" type="text/javascript" src="js/redblackSrc.js"></script>
		<table width="984px" id="algo-table" border="2" cellpadding="5">
			<tr height="5%" class="algo-table-top">
		<!-- Begin Contols -->				
				<td colspan="6" class="main-controls">
					<div style="float: left;" align="left" id="control-button-box">
						<!-- Insert Buttons here (use <button>s only!) -->
						<button id="playpause" onclick="buildTree()">Animation</button>
						<button  onClick="window.location.reload()">Reset</button>

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
					<div id = "pcode 1">binaryTreeInsert(value)</div>
					<div id = "pcode 2">binaryTreeDelete(value)</div>
					<div id = "pcode 3">rotateIfNecessary()</div>
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
				<td colspan="2" width="50%" align="center">
					
					Input Value:<input id="myText" size = "2" type = "text" value = ""> 
				</td>
				<td>

				</td>
			</tr>
		<!-- End Settings -->
		</table>
<!-- End Template Table -->