/*
Navicat MySQL Data Transfer

Source Server         : my_db_01
Source Server Version : 50726
Source Host           : localhost:3306
Source Database       : my_db_01

Target Server Type    : MYSQL
Target Server Version : 50726
File Encoding         : 65001

Date: 2023-02-24 20:48:15
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for users
-- ----------------------------
DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `admin` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of users
-- ----------------------------
INSERT INTO `users` VALUES ('1', 'aaa123', '123456', '管理员');
INSERT INTO `users` VALUES ('2', 'aaa111', '123456', '用户');

-- ----------------------------
-- Table structure for warehouse
-- ----------------------------
DROP TABLE IF EXISTS `warehouse`;
CREATE TABLE `warehouse` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) DEFAULT NULL,
  `category` varchar(255) DEFAULT NULL,
  `transport` varchar(255) DEFAULT NULL,
  `type` varchar(255) DEFAULT NULL,
  `buycost` int(11) DEFAULT NULL,
  `trancost` int(11) DEFAULT NULL,
  `unit` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of warehouse
-- ----------------------------
INSERT INTO `warehouse` VALUES ('3', '啊啊啊啊', '电器类', '公路运输', '农民', '11', '22', '片');
