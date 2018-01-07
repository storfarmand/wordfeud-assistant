<?php

$url="https://s3-eu-west-1.amazonaws.com/lego-365/LEGO365.json";
$ch = curl_init();
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_URL,$url);
$result=curl_exec($ch);
curl_close($ch);

$alexaFeed = json_decode($result, true);
$todaysFeed = array();

$todayDate = date('Y-m-d');
$todayTime = date('His');
foreach($alexaFeed as $key=>$value){
  if (strpos($value["updateDate"], $todayDate) !== false) {
    array_push($todaysFeed, $alexaFeed[$key]);
  }
}

header('Content-Type: application/json');
echo json_encode($todaysFeed);

?>
