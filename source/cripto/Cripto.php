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
    
    private static $encrypt_method = "AES-256-CBC";
    private static $secret_key = 'WS-SERVICE-KEY';
    private static $secret_iv = 'WS-SERVICE-VALUE';
    
    public static function encriptar($data) {
        $key = hash('sha256', self::$secret_key);
        $iv = substr(hash('sha256', self::$secret_iv), 0, 16);
        $cipherText = openssl_encrypt($data, Cripto::$encrypt_method, $key, true, $iv);
        return $cipherText;
    }

    public static function desencriptar($data){
        // hash
        $key = hash('sha256', self::$secret_key);
        $iv = substr(hash('sha256', self::$secret_iv), 0, 16);
        return openssl_decrypt(base64_decode($data), Cripto::$encrypt_method, $key, 0, $iv);
    }
}
