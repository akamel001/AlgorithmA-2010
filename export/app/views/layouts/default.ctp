<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<!--
	Name:			PHP Team (2009)
	File:			default.ctp
	Created:		3/18/2009
	
	Modified By:	Danny Vargas
	Team:			Management Team
	Project:		{AlgorithmA}; 2010
	Modified:		February 21, 2010	
-->

<html xmlns="http://www.w3.org/1999/xhtml">
<head>

<?php if (empty($algorithm['Algorithm']['title'])) { ?>
	<title>(AlgorithmA); 2010 | Home</title>
<?php } else { ?>
	<title>(AlgorithmA); 2010 | <?php echo $algorithm['Algorithm']['title'] ?></title>
<?php } ?>

	<!--
	=====CSS Includes=====
	-->

<?php echo "
	{$html->charset()}
	{$html->css('style')}
"?>
<?php if (empty($algorithm['Algorithm']['model']) == false) 
	echo "	
	{$html->css('algorithmLayout')}
	{$html->css('algorithm/'.$algorithm['Algorithm']['model'])}
";

else 
	echo "
	{$html->css('homeStyle')}
";?>

	<!--[if lte IE 7]>
	<style type="text/css">
	html .jqueryslidemenu{height: 1%;} /*IE7 and below*/
	</style>
	<![endif]-->

	<!--
	=====JavaScript Includes=====
	-->

<?php echo "
	{$javascript->link('jquery')}
	{$javascript->link('jqueryslidemenu')}
	{$javascript->link('localdata')}
	
	{$javascript->link('jsAnim')}
	{$javascript->link('pbMan')}
	";?>

<?php if (empty($algorithm['Algorithm']['control']) == false)
	echo "


	{$javascript->link('algorithm/'.$algorithm['Algorithm']['control'])}
	";
else
	echo "
	{$javascript->link('homeSrc')}
";?>
		
	<!--
	=====Background Fill Style=====
	-->

	<!--
	<style type="text/css">
	.BKG_Blue {
			background-image: url(/algo/images/head.png);
	}
	</style>
	-->

</head>

<body onload="Initialize()">


<?php if( !empty($algorithm['Algorithm']['view']) ) {
 echo "{$javascript->link('wz_tooltip')}";
} ?>

	<!--
	=====Start Navigation Header=====
	-->

	<table width="100%" border="0" cellspacing="0" cellpadding="0">
	  <tr>
	    <td width="2%" height="41" class="hdr_fill"></td>
	    <td width="98%" class="hdr_fill"><a href="/algo">Home</a> | <a href="/algo/pages/about">About</a> | <a href="/algo/pages/help">Help</a></td>
	  </tr>
	</table>



	<table width="100%" border="0" cellspacing="0" cellpadding="0">
	  <tr>
	    <td height="85" class="BKG_Blue"><a href="/algo"><img src="/algo/images/aa_logo.png" alt="Logo" width="288" height="39" /></a></td>
	  </tr>
	  <tr>
	    <td width="100%">
	      <div id="myslidemenu" class="jqueryslidemenu">

	<ul>
	<li><a href="#">Data Structures</a>
	  <ul>
	  <li><a href="/algo/algorithms/view/5">Deque</a></li>
	  <li><a href="/algo/algorithms/view/6">Linked List</a></li>
	  <li><a href="/algo/algorithms/view/7">Priority Queue</a></li>
	  <li><a href="/algo/algorithms/view/8">Queue</a></li>

	  <li><a href="/algo/algorithms/view/9">Stack</a></li>
	  <li><span>Heap<font size="1">(Coming Soon)</font></span></li>
	<!--  <li><a href="/algo/algorithms/view/6">Heap</a></li> -->
	  </ul>
	</li>
	<li><a href="#">Graph</a>
	  <ul>
	  <li><a href="/algo/algorithms/view/21">Critical Path</a></li>
	  <li><a href="/algo/algorithms/view/18">Dijkstra's Algorithm</a></li>
	  <li><a href="/algo/algorithms/view/19">Kruskal's Algorithm</a></li>
	  <li><a href="/algo/algorithms/view/20">Prim's Algorithm</a></li>
	  <li><span>Network Flow<font size="1">(Coming Soon)</font></span></li>
	  </ul>
	</li>
	<li><a href="#">Math Algorithms</a>
	  <ul>
	<!--
	  <li><a href="/algo/algorithms/view/17">Gaussian Elimination</a></li>
	  <li><a href="/algo/algorithms/view/18">Integration</a></li>
	  <li><a href="/algo/algorithms/view/19">Least Squares</a></li>
	  <li><a href="/algo/algorithms/view/20">Spline Interpolatione</a></li>
	-->

	  <li><span>Gaussian Elimination<font size="1">(Coming Soon)</font></span></li>
	  <li><span>Integration<font size="1">(Coming Soon)</font></span></li>

	  <li><span>Least Squares<font size="1">(Coming Soon)</font></span></li>
	  <li><span>Spline Interpolatione<font size="1">(Coming Soon)</font></span></li>
	  </ul>
	</li>
	<li><a href="#">Pattern Matching</a>
	  <ul>
	<!--
	  <li><a href="/algo/algorithms/view/21">Boyer-Moore</a></li>
	  <li><a href="/algo/algorithms/view/22">Brute Force</a></li>
	  <li><a href="/algo/algorithms/view/23">Knuth-Morris-Pratt</a></li>
	  <li><a href="/algo/algorithms/view/54">Pattern Racing</a></li>
	  <li><a href="/algo/algorithms/view/24">Rabin-Karp</a></li>
	-->

	  <li><span>Boyer-Moore<font size="1">(Coming Soon)</font></span></li>
	  <li><span>Brute Force<font size="1">(Coming Soon)</font></span></li>
	  <li><span>Knuth-Morris-Pratt<font size="1">(Coming Soon)</font></span></li>
	  <li><span>Pattern Racing<font size="1">(Coming Soon)</font></span></li>
	  <li><span>Rabin-Karp<font size="1">(Coming Soon)</font></span></li>

	  </ul>
	</li>
	<li><a href="#">Recursion</a>
	  <ul>
	<!--
	  <li><a href="/algo/algorithms/view/25">Alphabeta</a></li>
	  <li><a href="/algo/algorithms/view/26">Binary Search Tree</a></li>
	  <li><a href="/algo/algorithms/view/27">Factorial</a></li>
	  <li><a href="/algo/algorithms/view/28">Fibonacci</a></li>
	  <li><a href="/algo/algorithms/view/29">In-Order Traversal</a></li>
	  <li><a href="/algo/algorithms/view/30">Maze Problem</a></li>
	  <li><a href="/algo/algorithms/view/31">Post-Order</a></li>
	  <li><a href="/algo/algorithms/view/32">Pre-Order</a></li>
	  <li><a href="/algo/algorithms/view/33">Ruler</a></li>
	  <li><a href="/algo/algorithms/view/34">Star Fractal</a></li>
	  <li><a href="/algo/algorithms/view/35">Towers of Hanoi</a></li>
	-->
	  <li><span>Alphabeta<font size="1">(Coming Soon)</font></span></li>
	  <li><span>Binary Search Tree<font size="1">(Coming Soon)</font></span></li>
	  <li><span>Factorial<font size="1">(Coming Soon)</font></span></li>

	  <li><span>Fibonacci<font size="1">(Coming Soon)</font></span></li>
	  <li><span>In-Order Traversal<font size="1">(Coming Soon)</font></span></li>
	  <li><span>Maze Problem<font size="1">(Coming Soon)</font></span></li>
	  <li><span>Post-Order<font size="1">(Coming Soon)</font></span></li>
	  <li><span>Pre-Order<font size="1">(Coming Soon)</font></span></li>

	  <li><span>Ruler<font size="1">(Coming Soon)</font></span></li>
	  <li><span>Star Fractal<font size="1">(Coming Soon)</font></span></li>
	  <li><span>Towers of Hanoi<font size="1">(Coming Soon)</font></span></li>
	  </ul>
	</li>
	<li><a href="#">Search</a>

	  <ul>
	  <li><a href="/algo/algorithms/view/10">Binary Tree</a></li>
	  <li><a href="/algo/algorithms/view/11">Breadth First</a></li>
	  <li><a href="/algo/algorithms/view/14">Depth First</a></li>
	  <li><a href="/algo/algorithms/view/12">Sequential Search</a></li>
	  </ul>
	</li>

	<li><a href="#">Sort</a>
	  <ul>
	  <li><a href="/algo/algorithms/view/3">Bubble</a></li>
	  <li><a href="/algo/algorithms/view/2">Insertion</a></li>
	  <li><a href="/algo/algorithms/view/13">Merge</a></li>
	  <li><a href="/algo/algorithms/view/4">Quick</a></li>
	  <li><span>Hash<font size="1">(Coming Soon)</font></span></a></li>

	  <li><span>Heap<font size="1">(Coming Soon)</font></span></li>
	  <li><span>Radix<font size="1">(Coming Soon)</font></span></li>
	  <li><span>Sort Racing<font size="1">(Coming Soon)</font></span></li>
	  <li><span>Comb<font size="1">(Coming Soon)</font></span></li>
	<!--
	  <li><a href="/algo/algorithms/view/41">Hash</a></li>
	  <li><a href="/algo/algorithms/view/42">Heap</a></li>
	  <li><a href="/algo/algorithms/view/46">Radix</a></li>
	  <li><a href="/algo/algorithms/view/47">Sort Racing</a></li>
	  <li><a href="/algo/algorithms/view/48">Comb</a></li>
	-->

	  </ul>
	</li>
	<li><a href="#">Tree</a>
	  <ul>
	  <li><a href="/algo/algorithms/view/16">2-3-4</a></li>
	  <li><a href="/algo/algorithms/view/17">AVL</a></li>
	  <li><a href="/algo/algorithms/view/15">Red-Black</a></li>
	  <li><span>B-Tree<font size="1">(Coming Soon)</font></span></li>
	  <li><span>M-Way<font size="1">(Coming Soon)</font></span></li>
	  </ul>
	</li>
	<li><a href="#">Other</a>
	  <ul>
	<!--	CHANGE THESE TO ENABLE LINKS
	  <li><a href="/algo/algorithms/view/2">Authoring System</a></li>
	  <li><a href="/algo/algorithms/view/4">Compression:  Huffman Code</a></li>
	  <li><a href="/algo/algorithms/view/5">RSA Encryption</a></li>
	  <li><a href="/algo/algorithms/view/11">Optimization: Knapsack</a></li>
	-->

	  <li><a href="/algo/algorithms/view/1">Test</a></li>
	  <li><span>Authoring System<font size="1">(Coming Soon)</font></span></li>
	  <li><span>Compression:  Huffman Code<font size="1">(Coming Soon)</font></span></li>
	  <li><span>RSA Encryption<font size="1">(Coming Soon)</font></span></li>
	  <li><span>Optimization: Knapsack<font size="1">(Coming Soon)</font></span></li>
	  </ul>

	</li>
	</ul>
	<br style="clear: left"/>

	      </div>
	    </td>
	  </tr>
	</table>

	<!--
	=====End Navigation Header / Start Main Body=====
	-->


	<table width="100%" border="0" cellspacing="0" cellpadding="0">
	  <tr>
		<td width="100%" bgcolor="white" class="banner_fill">

<?php echo $content_for_layout; ?>

		</td>
	  </tr>
	</table>

	<!--
	=====End Body / Start Footer ======
	-->

	<table width="100%" border="0" cellspacing="0" cellpadding="0">
	  <tr>
		<td width="93%" class="hdr_fill">&nbsp;</td>
		<td width="7%" height="41" class="company">CS455 Inc.</td>
	  </tr>
	</table>

</body>
</html>
