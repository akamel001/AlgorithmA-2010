<?php

class Algorthm extends AppModel {
	var $name = 'Algorthm';
	var $actsAs = array ('Searchable'); 

	var $validate = array(
		'title' => array(
			'rule' => 'notEmpty'
		),
		'description' => array(
			'rule' => 'notEmpty'
		)
	);
}

?>

