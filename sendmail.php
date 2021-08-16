<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'phpmailer/src/Exception.php';
require 'phpmailer/src/PHPMailer.php';

$mail = new PHPMailer(true);
$mail->CharSet = 'UTF-8';
$mail->setLanguage('ru','phpmailer/language');
$mail->isHTML(true);

$mail->setFrom('info@testwork.ru', 'Тестовое задание');
$mail->addAddress('kalinin.dmitriy.1996@gmail.com');
$mail->Subject='Данные с формы';


$body='<h1>Данные с формы:</h1>';
if(trim(!empty($_POST['name']))){
    $body.='<p><strong>Имя:</strong>'.$_POST['name'].'</p>';
}
if(trim(!empty($_POST['email']))){
    $body.='<p><strong>E-mail:</strong>'.$_POST['email'].'</p>';
}
if(trim(!empty($_POST['name']))){
    $body.='<p><strong>Телефон:</strong>'.$_POST['phone'].'</p>';
}

$mail->Body=$body;

if(!$mail->send()){
    $message = 'Error';
}else{
    $message='Success';
}

$response = ['message' =>$message];
header('Content-Type: application/json');
echo json_encode($response);

?>