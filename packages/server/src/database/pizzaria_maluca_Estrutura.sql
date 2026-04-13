CREATE DATABASE  IF NOT EXISTS `pizzaria` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `pizzaria`;
-- MySQL dump 10.13  Distrib 8.0.45, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: pizzaria
-- ------------------------------------------------------
-- Server version	9.6.0

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
SET @MYSQLDUMP_TEMP_LOG_BIN = @@SESSION.SQL_LOG_BIN;
SET @@SESSION.SQL_LOG_BIN= 0;

--
-- GTID state at the beginning of the backup 
--

SET @@GLOBAL.GTID_PURGED=/*!80000 '+'*/ '3c144154-12a6-11f1-9847-0045e2d75ef2:1-428';

--
-- Table structure for table `categorias`
--

DROP TABLE IF EXISTS `categorias`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `categorias` (
  `idcategoria` int NOT NULL AUTO_INCREMENT,
  `nome` varchar(100) NOT NULL,
  `icone` varchar(100) NOT NULL,
  `ordem` int NOT NULL,
  `ATIVO` int NOT NULL DEFAULT '1',
  PRIMARY KEY (`idcategoria`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `empresa`
--

DROP TABLE IF EXISTS `empresa`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `empresa` (
  `idempresa` int NOT NULL AUTO_INCREMENT,
  `nome` varchar(200) NOT NULL,
  `email` varchar(250) NOT NULL,
  `senha` varchar(250) NOT NULL,
  `sobre` varchar(1000) DEFAULT NULL,
  `logotipo` varchar(250) DEFAULT NULL,
  `cep` varchar(15) NOT NULL,
  `endereco` varchar(250) NOT NULL,
  `numero` varchar(10) NOT NULL,
  `bairro` varchar(250) NOT NULL,
  `complemento` varchar(250) NOT NULL,
  `cidade` varchar(45) NOT NULL,
  `estado` varchar(45) NOT NULL,
  `ativo` int NOT NULL DEFAULT '1',
  PRIMARY KEY (`idempresa`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `horario`
--

DROP TABLE IF EXISTS `horario`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `horario` (
  `idhorario` int NOT NULL AUTO_INCREMENT,
  `diainicio` int NOT NULL,
  `diafim` int NOT NULL,
  `iniciohorarioum` varchar(5) NOT NULL,
  `fimhorarioum` varchar(5) NOT NULL,
  `iniciohorariodois` varchar(5) NOT NULL,
  `fimhorariodois` varchar(5) NOT NULL,
  PRIMARY KEY (`idhorario`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `opcional`
--

DROP TABLE IF EXISTS `opcional`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `opcional` (
  `idopcional` int NOT NULL AUTO_INCREMENT,
  `nome` varchar(250) NOT NULL,
  `tiposimples` int NOT NULL DEFAULT '1',
  `minimo` int NOT NULL DEFAULT '0',
  `maximo` int NOT NULL DEFAULT '0',
  PRIMARY KEY (`idopcional`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `opcionalitem`
--

DROP TABLE IF EXISTS `opcionalitem`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `opcionalitem` (
  `idopcionalitem` int NOT NULL AUTO_INCREMENT,
  `idopcional` int NOT NULL,
  `nome` varchar(100) NOT NULL,
  `valor` decimal(10,2) NOT NULL,
  PRIMARY KEY (`idopcionalitem`),
  KEY `FK_OPCIONAL_ITEM_idx` (`idopcional`),
  CONSTRAINT `FK_OPCIONAL_ITEM` FOREIGN KEY (`idopcional`) REFERENCES `opcional` (`idopcional`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `pagamentos`
--

DROP TABLE IF EXISTS `pagamentos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `pagamentos` (
  `idpagamentos` int NOT NULL AUTO_INCREMENT,
  `nome` varchar(45) NOT NULL,
  `ATIVO` int NOT NULL DEFAULT '1',
  PRIMARY KEY (`idpagamentos`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `pedido`
--

DROP TABLE IF EXISTS `pedido`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `pedido` (
  `idpedido` int NOT NULL AUTO_INCREMENT,
  `idpedidostatus` int NOT NULL,
  `idtipoentrega` int NOT NULL,
  `idtaxaentrega` int DEFAULT NULL,
  `idpagamentos` int NOT NULL,
  `troco` decimal(10,2) DEFAULT NULL,
  `total` decimal(10,2) DEFAULT NULL,
  `cep` varchar(20) DEFAULT NULL,
  `endereço` varchar(250) DEFAULT NULL,
  `numero` varchar(10) DEFAULT NULL,
  `bairro` varchar(250) DEFAULT NULL,
  `complemento` varchar(250) DEFAULT NULL,
  `cidade` varchar(100) DEFAULT NULL,
  `estado` varchar(100) DEFAULT NULL,
  `nomecliente` varchar(250) NOT NULL,
  `telefonecliente` varchar(100) NOT NULL,
  `datacadastro` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `datafinalizado` datetime DEFAULT NULL,
  PRIMARY KEY (`idpedido`),
  KEY `FK_PEDIDO_STATUS_idx` (`idpedidostatus`),
  KEY `FK_TIPO_ENTREGA_idx` (`idtipoentrega`),
  KEY `FK_PEDIDO_TAXA_ENTREGA_idx` (`idtaxaentrega`),
  KEY `FK_PEDIDO_PAGAMENTOS_idx` (`idpagamentos`),
  CONSTRAINT `FK_PEDIDO_PAGAMENTOS` FOREIGN KEY (`idpagamentos`) REFERENCES `pagamentos` (`idpagamentos`),
  CONSTRAINT `FK_PEDIDO_STATUS` FOREIGN KEY (`idpedidostatus`) REFERENCES `pedidostatus` (`idpedidostatus`),
  CONSTRAINT `FK_PEDIDO_TAXA_ENTREGA` FOREIGN KEY (`idtaxaentrega`) REFERENCES `taxaentrega` (`idtaxaentrega`),
  CONSTRAINT `FK_TIPO_ENTREGA` FOREIGN KEY (`idtipoentrega`) REFERENCES `tipoentrega` (`idtipoentrega`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `pedidoitem`
--

DROP TABLE IF EXISTS `pedidoitem`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `pedidoitem` (
  `idpedidoitem` int NOT NULL AUTO_INCREMENT,
  `idpedido` int NOT NULL,
  `idproduto` int NOT NULL,
  `quantidade` int NOT NULL,
  `observacao` varchar(500) DEFAULT NULL,
  PRIMARY KEY (`idpedidoitem`),
  KEY `FK_PEDIDO_idx` (`idpedido`),
  KEY `FK_PRODUTO_idx` (`idproduto`),
  CONSTRAINT `FK_PEDIDO` FOREIGN KEY (`idpedido`) REFERENCES `pedido` (`idpedido`),
  CONSTRAINT `FK_PRODUTO` FOREIGN KEY (`idproduto`) REFERENCES `produtos` (`idproduto`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `pedidoitemopcional`
--

DROP TABLE IF EXISTS `pedidoitemopcional`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `pedidoitemopcional` (
  `idpedidoitemopcional` int NOT NULL AUTO_INCREMENT,
  `idpedidoitem` int NOT NULL,
  `idopcionalitem` int NOT NULL,
  PRIMARY KEY (`idpedidoitemopcional`),
  KEY `FK_ITEM_OPCIONAL_PEDIDO_idx` (`idpedidoitem`),
  KEY `FK_ITEM_OPCIONAL_PEDIDO_OPCIONAL_idx` (`idopcionalitem`),
  CONSTRAINT `FK_ITEM_OPCIONAL_PEDIDO_ITEM` FOREIGN KEY (`idpedidoitem`) REFERENCES `pedidoitem` (`idpedidoitem`),
  CONSTRAINT `FK_ITEM_OPCIONAL_PEDIDO_OPCIONAL` FOREIGN KEY (`idopcionalitem`) REFERENCES `opcionalitem` (`idopcionalitem`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `pedidostatus`
--

DROP TABLE IF EXISTS `pedidostatus`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `pedidostatus` (
  `idpedidostatus` int NOT NULL AUTO_INCREMENT,
  `descricao` varchar(100) NOT NULL,
  PRIMARY KEY (`idpedidostatus`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `produtoopcional`
--

DROP TABLE IF EXISTS `produtoopcional`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `produtoopcional` (
  `idprodutoopcional` int NOT NULL AUTO_INCREMENT,
  `idproduto` int NOT NULL,
  `idopcional` int NOT NULL,
  PRIMARY KEY (`idprodutoopcional`),
  KEY `FK_PRODUTO_OPCIONAL_idx` (`idproduto`),
  KEY `FK_OPCIONAL_PRODUTO` (`idopcional`),
  CONSTRAINT `FK_OPCIONAL_PRODUTO` FOREIGN KEY (`idopcional`) REFERENCES `opcional` (`idopcional`),
  CONSTRAINT `FK_PRODUTO_OPCIONAL` FOREIGN KEY (`idproduto`) REFERENCES `produtos` (`idproduto`)
) ENGINE=InnoDB AUTO_INCREMENT=27 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `produtos`
--

DROP TABLE IF EXISTS `produtos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `produtos` (
  `idproduto` int NOT NULL AUTO_INCREMENT,
  `idcategoria` int NOT NULL,
  `nome` varchar(100) NOT NULL,
  `descricao` varchar(500) DEFAULT NULL,
  `valor` decimal(10,2) NOT NULL,
  `imagem` varchar(250) DEFAULT NULL,
  `ordem` int NOT NULL,
  `ATIVO` int DEFAULT '1',
  PRIMARY KEY (`idproduto`),
  KEY `FK_PRODUTOS_CATEGORIAS_idx` (`idcategoria`),
  CONSTRAINT `FK_PRODUTOS_CATEGORIAS` FOREIGN KEY (`idcategoria`) REFERENCES `categorias` (`idcategoria`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `taxaentrega`
--

DROP TABLE IF EXISTS `taxaentrega`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `taxaentrega` (
  `idtaxaentrega` int NOT NULL AUTO_INCREMENT,
  `idtaxaentregatipo` int NOT NULL,
  `valor` decimal(10,2) DEFAULT NULL,
  `distancia` int DEFAULT NULL,
  `tempominimo` int DEFAULT NULL,
  `tempomaximo` int DEFAULT NULL,
  `ATIVO` int NOT NULL,
  PRIMARY KEY (`idtaxaentrega`),
  KEY `FK_TAXA_ENTREGA_TIPO_idx` (`idtaxaentregatipo`),
  CONSTRAINT `FK_TAXA_ENTREGA_TIPO` FOREIGN KEY (`idtaxaentregatipo`) REFERENCES `taxaentregatipo` (`idtaxaentregatipo`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `taxaentregatipo`
--

DROP TABLE IF EXISTS `taxaentregatipo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `taxaentregatipo` (
  `idtaxaentregatipo` int NOT NULL AUTO_INCREMENT,
  `nome` varchar(50) NOT NULL,
  `ATIVO` int NOT NULL DEFAULT '1',
  PRIMARY KEY (`idtaxaentregatipo`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `tipoentrega`
--

DROP TABLE IF EXISTS `tipoentrega`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tipoentrega` (
  `idtipoentrega` int NOT NULL AUTO_INCREMENT,
  `nome` varchar(20) NOT NULL,
  `tempominimo` int DEFAULT NULL,
  `tempomaximo` int DEFAULT NULL,
  `ATIVO` int NOT NULL DEFAULT '1',
  PRIMARY KEY (`idtipoentrega`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
SET @@SESSION.SQL_LOG_BIN = @MYSQLDUMP_TEMP_LOG_BIN;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-04-08 19:08:12
