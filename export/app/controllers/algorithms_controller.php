<?php

class AlgorithmsController extends AppController {

	function index() {
		//grab all ingredients and pass it to the view:
		$algorithms = $this->Algorithm->find('all');
		$this->set('algorithms', $algorithms);
	}

	function view($id) {
		$this->Algorithm->id = $id;
		$this->set('algorithm', $this->Algorithm->read());
	}

	function add() {
		if (!empty($this->data)) {
			if ($this->Algorithm->save($this->data)) {
				$this->flash('Your algorithm has been saved.', '/algorithms');
			}
		}
	}


	function search() {
		$this->set('results',$this->Algorithm->search($this->data['Algorithm']['q']));
	} 




}

?>
