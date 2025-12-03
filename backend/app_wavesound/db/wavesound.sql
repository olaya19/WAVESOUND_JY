-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 03-12-2025 a las 05:14:55
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `wavesound`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `albumes`
--

CREATE TABLE `albumes` (
  `id_album` int(11) NOT NULL,
  `id_usuario` int(11) DEFAULT NULL,
  `titulo` varchar(100) DEFAULT NULL,
  `descripcion` varchar(500) DEFAULT NULL,
  `portada` varchar(255) DEFAULT NULL,
  `fecha_lanzamiento` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `canciones`
--

CREATE TABLE `canciones` (
  `id_cancion` int(11) NOT NULL,
  `id_usuario` int(11) NOT NULL,
  `titulo` varchar(100) NOT NULL,
  `descripcion` varchar(255) DEFAULT NULL,
  `duracion` int(11) DEFAULT NULL,
  `archivo_url` varchar(255) NOT NULL,
  `portada_url` varchar(255) DEFAULT NULL,
  `id_genero` int(11) NOT NULL,
  `id_album` int(11) DEFAULT NULL,
  `fecha_creacion` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `canciones`
--

INSERT INTO `canciones` (`id_cancion`, `id_usuario`, `titulo`, `descripcion`, `duracion`, `archivo_url`, `portada_url`, `id_genero`, `id_album`, `fecha_creacion`) VALUES
(1, 6, 'Como Te Hago Entender', 'A través de sus versos, el narrador expresa la profunda tristeza y desesperación que siente por no poder hacer entender a su amada la intensidad de sus sentimientos.', 300, 'https://www.dropbox.com/scl/fi/qo938glk818fm1xn50t8y/Como-Te-Hago-Entender.mp3?rlkey=70dv5m9p4zxou0ktyli4b3kwo&st=400cr1c5&dl=1', 'https://www.dropbox.com/scl/fi/csz6p67mcz4i3k7vicgn2/como-te-hago-entender.jpg?rlkey=lpjh7iol4wxrv4y2fiunsccwn&st=3dosa611&dl=1', 4, NULL, '2025-11-09 21:40:53'),
(2, 7, 'Piensalo', 'Refleja sus sentimientos tras una ruptura. La letra revela un profundo anhelo por una persona amada que ya no está, y la dificultad de seguir adelante.', 240, 'https://www.dropbox.com/scl/fi/da7wjhewgiigwzm18iabt/Junior-H-PIENSALO-Official-Visualizer.mp3?rlkey=r1alb7luzvr3ait4aac044kg1&st=7unhw3fz&dl=1', 'https://www.dropbox.com/scl/fi/oaojjje2999da1qkwuaag/piensalo.jpg?rlkey=tzxdo54hajxrluaxq05wcw2r3&st=p4hj37gr&dl=1', 8, NULL, '2025-11-09 21:48:08'),
(3, 11, 'Bang Bang', 'La letra describe a una mujer etíope que cautiva al narrador hasta el punto de que él se siente \'disparado\' por ella, lo que sugiere que está abrumadoramente enamorado o afectado por su presencia.', 180, 'https://www.dropbox.com/scl/fi/rau2fl6btyeoko2fnf28f/Bang-Bang-New-Version.mp3?rlkey=4ffnyx05j8apa4ig8zluud2ih&st=al36x2uw&dl=1', 'https://www.dropbox.com/scl/fi/vt2kla5wqmvsq1kr3jtbc/bang-bang.jpeg?rlkey=mxn56n8hhfqasjzblq5nesbc0&st=i0dya2d0&dl=1', 3, NULL, '2025-11-09 22:46:37'),
(4, 8, 'Micaela', 'es un recordatorio de la importancia de la música y el baile en la expresión cultural y la identidad latinoamericana, y cómo estos elementos pueden trascender barreras y conectar a las personas.', 240, 'https://www.dropbox.com/scl/fi/vmycvdaeb8a54ch9lcb7b/Sonora-Carruseles-Micaela-Audio.mp3?rlkey=ez94c6lrai8j3aaomgqq5xk5j&st=kfe0auth&dl=1', 'https://www.dropbox.com/scl/fi/fr9vy76viijnekgq8gge2/micaela.jpeg?rlkey=vnmczzf6vwar5p0dd894zpmap&st=yt10rxdy&dl=1', 4, NULL, '2025-11-09 22:57:18'),
(5, 13, 'el Telefono', 'La canción trata sobre el deseo y la intimidad a través de la tecnología, específicamente el teléfono celular, para mantener una relación o tener un encuentro a pesar de los obstáculos.', 240, 'https://www.dropbox.com/scl/fi/fnwlj72nvwd7xbnmj6hhb/El-Telefono.mp3?rlkey=l84w5e61ja37b5fatfie6mgnh&st=5d1excby&dl=1', 'https://www.dropbox.com/scl/fi/13g46bj4pxo9i9hespi8x/el-telefono.jpeg?rlkey=mza9yaugewa3wsreoh7qxpush&st=6xy9qodi&dl=1', 7, NULL, '2025-11-09 23:01:27'),
(6, 12, 'Como Antes', 'Es un tema de Reguetón que funciona como un homenaje al sonido clásico y nostálgico de Wisin & Yandel de principios y mediados de los años 2000.', 180, 'https://www.dropbox.com/scl/fi/qtla5t67yomtpfufooniy/Yandel-Como-Antes-Audio-ft.-Wisin.mp3?rlkey=aucvc3g0465m44zqon20t5gwo&st=2ez8zrq6&dl=1', 'https://www.dropbox.com/scl/fi/l935yonv8084l2wntttbx/Como-Antes.jpg?rlkey=2qoo02fa6z7ipwuthpjqmklxa&st=vqfoy130&dl=1', 7, NULL, '2025-11-09 23:04:55'),
(7, 7, 'Mi Bello Angel ', ' La letra habla de un amor que parece divino, comparando a la persona amada con un ángel que ha descendido del cielo para cambiar la vida del protagonista.', 180, 'https://www.dropbox.com/scl/fi/2isx3atrzxqhdxxzxm00c/Natanael-Cano-Mi-Bello-Angel.mp3?rlkey=soe5jf5y8q56w0rez37yr1re5&st=gf47ej7r&dl=1', 'https://www.dropbox.com/scl/fi/i0evvfign0oy8s4j29ndv/mi-bello-angel.jpeg?rlkey=iy23mc7jsr3ytzp6ue372bxuh&st=y6lbriwx&dl=1', 8, NULL, '2025-11-09 23:10:40'),
(8, 6, 'Sin Tu Amor', 'La letra refleja la profunda tristeza y desesperación de alguien que se siente perdido sin la presencia y el amor de una persona especial.', 180, 'https://www.dropbox.com/scl/fi/4v2m5lzxjb5jd3thzi1ig/Sin-Tu-Amor-feat.-Alex-Pro.mp3?rlkey=o5peactli581q6cualkq9826r&st=q9p14rpr&dl=1', 'https://www.dropbox.com/scl/fi/vwtshjw26c853rfza4r9a/sin-tu-amor.jpeg?rlkey=5urmpbmoetu9y221oiynnsagt&st=at39lcbi&dl=1', 7, NULL, '2025-11-09 23:14:11'),
(9, 13, 'Necio', ' La letra describe la lucha interna de un hombre que se sabe obsesionado por una mujer que ya tiene pareja.', 240, 'https://www.dropbox.com/scl/fi/a8466zjgcxtr492bsl2a6/Necio.mp3?rlkey=k0hmmohwfa9mpppcrpnuix0jk&st=9mai7xkv&dl=1', 'https://www.dropbox.com/scl/fi/rvm9gootub9u81hql8c2t/necio.jpeg?rlkey=1z0676yh1qsv9fkqy8jq48v65&st=ms7q7npv&dl=1', 5, NULL, '2025-11-09 23:20:45'),
(10, 6, 'Oye Mi Amor', 'La letra de la canción expresa el deseo ardiente y la pasión de una persona que está profundamente enamorada y desea estar con el ser amado, a pesar de que este último ya tiene pareja.', 240, 'https://www.dropbox.com/scl/fi/6kjtifiy5gft153xrl6nr/Oye-Mi-Amor.mp3?rlkey=2o7kte9snnf19m3qfwvefkjvk&st=1ts4ypmi&dl=1', 'https://www.dropbox.com/scl/fi/7fviy6wml9tr19i6tiv1h/oye-mi-amor.jpeg?rlkey=z0f57gdnf69l1c48ju0tm9wo3&st=km0ovngs&dl=1', 2, NULL, '2025-11-09 23:24:57'),
(11, 6, 'Locked out of Heaven', 'La letra de la canción habla sobre los sentimientos extasiados que genera una relación, impregnada de emociones positivas y de la euforia que produce el sexo.', 240, 'https://www.dropbox.com/scl/fi/yzys6oziafm6p9f0siygk/Bruno-Mars-Locked-Out-Of-Heaven-Official-Music-Video.mp3?rlkey=l4wpmrl4b85tk235g7yvsg79s&st=mzrfg3dm&dl=1', 'https://www.dropbox.com/scl/fi/vppoufjst6poi4hcqv8mv/locked-out-of-heaven.jpeg?rlkey=ru4klykcv5pt5i9btz61fxpfy&st=nav9ysji&dl=1', 1, NULL, '2025-11-09 23:31:53'),
(12, 11, 'I\'m Not The Only One ', ' La letra refleja el dolor y la desilusión de una persona que se da cuenta de que su pareja no le ha sido fiel.', 245, 'https://www.dropbox.com/scl/fi/rglr26wsvxwj4g5bhdluv/Sam-Smith-I-m-Not-The-Only-One-Official-Music-Video.mp3?rlkey=gvtnhuvzjgdtgyhj8zv9bjjp9&st=blonyop0&dl=1', 'https://www.dropbox.com/scl/fi/l7zpgmt05h5rz8zavcmid/sam-Smith.jpeg?rlkey=xcaqt4qmksoedxqm1sp8erva7&st=aj5gnf38&dl=1', 10, NULL, '2025-11-09 23:38:40'),
(13, 7, 'Mientes', 'refleja la historia de una persona que ha sido engañada y traicionada en una relación sentimental. ', 183, 'https://www.dropbox.com/scl/fi/kiimaybn2ehcp79n3o5hv/Camila-Mientes-Video.mp3?rlkey=qxy3nd7pwqdwwutf9bj9d7u1s&st=996ct69d&dl=1', 'https://www.dropbox.com/scl/fi/33dw30smj7xladmpojle1/mientes.jpeg?rlkey=24o5b3bnou8e0ptuu4udytghi&st=pcceoa5e&dl=1', 2, NULL, '2025-11-09 23:41:56');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `derechos_autor`
--

CREATE TABLE `derechos_autor` (
  `id_registro` int(11) NOT NULL,
  `id_cancion` int(11) DEFAULT NULL,
  `nombre_autor` varchar(40) DEFAULT NULL,
  `fecha_acuerdo` date DEFAULT NULL,
  `documento_legal` varchar(1000) DEFAULT NULL,
  `id_usuario_autor` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `derechos_autor`
--

INSERT INTO `derechos_autor` (`id_registro`, `id_cancion`, `nombre_autor`, `fecha_acuerdo`, `documento_legal`, `id_usuario_autor`) VALUES
(1, 1, 'Yeraldin Olaya', '2025-12-01', 'Acuerdo de prueba', 6),
(2, 12, 'Nicol Vera', '2025-12-01', 'Acuerdo de creación musical', 11),
(8, 10, 'Yeraldin Olaya', '2025-12-03', 'Certificado de Autori Cancion Oye Mi Amor', 6),
(9, 8, 'Yeraldin Olaya', '2025-12-03', 'Certificado de Autoria cancion Sin Tu Amor ', 6);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `documentos_derechos_autor`
--

CREATE TABLE `documentos_derechos_autor` (
  `id_documento` int(11) NOT NULL,
  `id_registro` int(11) NOT NULL,
  `tipo_documento` varchar(50) NOT NULL,
  `nombre_documento` varchar(150) NOT NULL,
  `ruta_archivo` varchar(300) NOT NULL,
  `fecha_subida` datetime DEFAULT NULL,
  `vigente` tinyint(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `documentos_derechos_autor`
--

INSERT INTO `documentos_derechos_autor` (`id_documento`, `id_registro`, `tipo_documento`, `nombre_documento`, `ruta_archivo`, `fecha_subida`, `vigente`) VALUES
(1, 1, 'Certificado de autor', 'certificado_prueba.pdf', '/static/certificados/1764655350.541625_certificado_prueba.pdf', '2025-12-02 01:02:30', 1),
(2, 2, 'Certificado', 'Certificado de Derechos de Autor.pdf', '/static/certificados/1764660756.931388_certificado.pdf', '2025-12-02 02:32:36', 1),
(4, 8, 'Certificado', 'Certificado de Derechos de Autor.pdf', '/static/certificados/1764745095.679388_certificado.pdf', '2025-12-03 01:58:15', 1),
(5, 9, 'Certificado', 'Certificado de Derechos de Autor.pdf', '/static/certificados/1764745316.917644_certificado.pdf', '2025-12-03 02:01:56', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `favoritos`
--

CREATE TABLE `favoritos` (
  `id_favorito` int(11) NOT NULL,
  `id_cancion` int(11) DEFAULT NULL,
  `id_usuario` int(11) DEFAULT NULL,
  `fecha_agregado` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `favoritos`
--

INSERT INTO `favoritos` (`id_favorito`, `id_cancion`, `id_usuario`, `fecha_agregado`) VALUES
(6, 2, 6, '2025-11-09 23:26:24'),
(7, 3, 6, '2025-11-09 23:26:31'),
(8, 4, 6, '2025-11-09 23:26:38'),
(9, 1, 6, '2025-11-09 23:26:49'),
(10, 5, 6, '2025-11-09 23:46:45'),
(11, 6, 6, '2025-11-09 23:46:53'),
(12, 7, 6, '2025-11-09 23:46:56'),
(13, 8, 6, '2025-11-09 23:46:58'),
(14, 9, 6, '2025-11-09 23:47:01'),
(15, 10, 6, '2025-11-09 23:47:04'),
(16, 11, 6, '2025-11-09 23:47:07'),
(17, 12, 6, '2025-11-09 23:47:10'),
(18, 13, 6, '2025-11-09 23:47:15'),
(19, 1, 14, '2025-11-09 23:47:38'),
(20, 2, 14, '2025-11-09 23:47:40'),
(21, 3, 14, '2025-11-09 23:47:43'),
(22, 4, 14, '2025-11-09 23:47:46'),
(23, 5, 14, '2025-11-09 23:47:49'),
(24, 6, 14, '2025-11-09 23:47:51'),
(25, 7, 14, '2025-11-09 23:47:53'),
(26, 8, 14, '2025-11-09 23:47:57'),
(27, 9, 14, '2025-11-09 23:47:59'),
(28, 10, 14, '2025-11-09 23:48:06'),
(29, 11, 14, '2025-11-09 23:48:12'),
(30, 12, 14, '2025-11-09 23:48:16'),
(31, 13, 14, '2025-11-09 23:48:19'),
(32, 1, 7, '2025-11-27 19:38:38'),
(33, 2, 7, '2025-11-27 19:38:40'),
(34, 3, 7, '2025-11-27 19:38:41'),
(35, 5, 7, '2025-11-27 19:38:42'),
(36, 4, 7, '2025-11-27 19:38:43'),
(37, 7, 7, '2025-11-27 19:38:46'),
(38, 6, 7, '2025-11-27 19:38:46'),
(39, 8, 7, '2025-11-27 19:38:48'),
(41, 13, 7, '2025-11-27 19:53:46'),
(42, 1, 11, '2025-11-27 19:54:56'),
(43, 2, 11, '2025-11-27 19:54:57'),
(44, 4, 11, '2025-11-27 19:54:58'),
(45, 3, 11, '2025-11-27 19:54:59'),
(46, 5, 11, '2025-11-27 19:55:02'),
(47, 6, 11, '2025-11-27 19:55:09'),
(48, 7, 11, '2025-11-27 19:55:14'),
(49, 9, 11, '2025-11-27 19:55:16'),
(50, 8, 11, '2025-11-27 19:55:17'),
(51, 10, 11, '2025-11-27 19:55:19'),
(52, 11, 11, '2025-11-27 19:55:21'),
(53, 13, 11, '2025-11-27 19:55:26'),
(54, 12, 11, '2025-11-27 19:55:27'),
(55, 6, 12, '2025-11-27 20:05:05'),
(56, 1, 12, '2025-11-27 20:05:15'),
(57, 2, 12, '2025-11-27 20:05:16'),
(58, 3, 12, '2025-11-27 20:05:16'),
(59, 4, 12, '2025-11-27 20:05:20'),
(61, 5, 12, '2025-11-27 20:05:29'),
(62, 7, 12, '2025-11-27 20:05:31'),
(63, 8, 12, '2025-11-27 20:05:33'),
(64, 10, 12, '2025-11-27 20:05:36'),
(65, 11, 12, '2025-11-27 20:05:38'),
(66, 12, 12, '2025-11-27 20:05:39'),
(67, 13, 12, '2025-11-27 20:05:45'),
(68, 1, 19, '2025-12-01 16:57:28'),
(69, 2, 19, '2025-12-01 16:57:40'),
(71, 9, 19, '2025-12-01 16:57:48'),
(72, 10, 19, '2025-12-01 16:57:50'),
(73, 11, 19, '2025-12-01 16:57:51'),
(74, 13, 19, '2025-12-01 16:57:54'),
(75, 12, 19, '2025-12-01 16:57:57'),
(76, 8, 19, '2025-12-01 16:58:01'),
(77, 7, 19, '2025-12-01 16:58:03'),
(78, 6, 19, '2025-12-01 16:58:05'),
(79, 5, 19, '2025-12-01 16:58:06'),
(80, 4, 19, '2025-12-01 16:58:10'),
(81, 3, 19, '2025-12-01 16:58:31');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `genero`
--

CREATE TABLE `genero` (
  `id_genero` int(11) NOT NULL,
  `genero` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `genero`
--

INSERT INTO `genero` (`id_genero`, `genero`) VALUES
(1, 'Bachata'),
(2, 'Balada'),
(3, 'Corridos'),
(4, 'Hip Hop'),
(5, 'Jazz'),
(6, 'Merengue'),
(7, 'Pop'),
(8, 'Pop Latino'),
(10, 'Reggaetón'),
(11, 'Rock'),
(12, 'Salsa'),
(13, 'Vallenato');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `listas_reproducciones`
--

CREATE TABLE `listas_reproducciones` (
  `id_lista` int(11) NOT NULL,
  `id_usuario` int(11) DEFAULT NULL,
  `nombre_lista` varchar(100) DEFAULT NULL,
  `descripcion` varchar(500) DEFAULT NULL,
  `privada` tinyint(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `lista_canciones`
--

CREATE TABLE `lista_canciones` (
  `id_lista` int(11) NOT NULL,
  `id_cancion` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `perfiles`
--

CREATE TABLE `perfiles` (
  `id_perfil` int(11) NOT NULL,
  `id_usuario` int(11) DEFAULT NULL,
  `nombre_artista` varchar(50) DEFAULT NULL,
  `biografia` varchar(100) DEFAULT NULL,
  `foto_perfil` varchar(100) DEFAULT NULL,
  `genero_musical` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `perfiles`
--

INSERT INTO `perfiles` (`id_perfil`, `id_usuario`, `nombre_artista`, `biografia`, `foto_perfil`, `genero_musical`) VALUES
(1, 6, 'YeralArtist23', 'Soy cantante guitarrista Pianista y me encanta hacer musica ', 'static/perfiles/Call_of_Duty_Black_Ops_II_box_artwork.png', 'Corridos  Rock  Pop rock  Blues  Country balada y '),
(2, 7, 'JeifferGuitar 🌚🎸', '¡Hey! Soy JeifferGuitar, un apasionado de las seis cuerdas 🎸. La guitarra es mi voz y mi forma de co', 'static/perfiles/pepe.jpeg', 'Corridos  Rock  Pop rock  Blues  Country'),
(3, 17, 'YeralMusic2 Pro', 'Artista de corridos y rock. Productora y guitarrista avanzada.', 'static/perfiles/perfil_yeral_v2.jpg', 'Corridos, Rock, Pop Alternativo'),
(4, 14, 'Dani56 😉😍💯', 'Me encanta la musica de todo tipo y apoyar a mis artistas pereferidos', 'static/perfiles/smallville.jpg', 'Salsa, Merengue,Rancheras , Pop , Country'),
(5, 11, 'NikiRo17', 'Amante del rock. Toco, creo y vibro con riffs que hablan por mí. 🎸🔥', 'static/perfiles/guitar-hero.jpeg', 'Rock  Rock alternativo  Hard rock  Indie rock  Met'),
(6, 12, 'LauriñeS🐧✨😎', 'Amante del saxofón. Vibro con el jazz y sonidos que fluyen con libertad 🎷✨', 'static/perfiles/gato.jpg', 'Jazz  Blues  Swing  Bossa nova  Smooth jazz'),
(7, 8, 'BeivyProducer 🎵🎛️', 'Producer que crea, mezcla y da vida a sonidos con estilo propio 🎧🔥', 'static/perfiles/juego2.jpg', 'Techno  House  Deep house  EDM  Trance'),
(8, 19, 'YeralSound🎶✨', 'Canto, toco piano y guitarra. Transformo emociones en melodías con mi propio estilo. Cada nota es pa', 'static/perfiles/minecraft-banner.jpg', 'Pop acústico  Balada pop  Pop rock  Indie pop  R&B');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `permisos_reproduccion`
--

CREATE TABLE `permisos_reproduccion` (
  `id_permiso` int(11) NOT NULL,
  `id_cancion` int(11) DEFAULT NULL,
  `id_usuario` int(11) DEFAULT NULL,
  `permiso` varchar(50) DEFAULT NULL,
  `activo` tinyint(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `reproducciones`
--

CREATE TABLE `reproducciones` (
  `id_reproduccion` int(11) NOT NULL,
  `id_cancion` int(11) DEFAULT NULL,
  `id_usuario` int(11) DEFAULT NULL,
  `fecha_reproduccion` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `roles`
--

CREATE TABLE `roles` (
  `id_rol` int(11) NOT NULL,
  `rol` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `roles`
--

INSERT INTO `roles` (`id_rol`, `rol`) VALUES
(1, 'Administrador'),
(3, 'Artista'),
(2, 'Oyente'),
(4, 'Productor');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `seguidores`
--

CREATE TABLE `seguidores` (
  `id_seguidor` int(11) NOT NULL,
  `id_usuario` int(11) DEFAULT NULL,
  `id_seguido` int(11) DEFAULT NULL,
  `fecha_seguimiento` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `id_usuario` int(11) NOT NULL,
  `id_rol` int(11) DEFAULT NULL,
  `nickname` varchar(50) NOT NULL,
  `nombre_usuario` varchar(50) NOT NULL,
  `email` varchar(100) NOT NULL,
  `contraseña` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`id_usuario`, `id_rol`, `nickname`, `nombre_usuario`, `email`, `contraseña`) VALUES
(6, 3, 'yeral123', 'Yeraldin Olaya', 'yeral@gmail.com', '$2b$12$3lhyv8k7o2G7POIK3ZmyXOfJ46rxdJkc8hB5zK17z/PaOghcX6qBK'),
(7, 3, 'jeiffer123', 'Jeiffer Mosquera', 'jeiffer@gmail.com', '$2b$12$oGZ4ZQ1tZcvIGWOgPkatK.BYo1qD0XcQmTZ45vuSSG4pPMqea2UmC'),
(8, 4, 'medina123', 'Jhon Medina', 'medina@gmail.com', '$2b$12$YyEyHhEa1MfM8j8.YGMSsuLS0lZAWnl8F4g.TWDPdPSMUfxIpYQDG'),
(9, 2, 'mateo123', 'Mateo Cardona ', 'cardona@gmail.com', '$2b$12$8IexmCbn.Fd.yc9U7xxK4uM6df6suoI9ykUyRALJzk46EMOYQIwj6'),
(10, 4, 'sebas123', 'Sebastian Torres', 'sebas@gmail.com', '$2b$12$iY6mgSvna41lOGS2h/b2aOqQ5ybwbGBf2VBdNT4qa4WIozLysJmRa'),
(11, 3, 'nicol123', 'Nicol Vera', 'nicol@gmail.com', '$2b$12$RmaRLhLg9re96.G/Rl7xhOCoJ3KNwIZfO2aywTiw2271YjAU2b5tm'),
(12, 4, 'laura123', 'Laura Ibañez', 'laura@gmail.com', '$2b$12$Ku7cpir5HREyS3vemdnlI.wOvddn7PRRfSno7dEoD8ufT.3/0.Wki'),
(13, 3, 'karen123', 'Karen Sicua', 'karen@gmail.com', '$2b$12$vM1uJzYuvgN6NOq1VsNodurmHO6sqFvCYsAssUHt8gEZWXau5cGP.'),
(14, 2, 'dani123', 'Daniela Castellanos', 'dani@gmail.com', '$2b$12$ilN30lrh16MeWV6LovnDmeu4VY2ZcOauk5T7H3cjeVpakXJyYsA5G'),
(15, 1, 'yeralAdmin', 'Yeris Admin', 'adminyeral@gmail.com', '$2b$12$UETViRvkaZfZrAb6fQinO.MpV95qv/esM2a.1G61/p0yrVMaX0FAa'),
(16, 1, 'jeifferAdmin', 'jeiffersitoAdmin', 'adminjeiffer@gmail.com', '$2b$12$SSG/AVDorSTIk5UKopBi.O6nMill//CEf2IkccpC2BzDxyCM0ywoO'),
(17, 3, 'yeral1234', 'Yeral Olaya', 'yeral1@gmail.com', '$2b$12$r2v0JpOTam.dimkTc1uKNufLGRnfylZwzWyWpUhooMxeVaVWaEsm6'),
(19, 3, 'geraldinolaya88', 'Yeraldin Olaya Ríos', 'geraldinolaya88@gmail.com', 'GOOGLE_ACCOUNT');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `albumes`
--
ALTER TABLE `albumes`
  ADD PRIMARY KEY (`id_album`),
  ADD KEY `id_usuario` (`id_usuario`);

--
-- Indices de la tabla `canciones`
--
ALTER TABLE `canciones`
  ADD PRIMARY KEY (`id_cancion`),
  ADD KEY `id_usuario` (`id_usuario`),
  ADD KEY `id_genero` (`id_genero`),
  ADD KEY `id_album` (`id_album`),
  ADD KEY `ix_canciones_id_cancion` (`id_cancion`),
  ADD KEY `ix_canciones_titulo` (`titulo`);

--
-- Indices de la tabla `derechos_autor`
--
ALTER TABLE `derechos_autor`
  ADD PRIMARY KEY (`id_registro`),
  ADD KEY `id_cancion` (`id_cancion`),
  ADD KEY `id_usuario_autor` (`id_usuario_autor`);

--
-- Indices de la tabla `documentos_derechos_autor`
--
ALTER TABLE `documentos_derechos_autor`
  ADD PRIMARY KEY (`id_documento`),
  ADD KEY `id_registro` (`id_registro`);

--
-- Indices de la tabla `favoritos`
--
ALTER TABLE `favoritos`
  ADD PRIMARY KEY (`id_favorito`),
  ADD UNIQUE KEY `uix_cancion_usuario` (`id_cancion`,`id_usuario`),
  ADD KEY `id_usuario` (`id_usuario`);

--
-- Indices de la tabla `genero`
--
ALTER TABLE `genero`
  ADD PRIMARY KEY (`id_genero`),
  ADD UNIQUE KEY `genero` (`genero`);

--
-- Indices de la tabla `listas_reproducciones`
--
ALTER TABLE `listas_reproducciones`
  ADD PRIMARY KEY (`id_lista`),
  ADD KEY `id_usuario` (`id_usuario`);

--
-- Indices de la tabla `lista_canciones`
--
ALTER TABLE `lista_canciones`
  ADD PRIMARY KEY (`id_lista`,`id_cancion`),
  ADD KEY `id_cancion` (`id_cancion`);

--
-- Indices de la tabla `perfiles`
--
ALTER TABLE `perfiles`
  ADD PRIMARY KEY (`id_perfil`),
  ADD KEY `id_usuario` (`id_usuario`);

--
-- Indices de la tabla `permisos_reproduccion`
--
ALTER TABLE `permisos_reproduccion`
  ADD PRIMARY KEY (`id_permiso`),
  ADD KEY `id_cancion` (`id_cancion`),
  ADD KEY `id_usuario` (`id_usuario`);

--
-- Indices de la tabla `reproducciones`
--
ALTER TABLE `reproducciones`
  ADD PRIMARY KEY (`id_reproduccion`),
  ADD KEY `id_cancion` (`id_cancion`),
  ADD KEY `id_usuario` (`id_usuario`);

--
-- Indices de la tabla `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`id_rol`),
  ADD UNIQUE KEY `rol` (`rol`);

--
-- Indices de la tabla `seguidores`
--
ALTER TABLE `seguidores`
  ADD PRIMARY KEY (`id_seguidor`),
  ADD KEY `id_usuario` (`id_usuario`),
  ADD KEY `id_seguido` (`id_seguido`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id_usuario`),
  ADD UNIQUE KEY `nickname` (`nickname`),
  ADD UNIQUE KEY `email` (`email`),
  ADD KEY `id_rol` (`id_rol`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `albumes`
--
ALTER TABLE `albumes`
  MODIFY `id_album` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `canciones`
--
ALTER TABLE `canciones`
  MODIFY `id_cancion` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT de la tabla `derechos_autor`
--
ALTER TABLE `derechos_autor`
  MODIFY `id_registro` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT de la tabla `documentos_derechos_autor`
--
ALTER TABLE `documentos_derechos_autor`
  MODIFY `id_documento` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `favoritos`
--
ALTER TABLE `favoritos`
  MODIFY `id_favorito` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=82;

--
-- AUTO_INCREMENT de la tabla `genero`
--
ALTER TABLE `genero`
  MODIFY `id_genero` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT de la tabla `listas_reproducciones`
--
ALTER TABLE `listas_reproducciones`
  MODIFY `id_lista` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `perfiles`
--
ALTER TABLE `perfiles`
  MODIFY `id_perfil` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT de la tabla `permisos_reproduccion`
--
ALTER TABLE `permisos_reproduccion`
  MODIFY `id_permiso` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `reproducciones`
--
ALTER TABLE `reproducciones`
  MODIFY `id_reproduccion` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `roles`
--
ALTER TABLE `roles`
  MODIFY `id_rol` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `seguidores`
--
ALTER TABLE `seguidores`
  MODIFY `id_seguidor` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id_usuario` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `albumes`
--
ALTER TABLE `albumes`
  ADD CONSTRAINT `albumes_ibfk_1` FOREIGN KEY (`id_usuario`) REFERENCES `usuarios` (`id_usuario`);

--
-- Filtros para la tabla `canciones`
--
ALTER TABLE `canciones`
  ADD CONSTRAINT `canciones_ibfk_1` FOREIGN KEY (`id_usuario`) REFERENCES `usuarios` (`id_usuario`),
  ADD CONSTRAINT `canciones_ibfk_2` FOREIGN KEY (`id_genero`) REFERENCES `genero` (`id_genero`),
  ADD CONSTRAINT `canciones_ibfk_3` FOREIGN KEY (`id_album`) REFERENCES `albumes` (`id_album`);

--
-- Filtros para la tabla `derechos_autor`
--
ALTER TABLE `derechos_autor`
  ADD CONSTRAINT `derechos_autor_ibfk_1` FOREIGN KEY (`id_cancion`) REFERENCES `canciones` (`id_cancion`),
  ADD CONSTRAINT `derechos_autor_ibfk_2` FOREIGN KEY (`id_usuario_autor`) REFERENCES `usuarios` (`id_usuario`);

--
-- Filtros para la tabla `documentos_derechos_autor`
--
ALTER TABLE `documentos_derechos_autor`
  ADD CONSTRAINT `documentos_derechos_autor_ibfk_1` FOREIGN KEY (`id_registro`) REFERENCES `derechos_autor` (`id_registro`);

--
-- Filtros para la tabla `favoritos`
--
ALTER TABLE `favoritos`
  ADD CONSTRAINT `favoritos_ibfk_1` FOREIGN KEY (`id_cancion`) REFERENCES `canciones` (`id_cancion`),
  ADD CONSTRAINT `favoritos_ibfk_2` FOREIGN KEY (`id_usuario`) REFERENCES `usuarios` (`id_usuario`);

--
-- Filtros para la tabla `listas_reproducciones`
--
ALTER TABLE `listas_reproducciones`
  ADD CONSTRAINT `listas_reproducciones_ibfk_1` FOREIGN KEY (`id_usuario`) REFERENCES `usuarios` (`id_usuario`);

--
-- Filtros para la tabla `lista_canciones`
--
ALTER TABLE `lista_canciones`
  ADD CONSTRAINT `lista_canciones_ibfk_1` FOREIGN KEY (`id_lista`) REFERENCES `listas_reproducciones` (`id_lista`),
  ADD CONSTRAINT `lista_canciones_ibfk_2` FOREIGN KEY (`id_cancion`) REFERENCES `canciones` (`id_cancion`);

--
-- Filtros para la tabla `perfiles`
--
ALTER TABLE `perfiles`
  ADD CONSTRAINT `perfiles_ibfk_1` FOREIGN KEY (`id_usuario`) REFERENCES `usuarios` (`id_usuario`);

--
-- Filtros para la tabla `permisos_reproduccion`
--
ALTER TABLE `permisos_reproduccion`
  ADD CONSTRAINT `permisos_reproduccion_ibfk_1` FOREIGN KEY (`id_cancion`) REFERENCES `canciones` (`id_cancion`),
  ADD CONSTRAINT `permisos_reproduccion_ibfk_2` FOREIGN KEY (`id_usuario`) REFERENCES `usuarios` (`id_usuario`);

--
-- Filtros para la tabla `reproducciones`
--
ALTER TABLE `reproducciones`
  ADD CONSTRAINT `reproducciones_ibfk_1` FOREIGN KEY (`id_cancion`) REFERENCES `canciones` (`id_cancion`),
  ADD CONSTRAINT `reproducciones_ibfk_2` FOREIGN KEY (`id_usuario`) REFERENCES `usuarios` (`id_usuario`);

--
-- Filtros para la tabla `seguidores`
--
ALTER TABLE `seguidores`
  ADD CONSTRAINT `seguidores_ibfk_1` FOREIGN KEY (`id_usuario`) REFERENCES `usuarios` (`id_usuario`),
  ADD CONSTRAINT `seguidores_ibfk_2` FOREIGN KEY (`id_seguido`) REFERENCES `usuarios` (`id_usuario`);

--
-- Filtros para la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD CONSTRAINT `usuarios_ibfk_1` FOREIGN KEY (`id_rol`) REFERENCES `roles` (`id_rol`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
