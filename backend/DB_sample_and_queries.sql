Creating the Database:
======================

CREATE DATABASE armadb;

Creating the Forums table:
==========================

CREATE TABLE forums(
	forum_name varchar(128) PRIMARY KEY,
	pwd_hash varchar(128),
	email varchar(128) UNIQUE,
	phone_no varchar(11),
	actual_name varchar(128) UNIQUE NOT NULL
);

Creating the Faculty table:
===========================

CREATE TABLE faculty(
	faculty_roll varchar(11) PRIMARY KEY,
	faculty_name varchar(128) UNIQUE,
	faculty_dept varchar(8),
	email varchar(128),
	phone_no varchar(11),
	pwd_hash varchar(128)
);

Creating the requests table:
============================

CREATE TABLE requests(
	request_id SERIAL PRIMARY KEY,
	forum_name varchar(128) REFERENCES forums(forum_name) ON DELETE CASCADE,
	unique_id varchar(10) UNIQUE,
	request_data jsonb,
	status varchar(10),
  	remarks varchar(1024)
);

Creating the recipients table:
==============================

CREATE TABLE recipients(
	request_id int REFERENCES requests(request_id) ON DELETE CASCADE,
	faculty_roll varchar(11) REFERENCES faculty(faculty_roll) ON DELETE CASCADE
);

Creating the personal templates table:
======================================

CREATE TABLE personal_templates(
	forum_name varchar(128) REFERENCES forums(forum_name) ON DELETE CASCADE,
	template_name varchar(64),
	filepath varchar(512)
);

Creating the Faculty Registration Request table
===============================================
Create table faculty_registration_request(faculty_name varchar(128),faculty_dept varchar(8),faculty_roll varchar(11),email varchar(128),phone varchar(11));
Creating the Forum Registration Request table
=============================================
Create table forum_registration_request(forum_name varchar(128),email varchar(128),phone varchar(11));

Creating the Facilities Table
==============================

Create table facilities(
	facility_name varchar(128) PRIMARY KEY,
	timings jsonb
);

-----------------------------------------------------------------------------------------------------------------------------------------------
forum_name  |                           pwd_hash                           |     email     |  phone_no
--------------+--------------------------------------------------------------+---------------+------------
STREETCAUSE  | $2a$10$z5Gjm0JT32h/BSIbZ9.zruHQJW6qknt2L6bcin6Ef.ZPBntq5xeAm | c2@csmail.com | 9999999999
STUTALK      | $2a$10$XfkbtU87zINaOX06m4LCGu2njF1.EdVpNDO/ZcnxfgNDyLXhUzqim | c3@csmail.com | 9999999999
IEEE-VBIT    | $2a$10$vVJUXxR4hCRDjQEQPrv1Nepvhk07u/lECP5duKBnuthX/2UnIKmtm | c5@csmail.com | 9999999999
CODINGSTUDIO | $2a$10$HHu3S4Y5VgXnwMCpXWvjnOgmEge0Q6mL.40YtR9SI0twMYfaGjMFy | c1@csmail.com | 9999999999

faculty_roll | faculty_name | faculty_dept |     email      |  phone_no  |                           pwd_hash
--------------+--------------+--------------+----------------+------------+--------------------------------------------------------------
16P61A05M0   | Yashwanth    | CSE          | s1th@gmail.com | 9999999999 | $2a$10$Izz84lty9CqsoO4lzttIIesdqKhLSFJuqUyFymj7AQk1UOe1Ppuva
18P61A05C2   | Yasaswi Raj  | CSE          | s1th@gmail.com | 9999999999 | $2a$10$yX5PGu3c2XDv/j2889UUAu6CiGQi8bqEGdch3.HQWbY9XwwigYGiS
18P61A05J1   | Sai Kiran    | CSE          | s1th@gmail.com | 9999999999 | $2a$10$8RLTqk4NxTAsew/yPBmSEuomSos0fKHtGPO2J5VHU1lVmFHX/t.e6
18P61A05D7   | Aaris        | CSE          | s1th@gmail.com | 9999999999 | $2a$10$i3gR3buHbw9fHdlp4jTEOus.yL4Xx1jg8HGjuKSzwU40ePE4v9eg2
