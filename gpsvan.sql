-- phpMyAdmin SQL Dump
-- version 3.5.1
-- http://www.phpmyadmin.net
--
-- Servidor: localhost
-- Tiempo de generación: 10-10-2018 a las 13:03:11
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
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=7 ;

--
-- Volcado de datos para la tabla `tbl_cliente`
--

INSERT INTO `tbl_cliente` (`cliente_id`, `cliente_razon_social`, `cliente_tipo`, `cliente_rut`, `cliente_direccion`, `cliente_nombre_contacto`, `cliente_fono_contacto`, `cliente_mail_contacto`, `cliente_mail_facturacion`, `cliente_centro_costo`) VALUES
(1, 'Falabella', '', '', '', '', '', '', '', ''),
(2, 'Easy', '', '', '', '', '', '', '', ''),
(3, 'Ripley', '', '', '', '', '', '', '', ''),
(4, 'Entel', '', '', '', '', '', '', '', ''),
(5, '1', '1', '11', '1', '1', '1', '1', '1', '1'),
(6, '1', '1', '1', '1', '1', '1', '1', '1', '1');

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
  PRIMARY KEY (`conductor_id`)
) ENGINE=MyISAM  DEFAULT CHARSET=latin1 AUTO_INCREMENT=4 ;

--
-- Volcado de datos para la tabla `tbl_conductor`
--

INSERT INTO `tbl_conductor` (`conductor_id`, `conductor_nombre`, `conductor_papellido`, `conductor_mapellido`, `conductor_rut`, `conductor_telefono`, `conductor_celular`, `conductor_direccion`, `conductor_mail`, `conductor_tipo_licencia`, `conductor_nacimiento`, `conductor_renta`, `conductor_tipo_contrato`, `conductor_prevision`, `conductor_isapre`, `conductor_mutual`, `conductor_seguro_inicio`, `conductor_seguro_renovacion`, `conductor_descuento`, `conductor_anticipo`) VALUES
(1, 'Jose', 'Sanchez', 'Sandoval', '180797', '11111', '22222', '44444', '333333', 'A1', '2018-01-01', 1, 'Indefinido', 'Modelo', 'BanmÃ©dica', '1', '2018-01-01', '2018-01-01', 2, 1),
(2, '1', '1', '1', '1', '1', '1', '1', '1', 'A1', '0000-00-00', 1, 'Indefinido', 'Capital', 'BanmÃ©dica', '1', '0000-00-00', '0000-00-00', 1, 2),
(3, '2', '2', '2', '2', '2', '2', '2', '2', 'A2', '0000-00-00', 1, 'Indefinido', '1', '1', '1', '0000-00-00', '0000-00-00', 1, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tbl_movil`
--

CREATE TABLE IF NOT EXISTS `tbl_movil` (
  `movil_id` int(11) NOT NULL AUTO_INCREMENT,
  `movil_nombre` varchar(20) NOT NULL,
  `movil_transportista` int(11) NOT NULL,
  `movil_estado` int(11) NOT NULL,
  PRIMARY KEY (`movil_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=9 ;

--
-- Volcado de datos para la tabla `tbl_movil`
--

INSERT INTO `tbl_movil` (`movil_id`, `movil_nombre`, `movil_transportista`, `movil_estado`) VALUES
(1, 'M101', 1, 0),
(2, 'M102', 1, 0),
(3, 'M201', 2, 0),
(4, 'M202', 2, 0),
(5, 'M301', 3, 0),
(6, 'M302', 3, 0),
(7, 'M401', 4, 0),
(8, 'M402', 4, 0);

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
  `servicio_cliente` int(11) NOT NULL,
  `servicio_usuario` int(11) NOT NULL,
  `servicio_transportista` int(11) NOT NULL,
  `servicio_movil` int(11) NOT NULL,
  `servicio_tipo` varchar(20) NOT NULL,
  `servicio_tarifa` int(11) NOT NULL,
  `servicio_agente` int(11) NOT NULL,
  `servicio_fecha` datetime NOT NULL,
  PRIMARY KEY (`servicio_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=10036 ;

--
-- Volcado de datos para la tabla `tbl_servicio`
--

INSERT INTO `tbl_servicio` (`servicio_id`, `servicio_partida`, `servicio_partida_id`, `servicio_destino`, `servicio_destino_id`, `servicio_cliente`, `servicio_usuario`, `servicio_transportista`, `servicio_movil`, `servicio_tipo`, `servicio_tarifa`, `servicio_agente`, `servicio_fecha`) VALUES
(10006, 'Nueva San MartÃ­n, Santiago, Chile', 'EiJOdWV2YSBTYW4gTWFydMOtbiwgU2FudGlhZ28sIENoaWxl', 'Carmen FariÃ±a, Vitacura, Chile', 'Eh9DYXJtZW4gRmFyacOxYSwgVml0YWN1cmEsIENoaWxl', 1, 2, 1, 1, 'Recogida', 5000, 1, '2018-10-10 00:06:39'),
(10007, 'General Juan BuendÃ­a, Lo Prado, Chile', 'EiZHZW5lcmFsIEp1YW4gQnVlbmTDrWEsIExvIFByYWRvLCBDaGlsZQ', 'IPChile Toesca - Toesca, Santiago, Chile', 'ChIJQ-CO7_3EYpYRN3dYY-i6Bn4', 1, 1, 1, 1, 'Recogida', 1000, 1, '2018-10-10 00:56:56'),
(10008, 'Gran Avenida Jose Miguel Carrera, San Miguel, Chile', 'EjNHcmFuIEF2ZW5pZGEgSm9zZSBNaWd1ZWwgQ2FycmVyYSwgU2FuIE1pZ3VlbCwgQ2hpbGU', 'Williams Rebolledo, Ã‘uÃ±oa, Chile', 'EiJXaWxsaWFtcyBSZWJvbGxlZG8sIMORdcOxb2EsIENoaWxl', 1, 1, 1, 1, 'Recogida', 5000, 1, '2018-10-10 01:05:11'),
(10009, 'Franklin, Santiago, Chile', 'ChIJGfaJvDnFYpYRQsNvc9HVzRo', 'Orrego Luco, Providencia, Chile', 'Eh9PcnJlZ28gTHVjbywgUHJvdmlkZW5jaWEsIENoaWxl', 1, 1, 2, 4, 'Reparto', 10000, 1, '2018-10-10 01:06:26'),
(10010, 'La Moneda, Santiago, Chile', 'ChIJoSQGpKfFYpYRZzryLThoNMw', 'Renca, Chile', 'ChIJ07zrFq7GYpYRT6VwiNiJFOk', 2, 4, 2, 4, 'Reparto', 10000, 1, '2018-10-10 01:07:34'),
(10011, 'JosÃ© Victorino Lastarria, Santiago, Chile', 'EipKb3PDqSBWaWN0b3Jpbm8gTGFzdGFycmlhLCBTYW50aWFnbywgQ2hpbGU', 'Universidad de Chile, Santiago, Chile', 'ChIJd1lK26DFYpYR2LW16VB1Wgs', 2, 4, 2, 3, 'Servicio Especial', 99999, 1, '2018-10-10 01:10:16'),
(10012, 'Vitacura, Chile', 'ChIJT8_5sTbPYpYRC7nDhONM9KY', 'Quilicura, Chile', 'ChIJ_9A-D-XAYpYR0Ovj-IzhwXg', 1, 2, 2, 4, 'Reparto', 10000, 1, '2018-10-10 01:11:24'),
(10013, 'Zenteno, Santiago, Chile', 'EhhaZW50ZW5vLCBTYW50aWFnbywgQ2hpbGU', 'Quinta Normal, Santiago, Chile', 'Eh5RdWludGEgTm9ybWFsLCBTYW50aWFnbywgQ2hpbGU', 1, 1, 4, 7, 'Reparto', 10000, 1, '2018-10-10 01:20:38'),
(10014, 'BBVA Chile santiago san pablo - Moneda, Santiago, Chile', 'ChIJbT9yP6HFYpYRD0w-td_ao3c', 'Ã‘uÃ±oa, Chile', 'ChIJ6TZN_JTPYpYRRVH-3xZvjZU', 1, 1, 3, 6, 'Recogida', 15000, 1, '2018-10-10 01:21:49'),
(10015, 'Vergara, Santiago, Chile', 'EhhWZXJnYXJhLCBTYW50aWFnbywgQ2hpbGU', 'Fray Camilo HenrÃ­quez, Santiago, Chile', 'EidGcmF5IENhbWlsbyBIZW5yw61xdWV6LCBTYW50aWFnbywgQ2hpbGU', 1, 1, 1, 1, 'Recogida', 10000, 1, '2018-10-10 02:18:38'),
(10016, 'ConchalÃ­, Chile', 'ChIJxyOCvX7IYpYRMRlejPtrhGM', 'San Diego, Santiago, Chile', 'EhpTYW4gRGllZ28sIFNhbnRpYWdvLCBDaGlsZQ', 1, 1, 1, 1, 'Recogida', 1000, 1, '2018-10-10 02:19:12'),
(10017, 'ConchalÃ­, Chile', 'ChIJxyOCvX7IYpYRMRlejPtrhGM', 'San Diego, Santiago, Chile', 'EhpTYW4gRGllZ28sIFNhbnRpYWdvLCBDaGlsZQ', 1, 1, 1, 1, 'Recogida', 1000, 1, '2018-10-10 02:19:59'),
(10018, 'del Parque, Huechuraba, Chile', 'Eh1kZWwgUGFycXVlLCBIdWVjaHVyYWJhLCBDaGlsZQ', 'Vitacura, Chile', 'ChIJT8_5sTbPYpYRC7nDhONM9KY', 1, 1, 2, 3, 'Recogida', 5000, 1, '2018-10-10 02:20:31'),
(10019, 'Diagonal Las Torres, Penalolen, PeÃ±alolÃ©n, Chile', 'EjJEaWFnb25hbCBMYXMgVG9ycmVzLCBQZW5hbG9sZW4sIFBlw7FhbG9sw6luLCBDaGlsZQ', 'San Pablo, Quinta Normal, Chile', 'Eh9TYW4gUGFibG8sIFF1aW50YSBOb3JtYWwsIENoaWxl', 1, 1, 1, 1, 'Recogida', 10000, 1, '2018-10-10 07:02:04'),
(10020, 'Diagonal Las Torres, Penalolen, PeÃ±alolÃ©n, Chile', 'EjJEaWFnb25hbCBMYXMgVG9ycmVzLCBQZW5hbG9sZW4sIFBlw7FhbG9sw6luLCBDaGlsZQ', 'San Pablo, Quinta Normal, Chile', 'Eh9TYW4gUGFibG8sIFF1aW50YSBOb3JtYWwsIENoaWxl', 1, 1, 1, 1, 'Recogida', 10000, 1, '2018-10-10 07:02:29'),
(10021, 'Syngenta - Avenida Vitacura, Las Condes, Chile', 'ChIJVSHLtEbPYpYRfe_dsy0bkWQ', 'Qw - Gran Avenida Jose Miguel Carrera, San Miguel, Santiago, Chile', 'ChIJr3ql4FXaYpYRSE9dyji4vjc', 1, 1, 1, 1, 'Recogida', 10000, 1, '2018-10-10 07:05:40'),
(10022, 'Syngenta - Avenida Vitacura, Las Condes, Chile', 'ChIJVSHLtEbPYpYRfe_dsy0bkWQ', 'Qw - Gran Avenida Jose Miguel Carrera, San Miguel, Santiago, Chile', 'ChIJr3ql4FXaYpYRSE9dyji4vjc', 1, 1, 1, 1, 'Recogida', 10000, 1, '2018-10-10 07:05:55'),
(10023, 'Zapadores, Recoleta, Chile', 'ChIJsQL3gQ3GYpYRy4f8qb6-qHM', 'Xs Market, Santiago, EstaciÃ³n Central, Chile', 'ChIJBYDLpPfEYpYRO1VLelVYpQc', 2, 3, 2, 4, 'Recogida', 3000, 1, '2018-10-10 07:09:44'),
(10024, 'Zapadores, Recoleta, Chile', 'ChIJsQL3gQ3GYpYRy4f8qb6-qHM', 'Xs Market, Santiago, EstaciÃ³n Central, Chile', 'ChIJBYDLpPfEYpYRO1VLelVYpQc', 2, 3, 2, 4, 'Recogida', 3000, 1, '2018-10-10 07:09:54'),
(10025, 'Ffc Ingenieria y Construccion - San Diego, Santiago, Chile', 'ChIJ-wm-BxXFYpYRgA2kMzTf3cQ', 'D.D.M. Impresores Limitada - Arturo Prat, Santiago, Chile', 'ChIJhZ0GTArFYpYR1rcPIE5iO_E', 1, 1, 1, 1, 'Reparto', 15000, 1, '2018-10-10 07:10:42'),
(10026, 'Xs Market, Santiago, EstaciÃ³n Central, Chile', 'ChIJBYDLpPfEYpYRO1VLelVYpQc', 'DublÃ© Almeyda, Ã‘uÃ±oa, Chile', 'Eh5EdWJsw6kgQWxtZXlkYSwgw5F1w7FvYSwgQ2hpbGU', 1, 1, 1, 1, 'Recogida', 1000, 1, '2018-10-10 07:14:04'),
(10027, 'del Parque, Huechuraba, Chile', 'Eh1kZWwgUGFycXVlLCBIdWVjaHVyYWJhLCBDaGlsZQ', 'Dorsal, Recoleta, Chile', 'ChIJkb2fdwvGYpYRrIMZf3_BOwU', 1, 1, 1, 1, 'Recogida', 5000, 1, '2018-10-10 07:15:00'),
(10028, 'ZoolÃ³gico Nacional - PÃ­o Nono, Providencia, Chile', 'ChIJ74j6LJDFYpYRiBjqRDUcsEM', 'ConchalÃ­, Chile', 'ChIJxyOCvX7IYpYRMRlejPtrhGM', 1, 1, 1, 1, 'Reparto', 7000, 1, '2018-10-10 07:16:28'),
(10029, 'Ingenierias Asd - Monjitas, Santiago, Chile', 'ChIJzQHPX5jFYpYR_AdYNYARQkY', 'Qwerti Consultores Spa - Longitudinal Sur, La Florida, Chile', 'ChIJoxj0Ot_TYpYRv8rOZFNTrx0', 1, 1, 1, 1, 'Recogida', 1000, 1, '2018-10-10 07:18:08'),
(10030, 'La Florida, Chile', 'ChIJlZDV7CXRYpYRrPO-VsvmdQM', 'Obispo Javier VÃ¡squez, Santiago, EstaciÃ³n Central, Chile', 'EjpPYmlzcG8gSmF2aWVyIFbDoXNxdWV6LCBTYW50aWFnbywgRXN0YWNpw7NuIENlbnRyYWwsIENoaWxl', 1, 1, 1, 1, 'Recogida', 1000, 1, '2018-10-10 07:19:31'),
(10031, 'Quinta Normal, Chile', 'ChIJnePXWBDEYpYRGQ68gdAXWGg', 'Williams Rebolledo, Ã‘uÃ±oa, Chile', 'EiJXaWxsaWFtcyBSZWJvbGxlZG8sIMORdcOxb2EsIENoaWxl', 1, 1, 3, 5, 'Reparto', 5000, 1, '2018-10-10 07:20:21'),
(10032, 'Xiaomi CHILE - Concordia, Providencia, Chile', 'ChIJG_HyEG_PYpYRT0p4Qwz42GY', 'Ã‘uÃ±oa, Chile', 'ChIJ6TZN_JTPYpYRRVH-3xZvjZU', 2, 3, 2, 3, 'Recogida', 1000, 1, '2018-10-10 07:21:07'),
(10033, 'FFV - Isidora Goyenechea, Las Condes, Chile', 'ChIJ5-aeET7PYpYROZj4ERB2JMw', 'Posta Central - Avenida Portugal, Santiago, Chile', 'ChIJe-Ejip3FYpYRUw0ILXsb0vc', 1, 1, 2, 4, 'Reparto', 15000, 1, '2018-10-10 07:22:50'),
(10034, 'Alameda, Santiago, EstaciÃ³n Central, Chile', 'ChIJoy5dZfjEYpYRv_gWKJBK1FY', 'Moneda, Santiago, Chile', 'EhdNb25lZGEsIFNhbnRpYWdvLCBDaGlsZQ', 1, 1, 1, 1, 'Reparto', 3000, 1, '2018-10-10 07:30:01'),
(10035, 'Avenida+Libertador+Bernardo+O%27Higgins%2C+Santiago%2C+Chile', 'EjZBdmVuaWRhIExpYmVydGFkb3IgQmVybmFyZG8gTydIaWdnaW5zLCBTYW50aWFnbywgQ2hpbGU', 'Santiago, Chile', 'ChIJL68lBEHFYpYRMQkPQDzVdYQ', 1, 1, 1, 1, 'Reparto', 7000, 1, '2018-10-10 07:33:23');

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

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tbl_usuario`
--

CREATE TABLE IF NOT EXISTS `tbl_usuario` (
  `usuario_id` int(11) NOT NULL,
  `usuario_nombre` varchar(20) NOT NULL,
  `usuario_cliente` int(11) NOT NULL,
  UNIQUE KEY `USUARIO_INDEX` (`usuario_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `tbl_usuario`
--

INSERT INTO `tbl_usuario` (`usuario_id`, `usuario_nombre`, `usuario_cliente`) VALUES
(1, 'usuario1', 1),
(2, 'usuario2', 1),
(3, 'usuario3', 2),
(4, 'usuario4', 2),
(5, 'usuario5', 3),
(6, 'usuario6', 3),
(7, 'usuario7', 4),
(8, 'usuario8', 4);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
