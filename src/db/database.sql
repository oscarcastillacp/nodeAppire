create database IF NOT EXISTS  companydb;

use companydb

Create table employee{
    id int(11) NOT NULL AUTO_INCREMENT,
    name varchar(45) DEFAULT NULL,
    salary INT(5) DEFAULT NULL,
    PRIMARY KEY(id)
};