-- MySQL dump 10.13  Distrib 8.0.43, for Win64 (x86_64)
--
-- Host: localhost    Database: portfolio_db
-- ------------------------------------------------------
-- Server version	8.0.43

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `admins`
--

DROP TABLE IF EXISTS `admins`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `admins` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(50) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `admins`
--

LOCK TABLES `admins` WRITE;
/*!40000 ALTER TABLE `admins` DISABLE KEYS */;
INSERT INTO `admins` VALUES (1,'admin','admin@example.com','$2b$10$zlQ7iQPMFAfYTdEPqNnbK.WTTEa.ElQVXMXPVxRE7luqDzE.EAO2y','2026-06-03 17:21:20');
/*!40000 ALTER TABLE `admins` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `certificates`
--

DROP TABLE IF EXISTS `certificates`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `certificates` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(150) NOT NULL,
  `issuer` varchar(100) NOT NULL,
  `issue_date` varchar(50) NOT NULL,
  `certificate_url` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `certificates`
--

LOCK TABLES `certificates` WRITE;
/*!40000 ALTER TABLE `certificates` DISABLE KEYS */;
/*!40000 ALTER TABLE `certificates` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `contacts`
--

DROP TABLE IF EXISTS `contacts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `contacts` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `subject` varchar(200) NOT NULL,
  `message` text NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `contacts`
--

LOCK TABLES `contacts` WRITE;
/*!40000 ALTER TABLE `contacts` DISABLE KEYS */;
INSERT INTO `contacts` VALUES (1,'Karthick V','v.karthick406@gmail.com','hii ','i want to you to assign for my work.','2026-06-06 04:18:09'),(2,'rohith','ffnoobacc162@gmail.com','for some important notices','you have been selected to our company.','2026-06-06 12:09:17'),(3,'hii','binishasharan13@gmail.com','love proposal','i love you bujju','2026-06-07 12:20:39'),(4,'Test','test@test.com','Test Subject','Test message from local','2026-06-07 13:47:41'),(5,'Test','test@test.com','Test Subject','Test message from local','2026-06-07 14:09:41');
/*!40000 ALTER TABLE `contacts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `portfolio_content`
--

DROP TABLE IF EXISTS `portfolio_content`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `portfolio_content` (
  `id` int NOT NULL AUTO_INCREMENT,
  `section` varchar(50) NOT NULL,
  `content` json NOT NULL,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `section` (`section`)
) ENGINE=InnoDB AUTO_INCREMENT=78 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `portfolio_content`
--

LOCK TABLES `portfolio_content` WRITE;
/*!40000 ALTER TABLE `portfolio_content` DISABLE KEYS */;
INSERT INTO `portfolio_content` VALUES (1,'hero','{\"name\": \"Karthick V\", \"title\": \"Full Stack Developer\", \"tagline\": \"Building digital experiences that combine modern aesthetics with powerful engineering.\"}','2026-06-03 17:56:10'),(2,'about','{\"bio\": \"I am a passionate Computer Science and Engineering student at Shree Venkateshwara Hi-Tech Engineering College, pursuing my B.E. with a focus on modern web development and software engineering. I specialize in building responsive, interactive, and high-performance applications using React, Node.js, Express, and MySQL. With a strong foundation in core concepts like Data Structures, DBMS, and Web Technologies, combined with continuous learning in AI, Cloud Computing, and Prompt Engineering, I am dedicated to crafting clean code and premium digital solutions that solve real-world problems.\"}','2026-06-06 15:55:04'),(3,'skills','{\"backend\": [\"Node.js\", \"Express\", \"MySQL\"], \"frontend\": [\"React\", \"JavaScript\", \"Tailwind CSS\"]}','2026-06-03 17:50:52'),(6,'personal_info','{\"email\": \"v.karthick406@gmail.com\", \"phone\": \"+91 8760466232\", \"github\": \"http://github.com/karthick426\", \"linkedin\": \"https://www.linkedin.com/in/v-karthick-579535301/\", \"location\": \"1/196G Washington Nagar, Tiruppur\", \"location_url\": \"https://maps.app.goo.gl/ypn9P8x1QY8N2TdVA\"}','2026-06-06 15:58:58'),(14,'projects','[{\"id\": 1, \"name\": \"task_management\", \"features\": [], \"live_demo\": \"\", \"repository\": \"https://github.com/karthick426/task_management\", \"description\": \"A personal development project showcasing clean code and modern web practices.\", \"screenshots\": [], \"technologies\": [\"JavaScript\"]}, {\"id\": 2, \"name\": \"personal-portfolio\", \"features\": [], \"live_demo\": \"\", \"repository\": \"https://github.com/karthick426/personal-portfolio\", \"description\": \"A personal development project showcasing clean code and modern web practices.\", \"screenshots\": [], \"technologies\": [\"JavaScript\"]}, {\"id\": 3, \"name\": \"sk_escapes\", \"features\": [\"Dynamic Booking System\", \"Interactive Travel Cards\", \"Responsive Booking Form\", \"Modern UI Animations\"], \"live_demo\": \"https://sk-escapes.vercel.app\", \"repository\": \"https://github.com/karthick426/sk_escapes\", \"description\": \"A dynamic travel planning and escape room booking web application featuring interactive travel cards, customizable itineraries, and a fully responsive client interface.\", \"screenshots\": [], \"technologies\": [\"HTML5\", \"CSS3\", \"JavaScript\", \"Vercel\"]}, {\"id\": 4, \"name\": \"snake_game\", \"features\": [\"Classic Grid Movement\", \"Real-time Score Counter\", \"Dynamic Difficulty Progression\", \"Responsive Layout\"], \"live_demo\": \"\", \"repository\": \"https://github.com/karthick426/snake_game\", \"description\": \"A retro browser-based classic Snake Game built with HTML5 Canvas and JavaScript.\", \"screenshots\": [], \"technologies\": [\"HTML5 Canvas\", \"CSS3\", \"JavaScript\"]}, {\"id\": 5, \"name\": \"training_program\", \"features\": [\"Visual Curriculum Timeline\", \"Interactive Course Details\", \"Modern CSS Layouts\", \"Responsive Timetable\"], \"live_demo\": \"\", \"repository\": \"https://github.com/karthick426/training_program\", \"description\": \"A comprehensive training curriculum and scheduling web application.\", \"screenshots\": [], \"technologies\": [\"HTML5\", \"CSS3\", \"JavaScript\"]}]','2026-06-13 03:19:19'),(27,'education','[{\"cgpa\": \"7.24 / 10\", \"date\": \"May 2027 (Expected)\", \"major\": \"Computer Science and Engineering\", \"degree\": \"Bachelor of Engineering\", \"coursework\": [\"Data Structures\", \"OOP using Java\", \"Web Technologies\", \"Database Management Systems\"], \"university\": \"Shree Venkateshwara Hi-Tech Engineering College\"}]','2026-06-07 12:24:06'),(28,'certifications','[{\"date\": \"Jan 2024\", \"icon\": \"fa-robot\", \"title\": \"Prompt Engineering\", \"issuer\": \"Coursera\"}, {\"date\": \"Nov 2023\", \"icon\": \"fa-code\", \"title\": \"Web Development Bootcamp\", \"issuer\": \"Udemy\"}, {\"date\": \"Sep 2023\", \"icon\": \"fa-brain\", \"title\": \"AI/ML Workshop\", \"issuer\": \"IIT Madras\"}, {\"date\": \"Jul 2023\", \"icon\": \"fa-cloud\", \"title\": \"Cloud Computing\", \"issuer\": \"AWS Educate\"}]','2026-06-07 12:24:06');
/*!40000 ALTER TABLE `portfolio_content` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `resume_downloads`
--

DROP TABLE IF EXISTS `resume_downloads`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `resume_downloads` (
  `id` int NOT NULL AUTO_INCREMENT,
  `download_time` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `ip_address` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `resume_downloads`
--

LOCK TABLES `resume_downloads` WRITE;
/*!40000 ALTER TABLE `resume_downloads` DISABLE KEYS */;
/*!40000 ALTER TABLE `resume_downloads` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `visitors`
--

DROP TABLE IF EXISTS `visitors`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `visitors` (
  `id` int NOT NULL AUTO_INCREMENT,
  `visit_time` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `page_visited` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=224 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `visitors`
--

LOCK TABLES `visitors` WRITE;
/*!40000 ALTER TABLE `visitors` DISABLE KEYS */;
INSERT INTO `visitors` VALUES (1,'2026-06-03 19:09:30','/'),(2,'2026-06-03 19:09:30','/'),(3,'2026-06-03 19:09:31','/'),(4,'2026-06-03 19:09:31','/'),(5,'2026-06-03 19:13:15','/'),(6,'2026-06-03 19:13:15','/'),(7,'2026-06-03 19:13:15','/'),(8,'2026-06-03 19:13:16','/'),(9,'2026-06-03 19:13:16','/'),(10,'2026-06-03 19:14:22','/'),(11,'2026-06-03 19:14:22','/'),(12,'2026-06-03 19:14:22','/'),(13,'2026-06-03 19:14:22','/'),(14,'2026-06-03 19:16:38','/'),(15,'2026-06-03 19:16:38','/'),(16,'2026-06-03 19:16:39','/'),(17,'2026-06-03 19:16:39','/'),(18,'2026-06-03 19:18:35','/'),(19,'2026-06-03 19:18:35','/'),(20,'2026-06-03 19:18:36','/'),(21,'2026-06-03 19:18:36','/'),(22,'2026-06-03 19:18:36','/'),(23,'2026-06-03 19:19:25','/'),(24,'2026-06-03 19:19:25','/'),(25,'2026-06-03 19:19:27','/'),(26,'2026-06-03 19:19:27','/'),(27,'2026-06-03 19:19:27','/'),(28,'2026-06-03 19:19:27','/'),(29,'2026-06-03 19:19:28','/'),(30,'2026-06-03 19:19:28','/'),(31,'2026-06-03 19:19:28','/'),(32,'2026-06-03 19:19:28','/'),(33,'2026-06-03 19:19:29','/'),(34,'2026-06-03 19:19:29','/'),(35,'2026-06-03 19:19:51','/'),(36,'2026-06-03 19:19:51','/'),(37,'2026-06-03 19:19:54','/'),(38,'2026-06-03 19:19:54','/'),(39,'2026-06-03 19:21:40','/'),(40,'2026-06-03 19:21:40','/'),(41,'2026-06-03 19:24:35','/'),(42,'2026-06-03 19:24:35','/'),(43,'2026-06-03 19:24:35','/'),(44,'2026-06-03 19:25:18','/'),(45,'2026-06-03 19:25:18','/'),(46,'2026-06-03 19:28:18','/'),(47,'2026-06-03 19:28:18','/'),(48,'2026-06-03 19:28:19','/'),(49,'2026-06-03 19:28:19','/'),(50,'2026-06-03 19:29:25','/'),(51,'2026-06-03 19:29:25','/'),(52,'2026-06-03 19:29:25','/'),(53,'2026-06-03 19:30:12','/'),(54,'2026-06-03 19:30:12','/'),(55,'2026-06-03 19:30:27','/'),(56,'2026-06-03 19:30:27','/'),(57,'2026-06-03 19:30:27','/'),(58,'2026-06-03 19:31:12','/'),(59,'2026-06-03 19:31:13','/'),(60,'2026-06-03 19:31:13','/'),(61,'2026-06-03 19:31:38','/'),(62,'2026-06-03 19:31:38','/'),(63,'2026-06-03 19:31:38','/'),(64,'2026-06-03 19:32:52','/'),(65,'2026-06-03 19:32:52','/'),(66,'2026-06-03 19:32:52','/'),(67,'2026-06-03 19:33:04','/'),(68,'2026-06-03 19:33:04','/'),(69,'2026-06-03 19:33:21','/'),(70,'2026-06-03 19:33:21','/'),(71,'2026-06-03 19:34:00','/'),(72,'2026-06-03 19:34:00','/'),(73,'2026-06-03 19:35:23','/'),(74,'2026-06-03 19:35:23','/'),(75,'2026-06-03 19:36:10','/'),(76,'2026-06-03 19:36:10','/'),(77,'2026-06-03 19:38:50','/'),(78,'2026-06-03 19:38:50','/'),(79,'2026-06-03 19:42:06','/'),(80,'2026-06-03 19:42:06','/'),(81,'2026-06-03 19:42:15','/'),(82,'2026-06-03 19:42:15','/'),(83,'2026-06-03 19:45:25','/'),(84,'2026-06-03 19:45:25','/'),(85,'2026-06-03 19:46:45','/'),(86,'2026-06-03 19:46:45','/'),(87,'2026-06-04 03:18:01','/'),(88,'2026-06-04 03:18:01','/'),(89,'2026-06-04 03:20:16','/'),(90,'2026-06-04 03:20:16','/'),(91,'2026-06-04 03:20:56','/'),(92,'2026-06-04 03:20:56','/'),(93,'2026-06-04 03:22:42','/'),(94,'2026-06-04 03:22:42','/'),(95,'2026-06-04 03:23:35','/'),(96,'2026-06-04 03:23:35','/'),(97,'2026-06-04 03:23:35','/'),(98,'2026-06-04 03:24:29','/'),(99,'2026-06-04 03:24:30','/'),(100,'2026-06-04 03:24:30','/'),(101,'2026-06-04 03:24:58','/'),(102,'2026-06-04 03:24:58','/'),(103,'2026-06-04 03:24:58','/'),(104,'2026-06-04 03:25:47','/'),(105,'2026-06-04 03:25:47','/'),(106,'2026-06-04 03:25:47','/'),(107,'2026-06-04 03:26:08','/'),(108,'2026-06-04 03:26:08','/'),(109,'2026-06-04 03:26:08','/'),(110,'2026-06-04 03:27:15','/'),(111,'2026-06-04 03:27:15','/'),(112,'2026-06-04 03:27:15','/'),(113,'2026-06-04 03:27:35','/'),(114,'2026-06-04 03:27:35','/'),(115,'2026-06-04 03:27:35','/'),(116,'2026-06-04 03:28:26','/'),(117,'2026-06-04 03:28:26','/'),(118,'2026-06-04 03:28:26','/'),(119,'2026-06-04 03:44:13','/'),(120,'2026-06-04 03:44:14','/'),(121,'2026-06-04 03:44:14','/'),(122,'2026-06-04 03:44:52','/'),(123,'2026-06-04 03:44:52','/'),(124,'2026-06-04 03:44:52','/'),(125,'2026-06-04 04:36:12','/'),(126,'2026-06-04 04:36:12','/'),(127,'2026-06-04 04:39:12','/'),(128,'2026-06-04 04:39:12','/'),(129,'2026-06-04 04:39:34','/'),(130,'2026-06-04 04:39:34','/'),(131,'2026-06-04 04:39:43','/'),(132,'2026-06-04 04:39:43','/'),(133,'2026-06-04 04:44:46','/'),(134,'2026-06-04 04:44:46','/'),(135,'2026-06-04 04:45:28','/'),(136,'2026-06-04 04:45:28','/'),(137,'2026-06-04 04:47:12','/'),(138,'2026-06-04 04:47:12','/'),(139,'2026-06-04 04:48:02','/'),(140,'2026-06-04 04:48:02','/'),(141,'2026-06-04 05:01:31','/'),(142,'2026-06-04 05:01:31','/'),(143,'2026-06-04 05:03:16','/'),(144,'2026-06-04 05:03:16','/'),(145,'2026-06-04 05:04:08','/'),(146,'2026-06-04 05:04:08','/'),(147,'2026-06-04 05:04:28','/'),(148,'2026-06-04 05:04:28','/'),(149,'2026-06-04 05:05:05','/'),(150,'2026-06-04 05:05:05','/'),(151,'2026-06-04 05:08:18','/'),(152,'2026-06-04 05:08:18','/'),(153,'2026-06-05 13:45:02','/'),(154,'2026-06-05 13:45:02','/'),(155,'2026-06-05 13:46:06','/'),(156,'2026-06-05 13:46:06','/'),(157,'2026-06-05 16:19:34','/'),(158,'2026-06-05 16:19:34','/'),(159,'2026-06-05 16:25:54','/'),(160,'2026-06-05 16:25:54','/'),(161,'2026-06-05 16:34:55','/'),(162,'2026-06-05 16:34:55','/'),(163,'2026-06-05 16:40:39','/'),(164,'2026-06-05 16:40:39','/'),(165,'2026-06-06 02:32:18','/'),(166,'2026-06-06 02:32:18','/'),(167,'2026-06-06 03:34:27','/'),(168,'2026-06-06 03:34:27','/'),(169,'2026-06-06 03:36:05','/'),(170,'2026-06-06 03:36:05','/'),(171,'2026-06-06 04:12:50','/'),(172,'2026-06-06 04:12:50','/'),(173,'2026-06-06 04:17:49','/'),(174,'2026-06-06 04:17:49','/'),(175,'2026-06-06 12:08:02','/'),(176,'2026-06-06 12:08:02','/'),(177,'2026-06-06 12:18:28','/'),(178,'2026-06-06 12:18:28','/'),(179,'2026-06-06 12:24:54','/'),(180,'2026-06-06 12:24:54','/'),(181,'2026-06-06 12:27:51','/'),(182,'2026-06-06 12:27:51','/'),(183,'2026-06-06 12:29:31','/'),(184,'2026-06-06 12:29:31','/'),(185,'2026-06-06 12:30:45','/'),(186,'2026-06-06 12:30:45','/'),(187,'2026-06-06 12:39:02','/'),(188,'2026-06-06 12:39:02','/'),(189,'2026-06-06 12:44:02','/'),(190,'2026-06-06 12:44:02','/'),(191,'2026-06-06 12:49:49','/'),(192,'2026-06-06 12:49:49','/'),(193,'2026-06-06 15:37:58','/'),(194,'2026-06-06 15:37:58','/'),(195,'2026-06-06 15:40:42','/'),(196,'2026-06-06 15:40:42','/'),(197,'2026-06-06 15:41:41','/'),(198,'2026-06-06 15:41:41','/'),(199,'2026-06-06 15:42:04','/'),(200,'2026-06-06 15:42:04','/'),(201,'2026-06-06 15:55:19','/'),(202,'2026-06-06 15:55:19','/'),(203,'2026-06-06 15:59:15','/'),(204,'2026-06-06 15:59:15','/'),(205,'2026-06-06 17:20:37','/'),(206,'2026-06-06 17:20:37','/'),(207,'2026-06-06 17:45:35','/'),(208,'2026-06-06 17:45:35','/'),(209,'2026-06-07 07:35:18','/'),(210,'2026-06-07 07:35:18','/'),(211,'2026-06-07 12:18:27','/'),(212,'2026-06-07 12:18:27','/'),(213,'2026-06-07 12:18:27','/'),(214,'2026-06-07 12:18:27','/'),(215,'2026-06-07 12:19:10','/'),(216,'2026-06-07 12:19:10','/'),(217,'2026-06-07 13:15:00','/'),(218,'2026-06-07 13:15:01','/'),(219,'2026-06-07 13:36:52','/'),(220,'2026-06-13 03:19:54','/'),(221,'2026-06-13 03:19:54','/'),(222,'2026-06-13 03:21:37','/'),(223,'2026-06-13 03:21:37','/');
/*!40000 ALTER TABLE `visitors` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-06-13  8:54:46
