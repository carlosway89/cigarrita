<?php

class generator_model{


		private $root="localhost";
		private $dbhost="localhost";
		private $dbuser="root";
		private $dbpass=" ";
		private $dbname="cigarrita";
		private $language="es";

		public function __construct($dbhost,$dbuser,$dbpass,$dbname="cigarrita_web",$language="es") {
			$this->dbhost=$dbhost;
			$this->dbuser=$dbuser;
			$this->dbpass=$dbpass;
			$this->dbname=$dbname;
			$this->language=$language;
			$this->root=$_SERVER['DOCUMENT_ROOT'];

	  	}

	  	public function create_config(){
	  		try {
	  			
	  			$config=file_get_contents("config_generator.php");
		  		$config=str_replace("{#dbhost}", $this->dbhost, $config);
		  		$config=str_replace("{#dbuser}", $this->dbuser, $config);
		  		$config=str_replace("{#dbpass}", $this->dbpass, $config);
		  		$config=str_replace("{#dbname}", $this->dbname, $config);
		  		$config=str_replace("{#language}", $this->language, $config);

		  		$file = new SplFileObject($this->root."/protected/config/main.php",'w+');		            
				$file->fwrite($config);
				chmod($this->root."/protected/config/main.php", 0777);

				return true;
	  			
	  		} catch (Exception $e) {
	  			return $e;
	  		}
	  		
			
	  	}

	  	public function run_sql(){

	  		   // $conn = mysql_connect($this->dbhost, $this->dbuser, $this->dbpass);
	  		$conn = new mysqli($this->dbhost, $this->dbuser, $this->dbpass, $this->dbname);
	   		
	   		$message=true;

			   if(mysqli_connect_errno()) {
			      $message='Could not connect: ' . mysqli_connect_error();
			   }else{
				   
				   $sql = file_get_contents("cigarrita_db_to_install.sql");
				   // mysql_select_db($this->dbname);
				   // $retval = mysql_query( $sql, $conn );
				   $retval=$conn->multi_query($sql);
				   
				   if(! $retval ) {
				      $message='Could not create table: ' . mysql_error();
				   }else{
				   		$message=true;
				   }
			   }
			   
			   // mysql_close($conn);
			   $conn->close();

			   return $message;

	  	}

		public function create_db(){

			
		    $conn = mysql_connect($this->dbhost, $this->dbuser, $this->dbpass);
		    $message=true;
		   
			if(! $conn ) {
				$message='Could not connect: ' . mysql_error();
			}
		   	else{

		   		$sql = "CREATE Database ".$this->dbname;
			   	$retval = mysql_query( $sql, $conn );
			   
			   	if(! $retval ) {
			   		$message='Could not create database: ' . mysql_error();
			   	}else{
			   		$message=true;
			   	}
			   	
		   	}
		   	
		   	mysql_close($conn);

		   	return $message;
		}

}

?>

