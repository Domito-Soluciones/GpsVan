-- phpMyAdmin SQL Dump
-- version 3.5.1
-- http://www.phpmyadmin.net
--
-- Servidor: localhost
-- Tiempo de generación: 04-12-2018 a las 03:54:09
-- Versión del servidor: 5.5.24-log
-- Versión de PHP: 5.4.3

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Base de datos: `gpsvan`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tbl_agente`
--

CREATE TABLE IF NOT EXISTS `tbl_agente` (
  `agente_id` int(11) NOT NULL AUTO_INCREMENT,
  `agente_nombre` varchar(20) NOT NULL,
  `agente_papellido` varchar(20) NOT NULL,
  `agente_mapellido` varchar(20) NOT NULL,
  `agente_rut` varchar(10) NOT NULL,
  `agente_clave` varchar(20) NOT NULL,
  `agente_telefono` varchar(15) NOT NULL,
  `agente_celular` varchar(15) NOT NULL,
  `agente_direccion` varchar(60) NOT NULL,
  `agente_email` varchar(50) NOT NULL,
  `agente_cargo` varchar(20) NOT NULL,
  `agente_perfil` int(11) NOT NULL,
  PRIMARY KEY (`agente_id`),
  UNIQUE KEY `agente_rut` (`agente_rut`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=3 ;

--
-- Volcado de datos para la tabla `tbl_agente`
--

INSERT INTO `tbl_agente` (`agente_id`, `agente_nombre`, `agente_papellido`, `agente_mapellido`, `agente_rut`, `agente_clave`, `agente_telefono`, `agente_celular`, `agente_direccion`, `agente_email`, `agente_cargo`, `agente_perfil`) VALUES
(1, 'Jose', 'Sanchez', 'Sandoval', '18079717-3', '123456', '', '981755792', 'Nueva san martin 1490', 'jose.sanchez.6397@gmail.com', 'Agente', 0),
(2, 'Giovanni', 'Fuentes', '', 'gfuentes', '1234', '', '', '', '', 'Agente', 0);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tbl_cliente`
--

CREATE TABLE IF NOT EXISTS `tbl_cliente` (
  `cliente_id` int(11) NOT NULL AUTO_INCREMENT,
  `cliente_razon_social` varchar(20) NOT NULL,
  `cliente_tipo` varchar(20) NOT NULL,
  `cliente_rut` varchar(20) NOT NULL,
  `cliente_direccion` varchar(50) NOT NULL,
  `cliente_nombre_contacto` varchar(30) NOT NULL,
  `cliente_fono_contacto` varchar(20) NOT NULL,
  `cliente_mail_contacto` varchar(30) NOT NULL,
  `cliente_mail_facturacion` varchar(30) NOT NULL,
  `cliente_centro_costo` varchar(20) NOT NULL,
  PRIMARY KEY (`cliente_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=10 ;

--
-- Volcado de datos para la tabla `tbl_cliente`
--

INSERT INTO `tbl_cliente` (`cliente_id`, `cliente_razon_social`, `cliente_tipo`, `cliente_rut`, `cliente_direccion`, `cliente_nombre_contacto`, `cliente_fono_contacto`, `cliente_mail_contacto`, `cliente_mail_facturacion`, `cliente_centro_costo`) VALUES
(1, 'Falabella', '', '', '', '', '', '', '', ''),
(2, 'Easy', '', '', '', '', '', '', '', ''),
(3, 'Ripley', '', '', '', '', '', '', '', ''),
(4, 'Entel', '', '', '', '', '', '', '', ''),
(5, '1', '1', '11', '1', '1', '1', '1', '1', '1'),
(6, '1', '1', '1', '1', '1', '1', '1', '1', '1'),
(7, '1', 'Convenio', '1', '1', '1', '1', '1', '1', '1'),
(8, '2', '2', '2', '2', '2', '2', '2', '2', '2'),
(9, '1', '1', '1', '1', '1', '1', '1', '11', '1');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tbl_conductor`
--

CREATE TABLE IF NOT EXISTS `tbl_conductor` (
  `conductor_id` int(11) NOT NULL AUTO_INCREMENT,
  `conductor_nombre` varchar(20) NOT NULL,
  `conductor_papellido` varchar(20) NOT NULL,
  `conductor_mapellido` varchar(20) NOT NULL,
  `conductor_rut` varchar(10) NOT NULL,
  `conductor_nick` varchar(20) NOT NULL,
  `conductor_clave` varchar(20) NOT NULL,
  `conductor_estado` int(11) NOT NULL DEFAULT '0',
  `conductor_telefono` varchar(10) NOT NULL,
  `conductor_celular` varchar(20) NOT NULL,
  `conductor_direccion` varchar(50) NOT NULL,
  `conductor_mail` varchar(40) NOT NULL,
  `conductor_tipo_licencia` varchar(3) NOT NULL,
  `conductor_nacimiento` date NOT NULL,
  `conductor_renta` int(11) NOT NULL,
  `conductor_tipo_contrato` varchar(20) NOT NULL,
  `conductor_prevision` varchar(20) NOT NULL,
  `conductor_isapre` varchar(20) NOT NULL,
  `conductor_mutual` varchar(20) NOT NULL,
  `conductor_seguro_inicio` date NOT NULL,
  `conductor_seguro_renovacion` date NOT NULL,
  `conductor_descuento` int(11) NOT NULL,
  `conductor_anticipo` int(11) NOT NULL,
  `conductor_imagen` varchar(50) NOT NULL,
  `conductor_contrato` varchar(50) NOT NULL,
  PRIMARY KEY (`conductor_id`),
  UNIQUE KEY `conductor_rut` (`conductor_rut`)
) ENGINE=MyISAM  DEFAULT CHARSET=latin1 AUTO_INCREMENT=26 ;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tbl_movil`
--

CREATE TABLE IF NOT EXISTS `tbl_movil` (
  `movil_id` int(11) NOT NULL AUTO_INCREMENT,
  `movil_nombre` varchar(20) NOT NULL,
  `movil_transportista` varchar(20) NOT NULL,
  `movil_estado` int(11) NOT NULL,
  `movil_lat` float NOT NULL,
  `movil_last_lat` float NOT NULL,
  `movil_lon` float NOT NULL,
  `movil_last_lon` float NOT NULL,
  `movil_conductor` varchar(20) NOT NULL,
  `movil_ultima_asignacion` datetime NOT NULL,
  PRIMARY KEY (`movil_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=9 ;

--
-- Volcado de datos para la tabla `tbl_movil`
--

INSERT INTO `tbl_movil` (`movil_id`, `movil_nombre`, `movil_transportista`, `movil_estado`, `movil_lat`, `movil_last_lat`, `movil_lon`, `movil_last_lon`, `movil_conductor`, `movil_ultima_asignacion`) VALUES
(1, 'M101', '1', 1, -33.4431, -33.4529, -70.6561, -70.6544, '180797', '2018-11-28 22:23:30'),
(2, 'M102', '1', 1, -33.5174, 0, -70.7759, 0, '', '2018-11-13 00:52:16'),
(3, 'M201', '2', 1, -33.4083, 0, -70.7111, 0, '', '2018-11-13 00:52:16'),
(4, 'M202', '2', 1, -33.4699, 0, -70.5981, 0, '', '2018-11-13 00:52:16'),
(5, 'M301', '3', 1, -33.5403, 0, -70.6673, 0, '', '2018-11-13 00:52:16'),
(6, 'M302', '3', 1, -33.4504, 0, -70.7323, 0, '', '2018-11-13 00:52:16'),
(7, 'M401', '4', 1, -33.3901, 0, -70.5902, 0, '', '2018-11-13 00:52:16'),
(8, 'M402', '4', 1, -33.4337, 0, -70.5398, 0, '', '2018-11-13 00:52:16');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tbl_pasajero`
--

CREATE TABLE IF NOT EXISTS `tbl_pasajero` (
  `pasajero_id` int(11) NOT NULL,
  `pasajero_rut` varchar(10) NOT NULL,
  `pasajero_nombre` varchar(20) NOT NULL,
  `pasajero_papellido` varchar(20) NOT NULL,
  `pasajero_mapellido` varchar(20) NOT NULL,
  `pasajero_cliente` int(11) NOT NULL,
  `pasajero_direccion` varchar(50) NOT NULL,
  `pasajero_telefono` varchar(20) NOT NULL,
  `pasajero_celular` varchar(20) NOT NULL,
  `pasajero_mail` varchar(50) NOT NULL,
  `pasajero_nick` varchar(20) NOT NULL,
  `pasajero_password` varchar(20) NOT NULL,
  `pasajero_estado` int(11) NOT NULL,
  `pasajero_cargo` varchar(20) NOT NULL,
  `pasajero_nivel` varchar(20) NOT NULL,
  UNIQUE KEY `USUARIO_INDEX` (`pasajero_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `tbl_pasajero`
--

INSERT INTO `tbl_pasajero` (`pasajero_id`, `pasajero_rut`, `pasajero_nombre`, `pasajero_papellido`, `pasajero_mapellido`, `pasajero_cliente`, `pasajero_direccion`, `pasajero_telefono`, `pasajero_celular`, `pasajero_mail`, `pasajero_nick`, `pasajero_password`, `pasajero_estado`, `pasajero_cargo`, `pasajero_nivel`) VALUES
(0, '18079717-3', '1', '1', '1', 0, '1', '', '1', '1@1.cl', 'jsanchez', '1', 0, '1', '1');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tbl_servicio`
--

CREATE TABLE IF NOT EXISTS `tbl_servicio` (
  `servicio_id` int(11) NOT NULL AUTO_INCREMENT,
  `servicio_partida` varchar(100) NOT NULL,
  `servicio_partida_id` varchar(200) NOT NULL,
  `servicio_destino` varchar(100) NOT NULL,
  `servicio_destino_id` varchar(200) NOT NULL,
  `servicio_cliente` varchar(20) NOT NULL,
  `servicio_usuario` varchar(20) NOT NULL,
  `servicio_transportista` varchar(20) NOT NULL,
  `servicio_movil` varchar(20) NOT NULL,
  `servicio_tipo` varchar(20) NOT NULL,
  `servicio_tarifa` int(11) NOT NULL,
  `servicio_agente` int(11) NOT NULL,
  `servicio_fecha` datetime NOT NULL,
  `servicio_estado` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`servicio_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=10082 ;

--
-- Volcado de datos para la tabla `tbl_servicio`
--

INSERT INTO `tbl_servicio` (`servicio_id`, `servicio_partida`, `servicio_partida_id`, `servicio_destino`, `servicio_destino_id`, `servicio_cliente`, `servicio_usuario`, `servicio_transportista`, `servicio_movil`, `servicio_tipo`, `servicio_tarifa`, `servicio_agente`, `servicio_fecha`, `servicio_estado`) VALUES
(10060, 'Apurimac+6397%2C+Lo+Prado%2C+Chile', 'Eh5BcHVyaW1hYyA2Mzk3LCBMbyBQcmFkbywgQ2hpbGUiMRIvChQKEgkP-boihcNilhFDu3nf45pXERD9MSoUChIJ21QDMIXDYpYRfpsKvcrvhUc', 'Nueva San MartÃ­n 1490, Santiago, Chile', 'ChIJ5bT_J6bFYpYRHiRy2vysiyU', 'Falabella', 'usuario1', 'T100', 'M102', 'Recogida', 1000, 1, '2018-11-03 00:06:39', 2),
(10061, 'Diagonal+Las+Torres%2C+Penalolen%2C+Pe%C3%B1alol%C3%A9n%2C+Chile', 'EjJEaWFnb25hbCBMYXMgVG9ycmVzLCBQZW5hbG9sZW4sIFBlw7FhbG9sw6luLCBDaGlsZSIuKiwKFAoSCYuJ5cgC0mKWEWovun_yNVvCEhQKEgmTlVHY8NFilhGDD477-oIO3w', 'Santiago, Chile', 'ChIJuzrymgbQYpYRl0jtCfRZnYc', 'Falabella', 'usuario1', 'T100', 'M101', 'Recogida', 1000, 1, '2018-11-03 01:11:23', 1),
(10063, 'Dubl%C3%A9+Almeyda%2C+%C3%91u%C3%B1oa%2C+Chile', 'Eh5EdWJsw6kgQWxtZXlkYSwgw5F1w7FvYSwgQ2hpbGUiLiosChQKEgmn1OLcv89ilhHSStUJPjT3DhIUChIJ6TZN_JTPYpYRRVH-3xZvjZU', 'Providencia%2C+Chile', 'ChIJ92aDbnzPYpYRfI1HCsD874c', 'Falabella', 'usuario1', 'T100', 'M101', 'Recogida', 1000, 1, '2018-11-04 13:15:30', 1),
(10064, 'Providencia%2C+Chile', 'ChIJ92aDbnzPYpYRfI1HCsD874c', 'Santiago+1130%2C+Santiago%2C+Chile', 'ChIJp07fcRTFYpYRnirMRh2R_os', 'Falabella', 'usuario1', 'T100', 'M102', 'Recogida', 1000, 1, '2018-11-04 23:02:12', 0),
(10065, 'Providencia%2C+Chile', 'ChIJ92aDbnzPYpYRfI1HCsD874c', 'Serrano%2C+Santiago%2C+Chile', 'EhhTZXJyYW5vLCBTYW50aWFnbywgQ2hpbGUiLiosChQKEglxygmFDMVilhGJHKMguRQJ9RIUChIJuzrymgbQYpYRl0jtCfRZnYc', 'Falabella', 'usuario1', 'T100', 'M101', 'Recogida', 5000, 1, '2018-11-04 23:13:26', 1),
(10066, 'Agustinas%2C+Santiago%2C+Chile', 'EhpBZ3VzdGluYXMsIFNhbnRpYWdvLCBDaGlsZSIuKiwKFAoSCW8JQrSuxWKWER88UVlbH3foEhQKEgm7OvKaBtBilhGXSO0J9Fmdhw', 'La+Florida%2C+Chile', 'ChIJlZDV7CXRYpYRrPO-VsvmdQM', 'Falabella', 'usuario1', 'T100', 'M101', 'Recogida', 3000, 1, '2018-11-04 23:16:43', 1),
(10067, 'Santiago%2C+Chile', 'ChIJuzrymgbQYpYRl0jtCfRZnYc', 'Recoleta%2C+Chile', 'ChIJk_SSOOTFYpYRJfFRx4V2o_c', 'Falabella', 'usuario1', 'T100', 'M101', 'Recogida', 1000, 1, '2018-11-04 23:28:32', 1),
(10068, 'Apurimac+6397%2C+Lo+Prado%2C+Chile', 'Eh5BcHVyaW1hYyA2Mzk3LCBMbyBQcmFkbywgQ2hpbGUiMRIvChQKEgkP-boihcNilhFDu3nf45pXERD9MSoUChIJ21QDMIXDYpYRfpsKvcrvhUc', 'Nueva+San+Mart%C3%ADn+1490%2C+Santiago%2C+Chile', 'ChIJ5bT_J6bFYpYRHiRy2vysiyU', 'Falabella', 'usuario1', 'T100', 'M101', 'Recogida', 1000, 1, '2018-11-04 23:30:47', 1),
(10076, 'Nueva+San+Mart%EDn%2C+Maip%FA%2C+Regi%F3n+Metropolitana%2C+Chile', 'EiBOdWV2YSBTYW4gTWFydMOtbiwgTWFpcMO6LCBDaGlsZSIuKiwKFAoSCZkhGGg73WKWEXyM_mi-YXLNEhQKEgk_ZyxbKN1ilhFthmyTpZzR_A', 'del+Parque%2C+Huechuraba%2C+Regi%F3n+Metropolitana%2C+Chile', 'Eh1kZWwgUGFycXVlLCBIdWVjaHVyYWJhLCBDaGlsZSIuKiwKFAoSCUcqwaipyGKWESOBTSEzZUUCEhQKEgmnFfI6PcZilhFu3deD0shvnw', 'Falabella', 'usuario1', 'T100', 'M101', 'Servicio Especial', 15000, 0, '2018-11-13 00:40:53', 1),
(10078, 'Trinidad%2C+La+Granja%2C+Chile', 'EhpUcmluaWRhZCwgTGEgR3JhbmphLCBDaGlsZSIuKiwKFAoSCc2cH5S_0GKWEVeHMO1v_GCkEhQKEgnfLSzkfdBilhFjc8E4BPqiXg', 'Yungay%2C+Santiago%2C+Chile', 'EhdZdW5nYXksIFNhbnRpYWdvLCBDaGlsZSIuKiwKFAoSCVWhJxZKxGKWEdIkAMQTeuYtEhQKEgm7OvKaBtBilhGXSO0J9Fmdhw', 'Falabella', 'usuario1', 'T100', 'M101', 'Recogida', 5000, 0, '2018-11-17 13:19:09', 0),
(10079, 'Estaci%C3%B3n+Central%2C+Santiago%2C+Estaci%C3%B3n+Central%2C+Chile', 'ChIJBYDLpPfEYpYR906xHC-Kpd4', 'Quilicura%2C+Chile', 'ChIJ_9A-D-XAYpYR0Ovj-IzhwXg', 'Falabella', 'usuario1', 'T100', 'M101', 'Recogida', 1000, 0, '2018-11-17 13:23:43', 0),
(10080, 'Golf+Lomas+de+La+Dehesa+DEHESA%2C+Lo+Barnechea%2C+Chile', 'ChIJ0cEmU4LJYpYRxBcrO2k6U2I', 'Zenteno%2C+Santiago%2C+Chile', 'EhhaZW50ZW5vLCBTYW50aWFnbywgQ2hpbGUiLiosChQKEgmNcfMAEsVilhEbf5cbecO2zBIUChIJuzrymgbQYpYRl0jtCfRZnYc', 'Falabella', 'usuario1', 'T100', 'M101', 'Recogida', 3000, 0, '2018-11-17 13:26:11', 0),
(10081, 'Ccu+Renca+-+Alberto+Pepper%2C+Renca%2C+Chile', 'ChIJg-Zqvp3GYpYRJIEU_BDKsdE', 'Agustinas%2C+Santiago%2C+Chile', 'EhpBZ3VzdGluYXMsIFNhbnRpYWdvLCBDaGlsZSIuKiwKFAoSCW8JQrSuxWKWER88UVlbH3foEhQKEgm7OvKaBtBilhGXSO0J9Fmdhw', 'Falabella', 'usuario1', 'T100', 'M101', 'Recogida', 1000, 0, '2018-11-28 22:23:29', 0);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tbl_transportista`
--

CREATE TABLE IF NOT EXISTS `tbl_transportista` (
  `transportista_id` int(11) NOT NULL AUTO_INCREMENT,
  `transportista_nombre` varchar(20) NOT NULL,
  PRIMARY KEY (`transportista_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=5 ;

--
-- Volcado de datos para la tabla `tbl_transportista`
--

INSERT INTO `tbl_transportista` (`transportista_id`, `transportista_nombre`) VALUES
(1, 'T100'),
(2, 'T200'),
(3, 'T300'),
(4, 'T400');

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
