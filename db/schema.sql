DROP DATABASE IF EXISTS titration_db;
CREATE DATABASE titration_db;
USE titration_db;

DROP TABLE IF EXISTS acids;
CREATE TABLE acids(
id INT Auto_Increment,
acid_name VARCHAR(50),
pKa FLOAT(4),
Ka FLOAT(10),
Primary Key (id),
CONSTRAINT UC_acid_name UNIQUE (acid_name)  
);

SELECT*FROM acids;

SELECT acid_name FROM acids;