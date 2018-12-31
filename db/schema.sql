DROP DATABASE IF EXISTS burgers_DB;
CREATE DATABASE burgers_DB;

USE burgers_DB;

CREATE TABLE burgers (
    id INTEGER NOT NULL AUTO_INCREMENT PRIMARY KEY,
    burger_name VARCHAR (50),
    devoured BOOLEAN false
);

