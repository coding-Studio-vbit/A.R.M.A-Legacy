# Getting Started
To get a local copy up and running follow these simple steps.

## Prerequisites
1. Download the Node.js source code or a pre-built installer for your platform at https://nodejs.org/en/download/
2. Download and Install PostgreSQL at https://www.postgresql.org/download/

## Setting up Backend

* Open the psql command-line tool, Run a CREATE DATABASE command to create a new database using:
```
CREATE DATABASE armadb;
```
* Connect to the new database using the command:
```
\c armadb;
```
* Creating the Forums table:
```
CREATE TABLE forums(
	forum_name varchar(128) PRIMARY KEY,
	pwd_hash varchar(128),
	email varchar(128) UNIQUE,
	phone_no varchar(11),
	actual_name varchar(128) UNIQUE NOT NULL
);
```
* Creating the Faculty table:
```
CREATE TABLE faculty(
	faculty_roll varchar(11) PRIMARY KEY,
	faculty_name varchar(128) UNIQUE,
	faculty_dept varchar(8),
	email varchar(128),
	phone_no varchar(11),
	pwd_hash varchar(128)
);
```
* Creating the requests table:
```
CREATE TABLE recipients(
	request_id int REFERENCES requests(request_id) ON DELETE CASCADE,
	faculty_roll varchar(11) REFERENCES faculty(faculty_roll) ON DELETE CASCADE,
	approved boolean
);
```
* Creating the personal templates table:
```
CREATE TABLE personal_templates(
	forum_name varchar(128) REFERENCES forums(forum_name) ON DELETE CASCADE,
	template_name varchar(64),
	filepath varchar(512)
);
```
* Creating the Faculty Registration Request table:
```
Create table faculty_registration_request(
faculty_name varchar(128),faculty_dept varchar(8),faculty_roll varchar(11),email varchar(128),phone varchar(11)
);
```
* Creating the Forum Registration Request table
```
Create table forum_registration_request(forum_name varchar(128),email varchar(128),phone varchar(11));
```
* Creating the Facilities Table
```
Create table facilities(
	facility_name varchar(128) PRIMARY KEY,
	timings jsonb
);
```
### Run Backend
```
$ cd backend
$ npm install
$ nodemon server.js
```
### Add a .env file in backend folder
```
SECRET_ACCESS_TOKEN=[your-secret-access-token]
PASSWORD=[your-psql-password]
USERMAIL=[your-nodemailer-email]
DATABASE_URL: '[your-database-url]'
PORT=7321
```
