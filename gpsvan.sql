-- phpMyAdmin SQL Dump
-- version 4.8.3
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1:3306
-- Tiempo de generación: 08-10-2018 a las 23:26:38
-- Versión del servidor: 5.7.23
-- Versión de PHP: 7.2.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `gpsvan`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tbl_agente`
--

DROP TABLE IF EXISTS `tbl_agente`;
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
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;

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

DROP TABLE IF EXISTS `tbl_cliente`;
CREATE TABLE IF NOT EXISTS `tbl_cliente` (
  `cliente_id` int(11) NOT NULL AUTO_INCREMENT,
  `cliente_nombre` varchar(20) NOT NULL,
  PRIMARY KEY (`cliente_id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `tbl_cliente`
--

INSERT INTO `tbl_cliente` (`cliente_id`, `cliente_nombre`) VALUES
(1, 'Falabella'),
(2, 'Easy'),
(3, 'Ripley'),
(4, 'Entel');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tbl_conductor`
--

DROP TABLE IF EXISTS `tbl_conductor`;
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
  `cunductor_seguro_renovacion` date NOT NULL,
  `conductor_descuento` int(11) NOT NULL,
  `conductor_anticipo` int(11) NOT NULL,
  PRIMARY KEY (`conductor_id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tbl_movil`
--

DROP TABLE IF EXISTS `tbl_movil`;
CREATE TABLE IF NOT EXISTS `tbl_movil` (
  `movil_id` int(11) NOT NULL AUTO_INCREMENT,
  `movil_nombre` varchar(20) NOT NULL,
  `movil_transportista` int(11) NOT NULL,
  `movil_estado` int(11) NOT NULL,
  PRIMARY KEY (`movil_id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=latin1;

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

DROP TABLE IF EXISTS `tbl_servicio`;
CREATE TABLE IF NOT EXISTS `tbl_servicio` (
  `servicio_id` int(11) NOT NULL AUTO_INCREMENT,
  `servicio_partida` varchar(100) NOT NULL,
  `servicio_destino` varchar(100) NOT NULL,
  `servicio_cliente` int(11) NOT NULL,
  `servicio_usuario` int(11) NOT NULL,
  `servicio_transportista` int(11) NOT NULL,
  `servicio_movil` int(11) NOT NULL,
  `servicio_tipo` varchar(20) NOT NULL,
  `servicio_tarifa` int(11) NOT NULL,
  `servicio_agente` int(11) NOT NULL,
  `servicio_fecha` datetime NOT NULL,
  PRIMARY KEY (`servicio_id`)
) ENGINE=InnoDB AUTO_INCREMENT=10006 DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `tbl_servicio`
--

INSERT INTO `tbl_servicio` (`servicio_id`, `servicio_partida`, `servicio_destino`, `servicio_cliente`, `servicio_usuario`, `servicio_transportista`, `servicio_movil`, `servicio_tipo`, `servicio_tarifa`, `servicio_agente`, `servicio_fecha`) VALUES
(10000, 'san martin 40', 'san ignacio 23', 1, 1, 1, 2, '', 15000, 2, '0000-00-00 00:00:00'),
(10001, '1', '1', 1, 1, 1, 1, '', 1000, 1, '0000-00-00 00:00:00'),
(10002, '1', '1', 1, 1, 1, 1, 'Recogida', 5000, 1, '2018-10-06 00:00:00'),
(10003, '1Q', 'VB', 1, 1, 1, 1, 'Recogida', 1000, 1, '2018-10-06 18:07:22'),
(10004, '1Q', 'VB', 1, 1, 1, 1, 'Recogidahhhhhhhhhhhh', 1000, 1, '2018-10-06 18:08:03'),
(10005, '111', '222', 1, 1, 1, 1, 'Recogida', 7000, 1, '2018-10-07 18:47:49');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tbl_transportista`
--

DROP TABLE IF EXISTS `tbl_transportista`;
CREATE TABLE IF NOT EXISTS `tbl_transportista` (
  `transportista_id` int(11) NOT NULL AUTO_INCREMENT,
  `transportista_nombre` varchar(20) NOT NULL,
  PRIMARY KEY (`transportista_id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;

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

DROP TABLE IF EXISTS `tbl_usuario`;
CREATE TABLE IF NOT EXISTS `tbl_usuario` (
  `usuario_id` int(11) NOT NULL,
  `usuario_nombre` varchar(20) NOT NULL,
  `usuario_cliente` int(11) NOT NULL
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
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
