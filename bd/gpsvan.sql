-- phpMyAdmin SQL Dump
-- version 3.5.1
-- http://www.phpmyadmin.net
--
-- Servidor: localhost
-- Tiempo de generación: 24-12-2018 a las 05:05:41
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
  `agente_nick` varchar(20) NOT NULL,
  `agente_clave` varchar(20) NOT NULL,
  `agente_telefono` varchar(15) NOT NULL,
  `agente_celular` varchar(15) NOT NULL,
  `agente_direccion` varchar(60) NOT NULL,
  `agente_mail` varchar(50) NOT NULL,
  `agente_cargo` varchar(20) NOT NULL,
  `agente_perfil` varchar(20) NOT NULL,
  PRIMARY KEY (`agente_id`),
  UNIQUE KEY `agente_rut` (`agente_rut`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=2 ;

--
-- Volcado de datos para la tabla `tbl_agente`
--

INSERT INTO `tbl_agente` (`agente_id`, `agente_nombre`, `agente_papellido`, `agente_mapellido`, `agente_rut`, `agente_nick`, `agente_clave`, `agente_telefono`, `agente_celular`, `agente_direccion`, `agente_mail`, `agente_cargo`, `agente_perfil`) VALUES
(1, 'Usuario', 'Prueba', 'Prueba', '12911893-8', 'admin', 'admin', '1111111', '11111111', 'av las torres 123', 'prueba@prueba.cl', 'administrador', 'Administrador');

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
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=24 ;

--
-- Volcado de datos para la tabla `tbl_cliente`
--

INSERT INTO `tbl_cliente` (`cliente_id`, `cliente_razon_social`, `cliente_tipo`, `cliente_rut`, `cliente_direccion`, `cliente_nombre_contacto`, `cliente_fono_contacto`, `cliente_mail_contacto`, `cliente_mail_facturacion`, `cliente_centro_costo`) VALUES
(22, '2', '2', '18079717-3', '2q2', '2', '2', '2@2.cl', '2@2.cl', 'e'),
(23, '2', '2', '18079717-3', '2q2', '2', '2', '2@2.cl', '2@2.cl', 'e');

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
  `conductor_movil` varchar(11) NOT NULL,
  `conductor_transportista` int(11) NOT NULL,
  PRIMARY KEY (`conductor_id`),
  UNIQUE KEY `conductor_rut` (`conductor_rut`)
) ENGINE=MyISAM  DEFAULT CHARSET=latin1 AUTO_INCREMENT=38 ;

--
-- Volcado de datos para la tabla `tbl_conductor`
--

INSERT INTO `tbl_conductor` (`conductor_id`, `conductor_nombre`, `conductor_papellido`, `conductor_mapellido`, `conductor_rut`, `conductor_nick`, `conductor_clave`, `conductor_estado`, `conductor_telefono`, `conductor_celular`, `conductor_direccion`, `conductor_mail`, `conductor_tipo_licencia`, `conductor_nacimiento`, `conductor_renta`, `conductor_tipo_contrato`, `conductor_prevision`, `conductor_isapre`, `conductor_mutual`, `conductor_seguro_inicio`, `conductor_seguro_renovacion`, `conductor_descuento`, `conductor_anticipo`, `conductor_imagen`, `conductor_contrato`, `conductor_movil`, `conductor_transportista`) VALUES
(29, 'Benjamn', 'Gonzalez', 'MuÃ±oz', '17776140-0', 'bgonzalez', 'bgonzalez', 0, '2234343333', '895545333', 'Av las condes 123', 'bgonzales@gmail.com', 'A1', '1970-01-01', 500000, 'Indefinido', 'Modelo', 'BanmÃ©dica', '10', '2018-02-12', '2019-02-12', 20, 0, 'hombre.png', '', 'XXXX-00', 11),
(30, 'Marta', 'Sanchez', 'Vergara', '5478515-1', 'msanchez', 'msanchez', 0, '222222222', '987654321', 'Av suiza 123', 'marta@gmail.com', 'A2', '1998-12-11', 500000, 'Plazo fijo', 'Capital', 'Colmena Golden Cross', '10', '1970-01-01', '2018-12-04', 12, 9000, 'mujer.png', '', 'XXXX-01', 0),
(31, 'Osvaldo', 'Matinez', 'Osores', '8154148-5', 'omartinez', 'omartinez', 0, '223434322', '98554522', 'Av mirador 33', 'osv@gmail.com', 'B', '1970-01-01', 100000, 'Plazo fijo', 'Capital', 'BanmÃ©dica', '78', '2018-12-10', '2018-12-12', 89, 6666, 'hombre.png', '', 'XXXX-02', 11),
(32, 'Natalia', 'Soto', 'Peralta', '10083957-1', 'nsoto', 'nsoto', 0, '', '98763454', 'Av peru 543', 'nsoto@entel.cl', 'A3', '1970-01-01', 80000, 'Indefinido', 'Modelo', 'BanmÃ©dica', '88', '1970-01-01', '2018-12-07', 7, 7000, 'mujer.png', '', 'XXXX-03', 0),
(33, 'Manuel', 'Guerra', 'Martinez', '23799224-5', 'mguerra', 'mguerra', 0, '223333333', '987655555', 'Av los presidentes 123', 'mguerra@gmail.com', 'A1', '2018-12-09', 120000, 'Indefinido', 'Modelo', 'BanmÃ©dica', '100', '1970-01-01', '2018-12-12', 45, 5000, 'hombre.png', '', 'XXXX-04', 0),
(34, 'Nicole', 'Matta', 'Matta', '17321421-9', 'nmatta', 'nmatta', 0, '', '987654321', 'Av fuzeta 222', 'nmatta@gmail.com', 'A3', '1970-01-01', 100000, 'Indefinido', 'Modelo', 'BanmÃ©dica', '22', '2018-04-12', '1970-01-01', 22, 5000, 'mujer.png', '', 'XXXX-05', 0),
(35, 'Ricardo', 'Lopez', 'Bas', '17576554-9', 'rlopez', 'rlopez', 0, '2233343434', '98765666', 'Av las rejas 234', 'rlopez@gmail.com', 'A2', '1970-01-01', 40000, 'Indefinido', 'Modelo', 'BanmÃ©dica', '2', '1970-01-01', '1970-01-01', 45, 6000, 'hombre.png', '', 'XXXX-06', 0),
(37, 'Mauel', 'Soto', 'Vegara', '13814267-1', 'msoto', 'msoto', 0, '224444444', '9875555434', 'Av los valles', 'msoto@gmail.com', 'A1', '1970-01-01', 1000, 'Indefinido', 'Modelo', 'Colmena Golden Cross', '3', '2018-12-03', '1970-01-01', 45, 60000, 'hombre.png', '', 'XXXX-07', 0);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tbl_movil`
--

CREATE TABLE IF NOT EXISTS `tbl_movil` (
  `movil_id` int(11) NOT NULL AUTO_INCREMENT,
  `movil_nombre` varchar(20) NOT NULL,
  `movil_patente` varchar(10) NOT NULL,
  `movil_marca` varchar(20) NOT NULL,
  `movil_modelo` varchar(20) NOT NULL,
  `movil_anio` int(11) NOT NULL,
  `movil_venc_rev_tecnica` date NOT NULL,
  `movil_seguro_obligatorio` varchar(20) NOT NULL,
  `movil_venc_seguro_obligatorio` date NOT NULL,
  `movil_seguro_adicional` varchar(20) NOT NULL,
  `movil_kilometraje` int(7) NOT NULL,
  `movil_transportista` varchar(20) NOT NULL,
  `movil_estado` int(11) NOT NULL,
  `movil_lat` float NOT NULL,
  `movil_last_lat` float NOT NULL,
  `movil_lon` float NOT NULL,
  `movil_last_lon` float NOT NULL,
  `movil_conductor` varchar(20) NOT NULL,
  `movil_ultima_asignacion` datetime NOT NULL,
  `movil_servicio` varchar(10) NOT NULL,
  PRIMARY KEY (`movil_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=31 ;

--
-- Volcado de datos para la tabla `tbl_movil`
--

INSERT INTO `tbl_movil` (`movil_id`, `movil_nombre`, `movil_patente`, `movil_marca`, `movil_modelo`, `movil_anio`, `movil_venc_rev_tecnica`, `movil_seguro_obligatorio`, `movil_venc_seguro_obligatorio`, `movil_seguro_adicional`, `movil_kilometraje`, `movil_transportista`, `movil_estado`, `movil_lat`, `movil_last_lat`, `movil_lon`, `movil_last_lon`, `movil_conductor`, `movil_ultima_asignacion`, `movil_servicio`) VALUES
(22, 'M101', 'XXXX-00', 'Chevrolet', 'Camario', 2018, '1970-01-01', 'Municipal', '2018-04-12', 'No', 0, '0', 0, 0, 0, 0, 0, '0', '2018-12-23 14:06:46', '0'),
(23, 'M102', 'XXXX-01', 'Audi', 'R8', 2018, '2018-04-12', 'Municipal', '1970-01-01', 'No', 0, '0', 0, 0, 0, 0, 0, '0', '2018-12-23 14:09:27', '0'),
(24, 'M201', 'XXXX-02', 'Mercedes', 'Clase C', 2018, '1970-01-01', 'Municipal', '2018-06-12', 'Si', 10, '0', 0, 0, 0, 0, 0, '0', '2018-12-23 14:10:07', '0'),
(25, 'M202', 'XXXX-03', 'Hyundai', 'Accent', 2018, '1970-01-01', 'Privado', '2018-11-12', '', 0, '0', 0, 0, 0, 0, 0, '0', '2018-12-23 14:10:55', '0'),
(26, 'M301', 'XXXX-04', 'Chevrolet', 'Sail', 2019, '1970-01-01', 'Municipal', '2018-11-12', 'Si', 23, '0', 0, 0, 0, 0, 0, '0', '2018-12-23 14:11:42', '0'),
(27, 'M302', 'XXXX-05', 'Ford', 'Fiesta', 2018, '1970-01-01', 'NO', '2018-04-12', '', 0, '0', 0, 0, 0, 0, 0, '0', '2018-12-23 14:13:01', '0'),
(28, 'M401', 'XXXX-06', 'Kia', 'Rio', 2018, '2018-03-12', 'Municipal', '2018-04-12', '', 0, '0', 0, 0, 0, 0, 0, '0', '2018-12-23 14:21:25', '0'),
(29, 'M402', 'XXXX-07', 'Renault', 'Clio', 2018, '1970-01-01', 'Privado', '2018-12-12', '', 0, '0', 0, 0, 0, 0, 0, '0', '2018-12-23 14:22:22', '0'),
(30, 'Independiente', 'QQQQ-11', 'nose', 'nose', 2010, '1970-01-01', 'Municipal', '2018-03-12', 'Privado', 100, '12', 0, 0, 0, 0, 0, '0', '2018-12-23 21:03:16', '0');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tbl_pasajero`
--

CREATE TABLE IF NOT EXISTS `tbl_pasajero` (
  `pasajero_id` int(11) NOT NULL AUTO_INCREMENT,
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
  PRIMARY KEY (`pasajero_id`),
  UNIQUE KEY `USUARIO_INDEX` (`pasajero_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=2 ;

--
-- Volcado de datos para la tabla `tbl_pasajero`
--

INSERT INTO `tbl_pasajero` (`pasajero_id`, `pasajero_rut`, `pasajero_nombre`, `pasajero_papellido`, `pasajero_mapellido`, `pasajero_cliente`, `pasajero_direccion`, `pasajero_telefono`, `pasajero_celular`, `pasajero_mail`, `pasajero_nick`, `pasajero_password`, `pasajero_estado`, `pasajero_cargo`, `pasajero_nivel`) VALUES
(1, '18079717-3', '1', '1', '1', 0, '1', '1', '1', '1@1.cl', '1', '1', 0, '1', '0');

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
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=10092 ;

--
-- Volcado de datos para la tabla `tbl_servicio`
--

INSERT INTO `tbl_servicio` (`servicio_id`, `servicio_partida`, `servicio_partida_id`, `servicio_destino`, `servicio_destino_id`, `servicio_cliente`, `servicio_usuario`, `servicio_transportista`, `servicio_movil`, `servicio_tipo`, `servicio_tarifa`, `servicio_agente`, `servicio_fecha`, `servicio_estado`) VALUES
(10088, 'Fonasa+-+Monjitas%2C+Santiago%2C+Chile', '', 'Diagonal+Cervantes%2C+Santiago%2C+Chile', '', '1', '1', '1', '1', '1', 1, 1, '2018-12-23 02:42:02', 0),
(10089, 'General+Mackenna%2C+Santiago%2C+Chile', '', 'Jos%C3%A9+Victorino+Lastarria%2C+Santiago%2C+Chile', '', '1', '1', '1', '1', '1', 1, 1, '2018-12-23 02:44:05', 0),
(10090, 'Victoria+Subercaseaux%2C+Santiago%2C+Chile', '', 'Santa+Luc%C3%ADa%2C+Santiago%2C+Chile', '', 'q', '1', '2', '1', '1', 1, 1, '2018-12-23 02:46:19', 0),
(10091, 'Vasquez+Avendano+Pamela+Fda+-+Enrique+Mac+Iver%2C+Santiago%2C+Chile', '', 'Victoria+Subercaseaux%2C+Santiago%2C+Chile', '', '1', '1', '1', '1', '1', 1, 1, '2018-12-23 02:50:53', 0);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tbl_servicio_detalle`
--

CREATE TABLE IF NOT EXISTS `tbl_servicio_detalle` (
  `servicio_detalle_id` int(11) NOT NULL AUTO_INCREMENT,
  `servicio_detalle_servicio` int(11) NOT NULL,
  `servicio_detalle_lat` text NOT NULL,
  `servicio_detalle_lon` text NOT NULL,
  PRIMARY KEY (`servicio_detalle_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=68 ;

--
-- Volcado de datos para la tabla `tbl_servicio_detalle`
--

INSERT INTO `tbl_servicio_detalle` (`servicio_detalle_id`, `servicio_detalle_servicio`, `servicio_detalle_lat`, `servicio_detalle_lon`) VALUES
(67, 10091, '-33.44122,-33.44039,-33.44031,-33.44031,-33.44025,-33.44049,-33.44078,-33.44093,-33.44109,-33.4413,-33.44178,-33.44206,-33.44233,-33.44263,-33.44281,-33.44288,-33.443,-33.44302,-33.44276,-33.44237,-33.44154,-33.4414,-33.44067,-33.44054,-33.44039,-33.43949,', '-70.64653,-70.64664,-70.64544,-70.64525,-70.64455,-70.64463,-70.64469,-70.64471,-70.64469,-70.64461,-70.64431,-70.64417,-70.6437,-70.64266,-70.64186,-70.64154,-70.64122,-70.64111,-70.64128,-70.6414,-70.64168,-70.64176,-70.64227,-70.64234,-70.64235,-70.64236,');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tbl_tarifa`
--

CREATE TABLE IF NOT EXISTS `tbl_tarifa` (
  `tarifa_id` int(11) NOT NULL AUTO_INCREMENT,
  `tarifa_nombre` varchar(20) NOT NULL,
  `tarifa_origen` varchar(100) NOT NULL,
  `tarifa_destino` varchar(100) NOT NULL,
  `tarifa_valor1` int(11) NOT NULL,
  `tarifa_valor2` int(11) NOT NULL,
  PRIMARY KEY (`tarifa_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tbl_transportista`
--

CREATE TABLE IF NOT EXISTS `tbl_transportista` (
  `transportista_id` int(11) NOT NULL AUTO_INCREMENT,
  `transportista_nombre` varchar(20) NOT NULL,
  `transportista_razon_social` varchar(20) NOT NULL,
  `transportista_rut` varchar(12) NOT NULL,
  `transportista_direccion` varchar(50) NOT NULL,
  `transportista_nombre_contacto` varchar(30) NOT NULL,
  `transportista_fono_contacto` varchar(10) NOT NULL,
  `transportista_mail_contacto` varchar(50) NOT NULL,
  `transportista_mail_facturacion` varchar(50) NOT NULL,
  PRIMARY KEY (`transportista_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=16 ;

--
-- Volcado de datos para la tabla `tbl_transportista`
--

INSERT INTO `tbl_transportista` (`transportista_id`, `transportista_nombre`, `transportista_razon_social`, `transportista_rut`, `transportista_direccion`, `transportista_nombre_contacto`, `transportista_fono_contacto`, `transportista_mail_contacto`, `transportista_mail_facturacion`) VALUES
(11, 'T100', 'Transportas Soto', '17776140-0', 'Av las torres 123', 'Jose Soto', '22333443', 'tsoto@gmail.com', 'tsoto@gmail.com'),
(12, 'T200', 'Transportes lopez', '18079717-3', 'Av santa amalia 123', 'Maria Gonzalez', '9232454555', 'mgonzalez@hotmail.cl', 'mgonzalez@hotmail.cl'),
(14, 'T300', 'Transportes Silva', '21808427-3', 'Av las lilas 123', 'Juan Perez', '9876767676', 'contacto@silva.cl', 'factura@silva.cl'),
(15, 'T400', 'Transportes Donoso', '20912998-1', 'Av jose perez 342', 'Marco Donoso', '5443432222', 'mdonoso@travel.cl', 'pdonoso@travel.cl');

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
