<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of Cripto
 *
 * @author Jose
 */
class Cripto {
    
    function encriptar($key,$iv,$data){
        if (strlen($key)!=24){
            echo "La longitud de la key ha de ser de 24 dígitos.<br>";
            return -1;
        }
        if ((strlen($iv) % 8 )!=0){
            echo "La longitud del vector iv ha de ser múltiple de 8 dígitos.<br>";
            return -2;
        }
        return @base64_encode(mcrypt_encrypt(MCRYPT_3DES, $key, $data, MCRYPT_MODE_CBC, $iv));
    }
 
 
    function desencriptar($key,$iv,$data){
        if (strlen($key)!=24){
            echo "La longitud de la key ha de ser de 24 dígitos.<br>";
            return -1;
        }
        if ((strlen($iv) % 8 )!=0){
            echo "La longitud del vector iv ha de ser múltiple de 8 dígitos.<br>";
            return -2;
        }
        return @mcrypt_decrypt(MCRYPT_3DES, $key, base64_decode($data), MCRYPT_MODE_CBC, $iv);
    }
}
