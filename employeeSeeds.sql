DROP DATABASE IF EXISTS employeeDB;
CREATE DATABASE employeeDB;
USE employeeDB;

CREATE TABLE department(
  id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(30),
  PRIMARY KEY (id)
);

CREATE TABLE role(
  id INT NOT NULL AUTO_INCREMENT,
  title VARCHAR(30),
  salary DECIMAL(10,2) NULL,
  department_id INT NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE employee(
  id INT NOT NULL AUTO_INCREMENT,
  first_name VARCHAR(30),
  last_name VARCHAR(30),
  role_id INT NOT NULL,
  manager_id INT,
  PRIMARY KEY (id)
);

INSERT INTO department (name)
VALUES ("Engineering");

INSERT INTO role (title, salary, department_id)
VALUES ("Senior Engineer", 80000.25, 1);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Paul", "Viola", 1);

INSERT INTO department (name)
VALUES ("Accounting");

INSERT INTO role (title, salary, department_id)
VALUES ("Acccountant", 60000.50, 2);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Tay", "May", 2, 1);

INSERT INTO department (name)
VALUES ("Sales");

INSERT INTO role (title, salary, department_id)
VALUES ("sales lead", 100000.75, 3);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Ruben", "Flores", 3, 1);



SELECT * FROM department;
SELECT * FROM role;
SELECT * FROM employee;

