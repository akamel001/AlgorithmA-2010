  <!-- Begin Template Table -->
    <table width="984px" id="algo-table" border="2" cellpadding="5">
        <tr height="5%" class="algo-table-top">
            <!-- Begin Contols -->
            <td colspan="6" class="main-controls">
                <div style="float: left;" align="left" id="control-button-box">
                    <!-- Insert Buttons here (use <button>s only!) -->
                    <button id="start" onclick="start()">
                    	Start
                    </button>
					<button id="forward" onclick="stepF()">
                        Forward
                    </button>
					<button id="backward" onclick="stepB()">
                        Backward
                    </button>
					<button id="pause" onclick="animating = false">
                        Pause
                    </button>
					
    				<button id="reset" onclick="resetVars()">
                        Reset
                    </button>
                </div>
                <div style="float: right;" align="right" id="info-button-box">
                    <button id="concept" onMouseOut="UnTip();">
                        Concept
                    </button>
                    <button id="howto" onMouseOut="UnTip();">
                        How-to
                    </button>
                </div>
            </td>
            <!-- End Controls -->
        </tr>
        <tr height="90%" class="algo-table-middle">
            <!-- Begin Psuedo -->

            <td width="31%" class="psuedocode" id="psuedocode">
                <!-- Enter Psudo Here -->
				<script type="text/javascript">
					//for(i = 0; i < psuedoLines2.length; i++) {
					//	document.write("<br><br>");
					//}
					</script>
            </td>
            <!-- End Psuedo -->
            <!-- Begin View -->
            <td colspan="5">
                <div class="workarea" id="workarea">
                    <!-- Enter your objects here!! -->
                    <div id="node0" style="position: relative; color: black; background-image: url(); background-repeat: no-repeat; width:40px; height:40px;">
                        <div style="position: absolute; bottom: 10px; left: 15px; width:25px;">
                            <p>
                                0
                            </p>
                        </div>
                    </div>
                    <div id="node1" style="position: relative; color: black; background-image: url(); background-repeat: no-repeat; width:40px; height:40px;">
                        <div style="position: absolute; bottom: 10px; left: 15px; width:25px;">
                            <p>
                                1
                            </p>
                        </div>
                    </div>
                    <div id="node2" style="position: relative; color: black; background-image: url(); background-repeat: no-repeat; width:40px; height:40px;">
                        <div style="position: absolute; bottom: 10px; left: 15px; width:25px;">
                            <p>
                                2
                            </p>
                        </div>
                    </div>
                    <div id="node3" style="position: relative; color: black; background-image: url(); background-repeat: no-repeat; width:40px; height:40px;">
                        <div style="position: absolute; bottom: 10px; left: 15px; width:25px;">
                            <p>
                                3
                            </p>
                        </div>
                    </div>
                    <div id="node4" style="position: relative; color: black; background-image: url(); background-repeat: no-repeat; width:40px; height:40px;">
                        <div style="position: absolute; bottom: 10px; left: 15px; width:25px;">
                            <p>
                                4
                            </p>
                        </div>
                    </div>
                    <div id="node5" style="position: relative; color: black; background-image: url(); background-repeat: no-repeat; width:40px; height:40px;">
                        <div style="position: absolute; bottom: 10px; left: 15px; width:25px;">
                            <p>
                                5
                            </p>
                        </div>
                    </div>
                    <div id="forms" style="position: relative; color: black; width:70px" align="right">
                        <form>
                            A:<input type="text" value="4" id="formAdata" maxlength="2" size="1" onChange = "setTimes(); draw()"/>
                            <br>
                            B:<input type="text" value="3" id="formBdata" maxlength="2" size="1" onChange = "setTimes(); draw()"/>
                            <br>
                            C:<input type="text" value="8" id="formCdata" maxlength="2" size="1" onChange = "setTimes(); draw()"/>
                            <br>
                            D:<input type="text" value="7" id="formDdata" maxlength="2" size="1" onChange = "setTimes(); draw()"/>
                            <br>
                            E:<input type="text" value="9" id="formEdata" maxlength="2" size="1" onChange = "setTimes(); draw()"/>
                            <br>
                            F:<input type="text" value="12" id="formFdata" maxlength="2" size="1" onChange = "setTimes(); draw()"/>
                            <br>
                            G:<input type="text" value="2" id="formGdata" maxlength="2" size="1" onChange = "setTimes(); draw()"/>
                            <br>
                            H:<input type="text" value="5" id="formHdata" maxlength="2" size="1" onChange = "setTimes(); draw()"/>
                            <br>
                            &nbsp;&nbsp;I:<input type="text" value="6" id="formIdata" maxlength="2" size="1" onChange = "setTimes(); draw()"/>
                        </form>
                    </div>
                    <script type="text/javascript">
						var mnodes = new Array(document.getElementById("node0"), document.getElementById("node1"), document.getElementById("node2"), document.getElementById("node3"), document.getElementById("node4"), document.getElementById("node5"));
						var nodeColorsStart = new Array(greenImg, greenImg, greenImg, greenImg, greenImg, greenImg);
						var nodeColors = nodeColorsStart.slice(0);
						initDivs();
						var lineNames = new Array("A", "B", "C", "D", "E", "F", "G", "H", "I");
						var lineTimeStart = new Array("4", "3", "8", "7", "9", "12", "2", "5", "6");
						var lineTimes = new Array(document.getElementById("formAdata").value, document.getElementById("formBdata").value, document.getElementById("formCdata").value, document.getElementById("formDdata").value, document.getElementById("formEdata").value, document.getElementById("formFdata").value, document.getElementById("formGdata").value, document.getElementById("formHdata").value, document.getElementById("formIdata").value);
                        var lineColorsStart = new Array(greenHex, greenHex, greenHex, greenHex, greenHex, greenHex, greenHex, greenHex, greenHex);
						var lineColors = lineColorsStart.slice(0);
						var psuedoColorsStart = new Array();
						for(i = 0; i <psuedoLines2.length; i++) {
							psuedoColorsStart.push("black");
						}
						var psuedoColors = psuedoColorsStart.slice(0);
						var weightColorsStart = new Array("white","white","white","white","white","white");
						weightColors = weightColorsStart.slice(0);
						var jg = new jsGraphics("workarea");
                        var jgp = new jsGraphics("workarea");
						align(mnodes);
						draw();
                    </script>
                </div>
            </td>
            <!-- End View -->
        </tr>
        <!-- Begin Settings -->
        <tr height="20%" id="algo-table-bottom">
        </tr>
        <!-- End Settings -->
    </table>
    <!-- End Template Table -->