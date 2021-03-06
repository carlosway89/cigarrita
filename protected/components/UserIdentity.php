<?php

/**
 * UserIdentity represents the data needed to identity a user.
 * It contains the authentication method that checks if the provided
 * data can identity the user.
 */
class UserIdentity extends CUserIdentity
{
	/**
	 * Authenticates a user.
	 * The example implementation makes sure if the username and password
	 * are both 'demo'.
	 * In practical applications, this should be changed to authenticate
	 * against some persistent user identity storage (e.g. database).
	 * @return boolean whether authentication succeeds.
	 */
	public function authenticate()
	{	
		$usuario = User::model()->findByAttributes(array('username' => $this->username,"is_deleted"=>0,"estado"=>1));		
		if(!isset($usuario))
			$this->errorCode=self::ERROR_USERNAME_INVALID;
		elseif($usuario->password !== $this->password)
			$this->errorCode=self::ERROR_PASSWORD_INVALID;
		else{
			$this->errorCode=self::ERROR_NONE;
			Yii::app()->user->setState('iduser',$usuario->iduser);
			//Yii::app()->user->setState('language_initial',Configuration::model()->findByPk(1)->language);
			Yii::app()->user->setState('fullname',$usuario->full_name);
		}
		
		
		return !$this->errorCode;
	}
}