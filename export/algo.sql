-- phpMyAdmin SQL Dump
-- version 3.2.0.1
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Mar 08, 2010 at 06:58 PM
-- Server version: 5.1.36
-- PHP Version: 5.2.11

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";

--
-- Database: `algo`
--
DROP DATABASE `algo`;
CREATE DATABASE `algo` DEFAULT CHARACTER SET latin1 COLLATE latin1_swedish_ci;
USE `algo`;

-- -------------------------------------------------------

--
-- Table structure for table `algorithms`
--

DROP TABLE IF EXISTS `algorithms`;
CREATE TABLE IF NOT EXISTS `algorithms` (
  `id` smallint(5) unsigned NOT NULL AUTO_INCREMENT,
  `title` varchar(255) COLLATE utf8_bin NOT NULL,
  `model` varchar(255) COLLATE utf8_bin NOT NULL,
  `view` varchar(255) COLLATE utf8_bin NOT NULL,
  `control` varchar(255) COLLATE utf8_bin NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 COLLATE=utf8_bin AUTO_INCREMENT=15 ;

--
-- Dumping data for table `algorithms`
--

INSERT INTO `algorithms` (`id`, `title`, `model`, `view`, `control`) VALUES
(1, 'Test Page', 'testStyle', 'testView', 'testSrc'),
(2, 'Insertion Sort', 'insertionStyle', 'insertionView', 'insertionSrc'),
(3, 'Bubble Sort', 'bubbleStyle', 'bubbleView', 'bubbleSrc'),
(4, 'Quick Sort', 'quickStyle', 'quickView', 'quickSrc'),
(5, 'Deque', 'dequeStyle', 'dequeView', 'dequeSrc'),
(6, 'Linked List', 'linkedlistStyle', 'linkedlistView', 'linkedlistSrc'),
(7, 'Priority Queue', 'priorityqueueStyle', 'priorityqueueView', 'priorityqueueSrc'),
(9, 'Stack', 'stackStyle', 'stackView', 'stackSrc'),
(8, 'Queue', 'queueStyle', 'queueView', 'queueSrc'),
(13, 'Merge Sort', 'mergeStyle', 'mergeView', 'mergeSrc'),
(10, 'Binary Tree Search', 'binarytreeStyle', 'binarytreeView', 'binarytreeSrc'),
(11, 'Breadth First Search', 'breadthfirstStyle', 'breadthfirstView', 'breadthfirstSrc'),
(12, 'Sequential Search', 'sequentialStyle', 'sequentialView', 'sequentialSrc'),
(14, 'Depth First Search', 'depthfirstStyle', 'depthfirstView', 'depthfirstSrc'),
(15,'Red Black','redblackStyle','redblackView','redblackSrc'),
(16,'2-3-4','2-3-4Style','2-3-4View','2-3-4Src'),
(17,'AVL','avlStyle','avlView','avlSrc'),
(18,"Dijkstra's",'dijkstrasStyle','dijkstrasView','dijkstrasSrc'),
(19,"Kruskal's",'kruskalsStyle','kruskalsView','kruskalsSrc'),
(20,"Prim's",'primsStyle','primsView','primsSrc'),
(21,'Critical Path','criticalpathStyle','criticalpathView','criticalpathSrc');
--
-- Table structure for table `search_index`
--

DROP TABLE IF EXISTS `search_index`;
CREATE TABLE IF NOT EXISTS `search_index` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `association_key` int(11) NOT NULL,
  `model` varchar(128) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `data` longtext CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `created` datetime NOT NULL,
  `modified` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `association_key` (`association_key`,`model`),
  FULLTEXT KEY `data` (`data`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

--
-- Dumping data for table `search_index`
--

