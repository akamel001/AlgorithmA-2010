-- MySQL dump 10.11
--
-- Host: localhost    Database: algo
-- ------------------------------------------------------
-- Server version	5.0.77

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `algorithms`
--

DROP TABLE IF EXISTS `algorithms`;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
CREATE TABLE `algorithms` (
  `id` smallint(5) unsigned NOT NULL auto_increment,
  `title` varchar(255) collate utf8_bin NOT NULL,
  `model` varchar(255) collate utf8_bin NOT NULL,
  `view` varchar(255) collate utf8_bin NOT NULL,
  `control` varchar(255) collate utf8_bin NOT NULL,
  PRIMARY KEY  (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=22 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
SET character_set_client = @saved_cs_client;

--
-- Dumping data for table `algorithms`
--

LOCK TABLES `algorithms` WRITE;
/*!40000 ALTER TABLE `algorithms` DISABLE KEYS */;
INSERT INTO `algorithms` VALUES (1,'Test Page','testStyle','testView','testSrc'),(2,'Insertion Sort','insertionStyle','insertionView','insertionSrc'),(3,'Bubble Sort','bubbleStyle','bubbleView','bubbleSrc'),(4,'Quick Sort','quickStyle','quickView','quickSrc'),(5,'Deque','dequeStyle','dequeView','dequeSrc'),(6,'Linked List','linkedlistStyle','linkedlistView','linkedlistSrc'),(7,'Priority Queue','priorityqueueStyle','priorityqueueView','priorityqueueSrc'),(9,'Stack','stackStyle','stackView','stackSrc'),(8,'Queue','queueStyle','queueView','queueSrc'),(13,'Merge Sort','mergeStyle','mergeView','mergeSrc'),(10,'Binary Tree Search','binarytreeStyle','binarytreeView','binarytreeSrc'),(11,'Breadth First Search','breadthfirstStyle','breadthfirstView','breadthfirstSrc'),(12,'Sequential Search','sequentialStyle','sequentialView','sequentialSrc'),(14,'Depth First Search','depthfirstStyle','depthfirstView','depthfirstSrc'),(15,'Red Black','redblackStyle','redblackView','redblackSrc'),(16,'2-3-4','2-3-4Style','2-3-4View','2-3-4Src'),(17,'AVL','avlStyle','avlView','avlSrc'),(18,'Dijkstra\'s','dijkstrasStyle','dijkstrasView','dijkstrasSrc'),(19,'Kruskal\'s','kruskalsStyle','kruskalsView','kruskalsSrc'),(20,'Prim\'s','primsStyle','primsView','primsSrc'),(21,'Critical Path','criticalpathStyle','criticalpathView','criticalpathSrc');
/*!40000 ALTER TABLE `algorithms` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `search_index`
--

DROP TABLE IF EXISTS `search_index`;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
CREATE TABLE `search_index` (
  `id` int(11) NOT NULL auto_increment,
  `association_key` int(11) NOT NULL,
  `model` varchar(128) character set utf8 collate utf8_unicode_ci NOT NULL,
  `data` longtext character set utf8 collate utf8_unicode_ci NOT NULL,
  `created` datetime NOT NULL,
  `modified` datetime NOT NULL,
  PRIMARY KEY  (`id`),
  KEY `association_key` (`association_key`,`model`),
  FULLTEXT KEY `data` (`data`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;
SET character_set_client = @saved_cs_client;

--
-- Dumping data for table `search_index`
--

LOCK TABLES `search_index` WRITE;
/*!40000 ALTER TABLE `search_index` DISABLE KEYS */;
/*!40000 ALTER TABLE `search_index` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2010-03-23  1:29:48
