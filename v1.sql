-- MySQL dump 10.13  Distrib 8.0.36, for Win64 (x86_64)
--
-- Host: 10.6.38.131    Database: se
-- ------------------------------------------------------
-- Server version	8.3.0

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
-- Table structure for table `department_complaint`
--

DROP TABLE IF EXISTS `department_complaint`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `department_complaint` (
  `date` datetime NOT NULL,
  `topic name` varchar(200) NOT NULL,
  `teacher name` varchar(45) NOT NULL,
  `user detail` varchar(500) NOT NULL,
  PRIMARY KEY (`teacher name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `department_complaint`
--

LOCK TABLES `department_complaint` WRITE;
/*!40000 ALTER TABLE `department_complaint` DISABLE KEYS */;
INSERT INTO `department_complaint` VALUES ('2024-01-30 00:00:00','ตรวจสอบการจัดตารางซ้ำ','Vacharapat Metthanan','ตรวจสอบการจัดตารางซ้ำให้หน่อย ของรายวิชา xxxxxx ว่าซ้ำหรือป่าว');
/*!40000 ALTER TABLE `department_complaint` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `department_import`
--

DROP TABLE IF EXISTS `department_import`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `department_import` (
  `subject id` varchar(45) NOT NULL,
  `subject name` varchar(100) NOT NULL,
  `subject credit` int NOT NULL,
  `subject required` tinyint NOT NULL,
  PRIMARY KEY (`subject id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `department_import`
--

LOCK TABLES `department_import` WRITE;
/*!40000 ALTER TABLE `department_import` DISABLE KEYS */;
INSERT INTO `department_import` VALUES ('03603341-60','Software Engineering',4,1),('03603423-60','Network Programming\n\n',3,0);
/*!40000 ALTER TABLE `department_import` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `filter_field`
--

DROP TABLE IF EXISTS `filter_field`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `filter_field` (
  `field_id` varchar(10) NOT NULL,
  PRIMARY KEY (`field_id`),
  UNIQUE KEY `field_code_UNIQUE` (`field_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `filter_field`
--

LOCK TABLES `filter_field` WRITE;
/*!40000 ALTER TABLE `filter_field` DISABLE KEYS */;
INSERT INTO `filter_field` VALUES ('T02'),('T03'),('T04'),('T05'),('T07'),('T08'),('T12'),('T13'),('T14'),('T17'),('T18'),('T19'),('T20'),('T22'),('T23');
/*!40000 ALTER TABLE `filter_field` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `filter_require`
--

DROP TABLE IF EXISTS `filter_require`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `filter_require` (
  `is_required` tinyint NOT NULL,
  PRIMARY KEY (`is_required`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `filter_require`
--

LOCK TABLES `filter_require` WRITE;
/*!40000 ALTER TABLE `filter_require` DISABLE KEYS */;
INSERT INTO `filter_require` VALUES (0),(1);
/*!40000 ALTER TABLE `filter_require` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `filter_year`
--

DROP TABLE IF EXISTS `filter_year`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `filter_year` (
  `year` int unsigned NOT NULL,
  PRIMARY KEY (`year`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `filter_year`
--

LOCK TABLES `filter_year` WRITE;
/*!40000 ALTER TABLE `filter_year` DISABLE KEYS */;
INSERT INTO `filter_year` VALUES (55),(60),(65);
/*!40000 ALTER TABLE `filter_year` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `note`
--

DROP TABLE IF EXISTS `note`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `note` (
  `iduser` int NOT NULL,
  `idnote` int NOT NULL AUTO_INCREMENT,
  `firstname_user` varchar(45) DEFAULT NULL,
  `lastname_user` varchar(45) DEFAULT NULL,
  `email_user` varchar(45) NOT NULL,
  `phoneNumber_user` varchar(45) NOT NULL,
  `note` text,
  PRIMARY KEY (`idnote`),
  UNIQUE KEY `idnote_UNIQUE` (`idnote`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `note`
--

LOCK TABLES `note` WRITE;
/*!40000 ALTER TABLE `note` DISABLE KEYS */;
INSERT INTO `note` VALUES (9,1,'test','testtest','test@gmail.com','888888','Help me!!');
/*!40000 ALTER TABLE `note` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `noti`
--

DROP TABLE IF EXISTS `noti`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `noti` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `info` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `noti`
--

LOCK TABLES `noti` WRITE;
/*!40000 ALTER TABLE `noti` DISABLE KEYS */;
INSERT INTO `noti` VALUES (1,'test','ต้องการห้อง LAB COM 23 เวลา 18.00 น.'),(2,'Polkrit','ห้องDAT เวลา09.00'),(3,'Test01','ห้องDAT เวลา 13.00');
/*!40000 ALTER TABLE `noti` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `subject`
--

DROP TABLE IF EXISTS `subject`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `subject` (
  `subject_id` int NOT NULL,
  `subject_name` varchar(100) NOT NULL,
  PRIMARY KEY (`subject_id`),
  UNIQUE KEY `iduser_info_UNIQUE` (`subject_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `subject`
--

LOCK TABLES `subject` WRITE;
/*!40000 ALTER TABLE `subject` DISABLE KEYS */;
INSERT INTO `subject` VALUES (1101001,'Gen Eco'),(1111111,'test'),(11010012,'Gen Eco2');
/*!40000 ALTER TABLE `subject` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `teacher`
--

DROP TABLE IF EXISTS `teacher`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `teacher` (
  `teacherID` int DEFAULT NULL,
  `teacherName` text,
  `teacherMail` text,
  `teacherFaculty` text
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `teacher`
--

LOCK TABLES `teacher` WRITE;
/*!40000 ALTER TABLE `teacher` DISABLE KEYS */;
INSERT INTO `teacher` VALUES (1,'Vacharapat Mettanant','vacharapat@eng.src.ku.ac.th','ภาควิชาวิศวกรรมคอมพิวเตอร์'),(2,'Natthapon Pannurat','natthapon.p@eng.src.ku.ac.th','ภาควิชาวิศวกรรมคอมพิวเตอร์'),(3,'Jirawat Jitprasutwit','jirawat@eng.src.ku.ac.th','ภาควิชาวิศวกรรมคอมพิวเตอร์'),(4,'Anan Banharnsakun','anan@eng.src.ku.ac.th','ภาควิชาวิศวกรรมคอมพิวเตอร์'),(5,'Prawit ChumChu','prawit@eng.src.ku.ac.th','ภาควิชาวิศวกรรมคอมพิวเตอร์'),(6,'Penpun Chaihuadjaroen','penpun@eng.src.ku.ac.th','ภาควิชาวิศวกรรมคอมพิวเตอร์'),(7,'Kanjana Eiamsaard','kanjana@eng.src.ku.ac.th','ภาควิชาวิศวกรรมคอมพิวเตอร์'),(8,'Nut Aroon','nut@eng.src.ku.ac.th','ภาควิชาวิศวกรรมคอมพิวเตอร์'),(9,'Tamnuwat Valeeprakhon','tamnuwat@eng.src.ku.ac.th','ภาควิชาวิศวกรรมคอมพิวเตอร์'),(10,'Adisak Supeesun','adisak@eng.src.ku.ac.th','ภาควิชาวิศวกรรมคอมพิวเตอร์'),(11,'Kulwadee Somboonviwat','kulwadee@eng.src.ku.ac.th','ภาควิชาวิศวกรรมคอมพิวเตอร์'),(12,'Korawit Orkphol','korawit@eng.src.ku.ac.th','ภาควิชาวิศวกรรมคอมพิวเตอร์'),(13,'Nanta Janpitak','nanta@eng.src.ku.ac.th','ภาควิชาวิศวกรรมคอมพิวเตอร์'),(14,'Taneeya Satyapanich','taneeya@eng.src.ku.ac.th','ภาควิชาวิศวกรรมคอมพิวเตอร์'),(15,'Pairat Sroytong','pairat@eng.src.ku.ac.th','ภาควิชาวิศวกรรมคอมพิวเตอร์'),(16,'Montri Phothisonothai','montri@eng.src.ku.ac.th','ภาควิชาวิศวกรรมคอมพิวเตอร์'),(17,'Poonna Yospanya','poonna@eng.src.ku.ac.th','ภาควิชาวิศวกรรมคอมพิวเตอร์'),(18,'Prasitthichai Naronglerdrit','prasitthichai@eng.src.ku.ac.th','ภาควิชาวิศวกรรมคอมพิวเตอร์'),(19,'Kathawach Satianpakiranakorn','kathawach@eng.src.ku.ac.th','ภาควิชาวิศวกรรมคอมพิวเตอร์'),(20,'Pongsatorn Thomya','pongsatorn.t@eng.src.ku.ac.th','ภาควิชาวิศวกรรมคอมพิวเตอร์'),(21,'Tanet Wonghong','tanet@eng.src.ku.ac.th','ภาควิชาวิศวกรรมไฟฟ้า'),(22,'Pairote Thongprasri','pairote@eng.src.ku.ac.th','ภาควิชาวิศวกรรมไฟฟ้า'),(23,'Veerapol Monyakul','veerapol@eng.src.ku.ac.th','ภาควิชาวิศวกรรมไฟฟ้า'),(24,'Uthane Supatti','uthane@eng.src.ku.ac.th','ภาควิชาวิศวกรรมไฟฟ้า'),(25,'Suphattharachai Chomphan','suphattharachai@eng.src.ku.ac.th','ภาควิชาวิศวกรรมไฟฟ้า'),(26,'Prechanon Kumkratug','prechanon@eng.src.ku.ac.th','ภาควิชาวิศวกรรมไฟฟ้า'),(27,'Nattaya Klairuang','nattaya@eng.src.ku.ac.th','ภาควิชาวิศวกรรมไฟฟ้า'),(28,'Sarinee Ouitrakul','sarinee@eng.src.ku.ac.th','ภาควิชาวิศวกรรมไฟฟ้า'),(29,'Sirichai Wattanasophon','sirichai@eng.src.ku.ac.th','ภาควิชาวิศวกรรมไฟฟ้า'),(30,'Wason Tanjaroen','wason@eng.src.ku.ac.th','ภาควิชาวิศวกรรมไฟฟ้า'),(31,'Umarin Sangpanich','umarin@eng.src.ku.ac.th','ภาควิชาวิศวกรรมไฟฟ้า'),(32,'Chairerg Jakpattanajit','chairerg@eng.src.ku.ac.th','ภาควิชาวิศวกรรมไฟฟ้า'),(33,'Songchai Jitpakdeebodin','songchai@eng.src.ku.ac.th','ภาควิชาวิศวกรรมไฟฟ้า'),(34,'Nattapon Boonyapakdee','nattapon.b@eng.src.ku.ac.th','ภาควิชาวิศวกรรมไฟฟ้า'),(35,'Paisak Poolphaka','paisak@eng.src.ku.ac.th','ภาควิชาวิศวกรรมไฟฟ้า'),(36,'Theeraphong Srichiangsa','theeraphong@eng.src.ku.ac.th','ภาควิชาวิศวกรรมไฟฟ้า'),(37,'Kirote Arpanutud','kirote@eng.src.ku.ac.th','ภาควิชาวิศวกรรมไฟฟ้า'),(38,'Piyapath Siratarnsophon','piyapath@eng.src.ku.ac.th','ภาควิชาวิศวกรรมไฟฟ้า'),(39,'Wasan Sinthuyot','wasan@eng.src.ku.ac.th','ภาควิชาวิศวกรรมไฟฟ้า'),(40,'Komsan Sununrungangkana','komsan@eng.src.ku.ac.th','ภาควิชาวิศวกรรมไฟฟ้า'),(41,'Sathaporn Chuepeng','schuepeng@eng.src.ku.ac.th','ภาควิชาวิศวกรรมเครื่องกล'),(42,'Nattapon Chantarapanich','nattapon@eng.src.ku.ac.th','ภาควิชาวิศวกรรมเครื่องกล'),(43,'Ob Nilaphai','ob@eng.src.ku.ac.th','ภาควิชาวิศวกรรมเครื่องกล'),(44,'Jirarote Buranarote','jirarote@eng.src.ku.ac.th','ภาควิชาวิศวกรรมเครื่องกล'),(45,'Suabsakul Gururatana','suabsakul@eng.src.ku.ac.th','ภาควิชาวิศวกรรมเครื่องกล'),(46,'Rotchana Prapainop','rotchana@eng.src.ku.ac.th','ภาควิชาวิศวกรรมเครื่องกล'),(47,'Karan Sengpanich','karan.sengpanich@gmail.com','ภาควิชาวิศวกรรมเครื่องกล'),(48,'Poranat Visuwan','poranat@eng.src.ku.ac.th','ภาควิชาวิศวกรรมเครื่องกล'),(49,'Sompop Jarungthammachote','sompop@eng.src.ku.ac.th','ภาควิชาวิศวกรรมเครื่องกล'),(50,'Boonthum Wongchai','boonthum@eng.src.ku.ac.th','ภาควิชาวิศวกรรมเครื่องกล'),(51,'Supat Patvichaichod','supat@eng.src.ku.ac.th','ภาควิชาวิศวกรรมเครื่องกล'),(52,'Prateep Chaisermtawan','prateep@eng.src.ku.ac.th','ภาควิชาวิศวกรรมเครื่องกล'),(53,'Sompol Skullong','sompol@eng.src.ku.ac.th','ภาควิชาวิศวกรรมเครื่องกล'),(54,'Rattapol Sakornsin','rattapol@eng.src.ku.ac.th','ภาควิชาวิศวกรรมเครื่องกล'),(55,'Sujin Wanchat','sujin@eng.src.ku.ac.th','ภาควิชาวิศวกรรมเครื่องกล'),(56,'Kittipong Yaovaja','kittipong@eng.src.ku.ac.th','ภาควิชาวิศวกรรมเครื่องกล'),(57,'Pongsakon Bamrungthai','pongsakon@eng.src.ku.ac.th','ภาควิชาวิศวกรรมเครื่องกล'),(58,'Manida Tongroon','manida@eng.src.ku.ac.th','ภาควิชาวิศวกรรมเครื่องกล'),(59,'Rodolphe Perrin','rodolphe@eng.src.ku.ac.th','ภาควิชาวิศวกรรมเครื่องกล'),(60,'Sakda Thongchai','sakda@eng.src.ku.ac.th','ภาควิชาวิศวกรรมเครื่องกล'),(61,'Attaphon Chaimanatsakun','attaphon@eng.src.ku.ac.th','ภาควิชาวิศวกรรมเครื่องกล'),(62,'Sutartip Wittayapiyanon','sutartip@eng.src.ku.ac.th','ภาควิชาวิศวกรรมเครื่องกล'),(63,'Theepakorn Kaewsa-ang','theepakorn@eng.src.ku.ac.th','ภาควิชาวิศวกรรมเครื่องกล'),(64,'Pongthep Charoenchaow','pongthep@eng.src.ku.ac.th','ภาควิชาวิศวกรรมเครื่องกล'),(65,'Jakkarin Klunngien','jakkarin@eng.src.ku.ac.th','ภาควิชาวิศวกรรมอุตสาหการ'),(66,'Nantawut Sriariyawat','nantawut@eng.src.ku.ac.th','ภาควิชาวิศวกรรมอุตสาหการ'),(67,'Prapapan Ketsarapong','prapapan@eng.src.ku.ac.th','ภาควิชาวิศวกรรมอุตสาหการ'),(68,'Jiraporn Pradabwong','jiraporn@eng.src.ku.ac.th','ภาควิชาวิศวกรรมอุตสาหการ'),(69,'Chettha Chamnanlor','chettha@eng.src.ku.ac.th','ภาควิชาวิศวกรรมอุตสาหการ'),(70,'Chaiwat Numthong','chaiwat@eng.src.ku.ac.th','ภาควิชาวิศวกรรมอุตสาหการ'),(71,'Natthavika Chansri','natthavika@eng.src.ku.ac.th','ภาควิชาวิศวกรรมอุตสาหการ'),(72,'Pensuda Phanritdum','pensuda@eng.src.ku.ac.th','ภาควิชาวิศวกรรมอุตสาหการ'),(73,'Sirirat Juttijudata','sirirat@eng.src.ku.ac.th','ภาควิชาวิศวกรรมอุตสาหการ'),(74,'Sirang Klankamsorn','sirang@eng.src.ku.ac.th','ภาควิชาวิศวกรรมอุตสาหการ'),(75,'Janjira Kongchuenjai','janjira_k@eng.src.ku.ac.th','ภาควิชาวิศวกรรมอุตสาหการ'),(76,'Thanapan Kongtong','thanapan@eng.src.ku.ac.th','ภาควิชาวิศวกรรมอุตสาหการ'),(77,'Chirakiat Saithong','chirakiat@eng.src.ku.ac.th','ภาควิชาวิศวกรรมอุตสาหการ'),(78,'Thittikorn Phattanaphibul','thittikorn@eng.src.ku.ac.th','ภาควิชาวิศวกรรมอุตสาหการ'),(79,'Chakapan Chanpilom','chakapan@eng.src.ku.ac.th','ภาควิชาวิศวกรรมอุตสาหการ'),(80,'Sophin Plodthao','sophin@eng.src.ku.ac.th','ภาควิชาวิศวกรรมอุตสาหการ'),(81,'Daraporn Phusing','daraporn@eng.src.ku.ac.th','ภาควิชาวิศวกรรมโยธา'),(82,'Anuwat Attachaiyawuth','anuwat@eng.src.ku.ac.th','ภาควิชาวิศวกรรมโยธา'),(83,'Watcharin Witayakul','-','ภาควิชาวิศวกรรมโยธา'),(84,'Tawatchai Tingsanchali','tawatchai@eng.src.ku.ac.th','ภาควิชาวิศวกรรมโยธา'),(85,'Thanapol Yanweerasak','thanapol@eng.src.ku.ac.th','ภาควิชาวิศวกรรมโยธา'),(86,'Pulpong Pongvithayapanu','pulpong@eng.src.ku.ac.th','ภาควิชาวิศวกรรมโยธา'),(87,'Sakaradhorn Boontaveeyuwat','sakaradhorn@eng.src.ku.ac.th','ภาควิชาวิศวกรรมโยธา'),(88,'Supatchaya Chuanpongpanich','supatchaya@eng.src.ku.ac.th','ภาควิชาวิศวกรรมโยธา'),(89,'Narongrit Wongwai','narongrit@eng.src.ku.ac.th','ภาควิชาวิศวกรรมโยธา'),(90,'Sakaradhorn Boontaveeyuwat','sakaradhorn@eng.src.ku.ac.th','ภาควิชาวิศวกรรมโยธา'),(91,'Thanasit Promping','thanasit@eng.src.ku.ac.th','ภาควิชาวิศวกรรมโยธา'),(92,'Chutipat Fayhirun','chutipat@eng.src.ku.ac.th','ภาควิชาวิศวกรรมโยธา'),(93,'Piyapong Srirat','piyapong@eng.src.ku.ac.th','ภาควิชาวิศวกรรมโยธา'),(94,'Burachat Kasuyee','burachat@eng.src.ku.ac.th','ภาควิชาวิศวกรรมโยธา'),(95,'Porjan Tuttipongsawat','porjan@eng.src.ku.ac.th','ภาควิชาวิศวกรรมโยธา'),(96,'Sutasinee Intui','sutasinee@eng.src.ku.ac.th','ภาควิชาวิศวกรรมโยธา'),(97,'Niyom Saenmontree','niyom@eng.src.ku.ac.th','ภาควิชาวิศวกรรมโยธา'),(98,'Sathapat Arriworaphon','sathapat@eng.src.ku.ac.th','ภาควิชาวิศวกรรมโยธา'),(99,'Totsatum Duoadkhunthod','totsatam@eng.src.ku.ac.th','ภาควิชาวิศวกรรมโยธา');
/*!40000 ALTER TABLE `teacher` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `iduser` int NOT NULL AUTO_INCREMENT,
  `firstname_user` varchar(45) COLLATE utf8mb4_0900_as_cs DEFAULT NULL,
  `lastname_user` varchar(45) COLLATE utf8mb4_0900_as_cs DEFAULT NULL,
  `faculty_user` varchar(45) COLLATE utf8mb4_0900_as_cs DEFAULT NULL,
  `department_user` varchar(45) COLLATE utf8mb4_0900_as_cs DEFAULT NULL,
  `email_user` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `phoneNumber_user` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `role_user` varchar(45) COLLATE utf8mb4_0900_as_cs DEFAULT NULL,
  PRIMARY KEY (`iduser`,`email_user`,`phoneNumber_user`),
  UNIQUE KEY `iduser_UNIQUE` (`iduser`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_as_cs;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'Poomlak ','Promdontri',NULL,NULL,'poomlak.p@ku.th','123','Admin'),(2,'Nanfha','Sutthikul',NULL,NULL,'nanfha.s@ku.th','456','Admin'),(3,'Polkrit','Tikhana',NULL,NULL,'polkrit.t@live.ku.th','789','Admin'),(4,'Chanitpol','Saengraksa',NULL,NULL,'Chanitpol.s@ku.th','111213','Admin'),(5,'Wasupon','Somwang',NULL,NULL,'wasupon.so@ku.th','141516','Admin'),(6,'Kannipit','Pornpayap',NULL,NULL,'kannipit.p@ku.th','171819','Admin'),(7,'Patcharapon','Kajornklin',NULL,NULL,'patcharapon.kaj@ku.th','202122','Admin'),(8,'Surakan','Machan',NULL,NULL,'surakan.m@ku.th','232425','Admin'),(9,'test','testtest',NULL,NULL,'test@gmail.com','888888','Teacher');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-01-30 21:46:09
