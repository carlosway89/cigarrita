<?php 
// somewhere early in your project's loading, require the Composer autoloader
// see: http://getcomposer.org/doc/00-intro.md
require 'vendor/autoload.php';
require 'vendor/phpmailer/phpmailer/PHPMailerAutoload.php';

class Mailer{
	
	public function send($to,$message,$file=null){		

		$mail = new PHPMailer;

		//$mail->SMTPDebug = 3;                               // Enable verbose debug output

		$mail->isSMTP();                                      // Set mailer to use SMTP
		$mail->Host = "mx1.hostinger.de";  // Specify main and backup SMTP servers
		$mail->SMTPAuth = true;                               // Enable SMTP authentication
		$mail->Username = 'info@cajon-tajon.de';                 // SMTP username
		$mail->Password = 'y7$QHa>6l5Bl';                           // SMTP password
		$mail->SMTPSecure = 'ssl';                            // Enable TLS encryption, `ssl` also accepted
		$mail->Port = 465;                                    // TCP port to connect to

		$mail->From = 'info@cajon-tajon.de';
		$mail->FromName = 'Cajon Tajon';
		$mail->addAddress($to, $to);     // Add a recipient
		// $mail->addAddress('ellen@example.com');               // Name is optional
		$mail->addReplyTo($message->email, 'Kunde');
		//$mail->addCC('info@tajon-cajon.de');
		// $mail->addBCC('bcc@example.com');
		if ($file) {
			$mail->addAttachment($file);         // Add attachments
		}
		// $mail->addAttachment('/var/tmp/file.tar.gz');         // Add attachments
		// $mail->addAttachment('/tmp/image.jpg', 'new.jpg');    // Optional name
		$mail->isHTML(true);                                  // Set email format to HTML

		$mail->Subject = $message->subject;
		$mail->Body    = $message->body;
		$mail->AltBody = $message->body;

		if(!$mail->send()) {
		    return 'The message could not sent..Error Mail: ' . $mail->ErrorInfo;
		} else {
		    return 'The message has be succesfully sent';
		}


	}
}
