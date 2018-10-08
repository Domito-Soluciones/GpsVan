<?php
$busca = $_GET['busca'];
$response = http_get("https://maps.googleapis.com/maps/api/place/autocomplete/json?input=".$busca."&key=AIzaSyDfPGTUHN5DXdLh9XN52mFKEay6vtTrmos&location=-33.440616,-70.6514212&radius=500&strictbounds&language=es");
print($response);