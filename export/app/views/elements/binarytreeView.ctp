				<table width="984px" id="algo-table" border="2" cellpadding="5">
					<tr height="5%" class="algo-table-top">
				<!-- Begin Contols -->				
						<td colspan="6" class="main-controls">
							<div style="float: left;" align="left" id="control-button-box">
								<button onClick = "highlight();">Animate</button>
								<button onClick = "resetNodes();">Reset</button>
								<button onClick = "highlight2();">Step</button>
								<button onClick = "goBack();">Previous</button>
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
<pre>


BinarySearchTree::search(int val)

    Node* next = this->root();
 
    while (next != 0)
    
<div id="found">         if (val == next->value())
        
           return true;
            </div>
<div id="lessthanroot">        else if (val < next->value())
        
            next = next->left();   
        </div>
<div id="greaterthanroot">        else if (val > next->value())
        
            next = next->right();</div>        
    return false;

</pre>
						</td>
				<!-- End Psuedo -->

				<!-- Begin View -->
						<td colspan="5" align="center" valign="top">
							<TABLE BORDER="0" cellpadding="0" cellspacing="0" background="/algo/images/algorithm/binarytree/background.png">			
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
									</td>
									<TD HEIGHT="50px" width="50px" >
								   <div id="0" class="image">

									  <img id ="50" src="/algo/images/algorithm/breadthfirst/circle.gif"  height="50px" width="50px" />
									  
									  <div class="text">
										50
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
								</td>
								<TD HEIGHT="50px" width="50px" >
								 
								  <div id="1" class="image">

									  <img id ="20" src="/algo/images/algorithm/breadthfirst/circle.gif"  height="50px" width="50px" />
									  
									  <div class="text">
										20
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
								  <div id="2" class="image">

									  <img id ="80" src="/algo/images/algorithm/breadthfirst/circle.gif"  height="50px" width="50px" />
									  
									  <div class="text">
										80
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
								</td>
								<TD HEIGHT="50px" width="50px" >
								  <div id="node10" class="image">

									  <img id ="10" src="/algo/images/algorithm/breadthfirst/circle.gif"  height="50px" width="50px" />
									  
									  <div class="text">
										10
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
								  <div id="node30" class="image">

									  <img id ="30" src="/algo/images/algorithm/breadthfirst/circle.gif"  height="50px" width="50px" />
									  
									  <div class="text">
										30
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
								  <div id="node70" class="image">

									  <img id ="70" src="/algo/images/algorithm/breadthfirst/circle.gif"  height="50px" width="50px" />
									  
									  <div class="text">
										70
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
								  <div id="node90" class="image">

									  <img id ="90" src="/algo/images/algorithm/breadthfirst/circle.gif"  height="50px" width="50px" />
									  
									  <div class="text">
										90
									  </div>
									  </div>

								</td>
								</TR>

								<TR>
								<TD HEIGHT="50px" width="50px" >
								</td>
								<TD HEIGHT="50px" width="50px" >
								  <div id="node5" class="image">

									  <img id ="5" src="/algo/images/algorithm/breadthfirst/circle.gif"  height="50px" width="50px" />
									  
									  <div class="text">
										5
									  </div>
									  </div>

								</td>

								<TD HEIGHT="50px" width="50px" >
								</td>
								<TD HEIGHT="50px" width="50px" >
								  <div id="node15" class="image">

									  <img id ="15" src="/algo/images/algorithm/breadthfirst/circle.gif"  height="50px" width="50px" />
									  
									  <div class="text">
										15
									  </div>
									  </div>

								</td><TD HEIGHT="50px" width="50px" >
								</td>
								<TD HEIGHT="50px" width="50px" >
								  <div id="node25" class="image">

									  <img id ="25" src="/algo/images/algorithm/breadthfirst/circle.gif"  height="50px" width="50px" />
									  
									  <div class="text">
										25
									  </div>
									  </div>

								</td><TD HEIGHT="50px" width="50px" >
								</td>
								<TD HEIGHT="50px" width="50px" >
								  <div id="node35" class="image">

									  <img id ="35" src="/algo/images/algorithm/breadthfirst/circle.gif"  height="50px" width="50px" />
									  
									  <div class="text">
										35
									  </div>
									  </div>

								</td><TD HEIGHT="50px" width="50px" >
								</td>
								<TD HEIGHT="50px" width="50px" >
								  <div id="node65" class="image">

									  <img id ="65" src="/algo/images/algorithm/breadthfirst/circle.gif"  height="50px" width="50px" />
									  
									  <div class="text">
										65
									  </div>
									  </div>

								</td><TD HEIGHT="50px" width="50px" >
								</td>
								<TD HEIGHT="50px" width="50px" >
								  <div id="node75" class="image">

									  <img id ="75" src="/algo/images/algorithm/breadthfirst/circle.gif"  height="50px" width="50px" />
									  
									  <div class="text">
										75
									  </div>
									  </div>

								</td><TD HEIGHT="50px" width="50px" >
								</td>
								<TD HEIGHT="50px" width="50px" >
								  <div id="node85" class="image">

									  <img id ="85" src="/algo/images/algorithm/breadthfirst/circle.gif"  height="50px" width="50px" />
									  
									  <div class="text">
										85
									  </div>
									  </div>

								</td>
								<TD HEIGHT="50px" width="50px" >
								</td>
								<TD HEIGHT="50px" width="50px" >
								  <div id="node95" class="image">

									  <img id ="95" src="/algo/images/algorithm/breadthfirst/circle.gif"  height="50px" width="50px" />
									  
									  <div class="text">
										95
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
							Search Value:<input id="myText" size = "2" type = "text" value = "">
							<button onClick = "selectText();">Set Value</button>
						</td>
					</tr>
				<!-- End Settings -->
				</table>