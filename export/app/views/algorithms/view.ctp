<!-- Start of file: /app/views/algorithm/view.ctp -->
	<table width="100%" border="0" align="center" cellpadding="15" cellspacing="0" class="fill_white_bkg">
	  <tr>
		<td align="center">
		<br />
		<?php if (!empty($algorithm['Algorithm']['title'])) 
			echo '<p class="algo_title">'.$algorithm['Algorithm']['title'].'</p>';
		?>
		
		<br />

		<?php if (empty($algorithm['Algorithm']['view'])) { ?>
		  <p align="center"><font color="#E7E7E7" size="+3">Nothing here but us chickens.</font></p>
		<?php } else { 
			echo $this->element($algorithm['Algorithm']['view']);
		} ?>
		  
		<br/> <br/>
		
		</td>
	  </tr>
	</table>

<!-- End of file: /app/views/algorithm/view.ctp -->