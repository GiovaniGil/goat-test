CREATE DATABASE  IF NOT EXISTS `goat` /*!40100 DEFAULT CHARACTER SET latin1 */;
USE `goat`;
-- MySQL dump 10.13  Distrib 8.0.22, for Linux (x86_64)
--
-- Host: localhost    Database: goat
-- ------------------------------------------------------
-- Server version	5.7.32

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

--
-- Table structure for table `goat_events`
--

DROP TABLE IF EXISTS `goat_events`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `goat_events` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `strName` varchar(30) NOT NULL,
  `textDescription` varchar(255) NOT NULL,
  `intWeeklyRecurrence` int(11) NOT NULL,
  `dateFrom` date NOT NULL,
  `strStartTime` varchar(5) NOT NULL,
  `strEndTime` varchar(5) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `goat_events`
--

LOCK TABLES `goat_events` WRITE;
/*!40000 ALTER TABLE `goat_events` DISABLE KEYS */;
INSERT INTO `goat_events` VALUES (1,'Evento','Evento2',2,'2021-04-23','08:00','10:00'),(2,'Evento','Evento2',2,'2021-04-23','08:00','10:00'),(3,'Futebol','Futebol',2,'2021-04-16','12:15','13:01'),(4,'Estudos','Estudos',1,'2021-04-23','16:04','16:30'),(5,'Futebol','Futebol',0,'2021-04-20','11:05','12:04'),(6,'Futebol','Futebol',0,'2021-04-23','17:30','18:25');
/*!40000 ALTER TABLE `goat_events` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
