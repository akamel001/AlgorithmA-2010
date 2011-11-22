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
						<td width="25%" valign="top" class="psuedocode" id="psuedocode-column">		
<pre>Breadth First Search Demonstration
FUNCTION BreadthFirstSearch(st: Node, v: int):BOOLEAN
  VAR
    q: Queue
    n: Node
  BEGIN
    q.Enqueue(st)
<div id ="searchlevel">    WHILE(NOT q.IsEmpty() AND n.val != v)</div>
<div id = "node--">	n = q.Deque()</div>
<div id = "node++">		IF(NOT Visited(n))
			MarkVisited(n)
			q.Enque(n.unvisitedNeighbors)</div>
		END IF
	END WHILE
<div id = "found">    RETURN n.val = v</div>
  END
<div id = "notfound">  Return Not Found</div></pre>
						</td>
				<!-- End Psuedo -->

				<!-- Begin View -->
						<td colspan="5" align="center" valign="top">
							<TABLE BORDER="0" cellpadding="0" cellspacing="0" background="/algo/images/algorithm/breadthfirst/bfs_background.png">			
								<TR>
									<TD HEIGHT="50px" width="50px" >
									</td>
									<TD HEIGHT="50px" width="50px" >
									</td>
									<TD HEIGHT="50px" width="50px" >
									</td>
									<TD HEIGHT="50px" width="50px" >
									</td>
									<TD HEIGHT="50px" width="50px" >
									</td>
									<TD HEIGHT="50px" width="50px" >
									</td>
									<TD HEIGHT="50px" width="50px" >
									</td>
									<TD HEIGHT="50px" width="50px" >
										<div id="level0" class="image" style="visibility: hidden;">
										<img id="level0" src="/algo/images/algorithm/breadthfirst/arrow.png">
										<div class="text"></div>
									</div>
									</td>
									<TD HEIGHT="50px" width="50px" >
								   <div class="image">

									  <img id ="0" src="/algo/images/algorithm/breadthfirst/circle.gif"  height="50px" width="50px" />
									  
									  <div class="text">
										0
									  </div>
									  </div>


									</td>
								<TD HEIGHT="50px" width="50px" >
								</td>
								<TD HEIGHT="50px" width="50px" >
								</td>
								<TD HEIGHT="50px" width="50px" >
								</td>
								<TD HEIGHT="50px" width="50px" >
								</td>
								</TR>

								<TD HEIGHT="50px" width="50px" >
								</td>
								<TD HEIGHT="50px" width="50px" >
								</td>

								<TD HEIGHT="50px" width="50px" >
								</td>
								<TD HEIGHT="50px" width="50px" >
								<div id="level1" class="image" style="visibility: hidden;">
										<img id="level1" src="/algo/images/algorithm/breadthfirst/arrow.png">
										<div class="text"></div>
									</div>
								</td>
								<TD HEIGHT="50px" width="50px" >
								 
								  <div class="image">

									  <img id ="1" src="/algo/images/algorithm/breadthfirst/circle.gif"  height="50px" width="50px" />
									  
									  <div class="text">
										1
									  </div>
									  </div>

								</div>
								</td>
								<TD HEIGHT="50px" width="50px" >
								</td>
								<TD HEIGHT="50px" width="50px" >
								</td>
								<TD HEIGHT="50px" width="50px" >
								</td>
								<TD HEIGHT="50px" width="50px" >
								</td>
								<TD HEIGHT="50px" width="50px" >
								</td>
								<TD HEIGHT="50px" width="50px" >
								</td>
								<TD HEIGHT="50px" width="50px" >
								</td>
								<TD HEIGHT="50px" width="50px" >
								  <div class="image">

									  <img id ="2" src="/algo/images/algorithm/breadthfirst/circle.gif"  height="50px" width="50px" />
									  
									  <div class="text">
										2
									  </div>
									  </div>

								</td>
								<TD HEIGHT="50px" width="50px" >
								</td>
								<TD HEIGHT="50px" width="50px" >
								</td>
								<TD HEIGHT="50px" width="50px" >
								</td>
								</TR>

								<TR>
								<TD HEIGHT="50px" width="50px" >
								</td>
								<TD HEIGHT="50px" width="50px" >
								<div id="level2" class="image" style="visibility: hidden;">
										<img id="level2" src="/algo/images/algorithm/breadthfirst/arrow.png">
										<div class="text"></div>
									</div>
								</td>
								<TD HEIGHT="50px" width="50px" >
								  <div class="image">

									  <img id ="3" src="/algo/images/algorithm/breadthfirst/circle.gif"  height="50px" width="50px" />
									  
									  <div class="text">
										3
									  </div>
									  </div>

								</td>
								<TD HEIGHT="50px" width="50px" >
								</td>
								<TD HEIGHT="50px" width="50px" >
								</td>
								<TD HEIGHT="50px" width="50px" >
								</td>
								<TD HEIGHT="50px" width="50px" >
								  <div class="image">

									  <img id ="4" src="/algo/images/algorithm/breadthfirst/circle.gif"  height="50px" width="50px" />
									  
									  <div class="text">
										4
									  </div>
									  </div>

								</td>
								<TD HEIGHT="50px" width="50px" >
								</td>
								<TD HEIGHT="50px" width="50px" >
								</td>
								<TD HEIGHT="50px" width="50px" >
								</td>
								<TD HEIGHT="50px" width="50px" >
								  <div class="image">

									  <img id ="5" src="/algo/images/algorithm/breadthfirst/circle.gif"  height="50px" width="50px" />
									  
									  <div class="text">
										5
									  </div>
									  </div>

								</td>
								<TD HEIGHT="50px" width="50px" >
								</td>
								<TD HEIGHT="50px" width="50px" >
								</td>
								<TD HEIGHT="50px" width="50px" >
								</td>
								<TD HEIGHT="50px" width="50px" >
								  <div class="image">

									  <img id ="6" src="/algo/images/algorithm/breadthfirst/circle.gif"  height="50px" width="50px" />
									  
									  <div class="text">
										6
									  </div>
									  </div>

								</td>
								</TR>

								<TR>
								<TD HEIGHT="50px" width="50px" >
								<div id="level3" class="image" style="visibility: hidden;">
										<img id="level3" src="/algo/images/algorithm/breadthfirst/arrow.png">
										<div class="text"></div>
									</div>
								</td>
								<TD HEIGHT="50px" width="50px" >
								  <div class="image">

									  <img id ="7" src="/algo/images/algorithm/breadthfirst/circle.gif"  height="50px" width="50px" />
									  
									  <div class="text">
										7
									  </div>
									  </div>

								</td>

								<TD HEIGHT="50px" width="50px" >
								</td>
								<TD HEIGHT="50px" width="50px" >
								  <div class="image">

									  <img id ="8" src="/algo/images/algorithm/breadthfirst/circle.gif"  height="50px" width="50px" />
									  
									  <div class="text">
										8
									  </div>
									  </div>

								</td><TD HEIGHT="50px" width="50px" >
								</td>
								<TD HEIGHT="50px" width="50px" >
								  <div class="image">

									  <img id ="9" src="/algo/images/algorithm/breadthfirst/circle.gif"  height="50px" width="50px" />
									  
									  <div class="text">
										9
									  </div>
									  </div>

								</td><TD HEIGHT="50px" width="50px" >
								</td>
								<TD HEIGHT="50px" width="50px" >
								  <div class="image">

									  <img id ="10" src="/algo/images/algorithm/breadthfirst/circle.gif"  height="50px" width="50px" />
									  
									  <div class="text">
										10
									  </div>
									  </div>

								</td><TD HEIGHT="50px" width="50px" >
								</td>
								<TD HEIGHT="50px" width="50px" >
								  <div class="image">

									  <img id ="11" src="/algo/images/algorithm/breadthfirst/circle.gif"  height="50px" width="50px" />
									  
									  <div class="text">
										11
									  </div>
									  </div>

								</td><TD HEIGHT="50px" width="50px" >
								</td>
								<TD HEIGHT="50px" width="50px" >
								  <div class="image">

									  <img id ="12" src="/algo/images/algorithm/breadthfirst/circle.gif"  height="50px" width="50px" />
									  
									  <div class="text">
										12
									  </div>
									  </div>

								</td><TD HEIGHT="50px" width="50px" >
								</td>
								<TD HEIGHT="50px" width="50px" >
								  <div class="image">

									  <img id ="13" src="/algo/images/algorithm/breadthfirst/circle.gif"  height="50px" width="50px" />
									  
									  <div class="text">
										13
									  </div>
									  </div>

								</td>
								<TD HEIGHT="50px" width="50px" >
								</td>
								<TD HEIGHT="50px" width="50px" >
								  <div class="image">

									  <img id ="14" src="/algo/images/algorithm/breadthfirst/circle.gif"  height="50px" width="50px" />
									  
									  <div class="text">
										14
									  </div>
									  </div>

								</td>

							</table>
						</td>
				<!-- End View -->
					</tr>
				
				<!-- Begin Settings -->
					<tr height="20%" id="algo-table-bottom">
						<td colspan="6" align="center"><!-- form to set value of the stack -->
							<input type="text" size="3" maxlength="3" name="input1" />
							<button onclick="setTarget()">target node</button>
						</td>
					</tr>
				<!-- End Settings -->
				</table>