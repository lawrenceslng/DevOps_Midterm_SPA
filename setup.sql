-- create the databases
CREATE DATABASE IF NOT EXISTS aircraft_spotter;

USE aircraft_spotter;

CREATE TABLE IF NOT EXISTS aircraft_logs (
    id INT AUTO_INCREMENT PRIMARY KEY,
    registration VARCHAR(255) NOT NULL,
    type VARCHAR(255),
    location VARCHAR(255)
);