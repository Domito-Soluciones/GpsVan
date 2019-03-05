<?php

include './source/cripto/Cripto.php';

echo base64_encode(Cripto::encriptar("MTIz"));

?>

<html>
    <head>
        <script>
                        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function (position) {
                console.log(position.coords.latitude);
                //POSITION = [];
            }, function (error) {
                console.log(error);
            });
                        }
        </script>
    </head>
    <body>
        
    </body>
</html>

