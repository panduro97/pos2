<?php

class Conexion{

	static public function conectar(){

		$link = new PDO("mysql:host=bigdeli.mx;dbname=atomstud_pos",
			            "atomstud_sergio",
			            "bigdeli123");

		$link->exec("set names utf8");

		return $link;

	}

}