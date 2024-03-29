
# Automated Request Management App [A.R.M.A]

A.R.M.A automates all permission procedures, such as letter automation, permission requests, hierarchical event management in VBIT, eliminating  time consuming tasks.

## Getting Started
To get a local copy up and running follow these simple steps.

### Prerequisites
1. Download the Node.js source code or a pre-built installer for your platform at https://nodejs.org/en/download/
2. [Download](https://www.postgresql.org/download/) and Install PostgreSQL.
3. [Installation instructions](https://www.digitalocean.com/community/tutorials/how-to-install-postgresql-on-ubuntu-20-04-quickstart) for Ubuntu 20.04. 


### Run Locally

#### 1. Clone the repository 
```
$ https://github.com/coding-Studio-vbit/A.R.M.A.git
```

#### 2. Setting up Backend

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
CREATE TABLE requests(
	request_id SERIAL PRIMARY KEY,
	forum_name varchar(128) REFERENCES forums(forum_name) ON DELETE CASCADE,
	unique_id varchar(10) UNIQUE,
	request_data jsonb,
	status varchar(20),
  	remarks varchar(1024)
);
```
* Creating the recepients table:
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
#### 3. Run Backend
```
$ cd backend
$ npm install
$ nodemon server.js
```
#### 4. Add a .env file in backend folder
```
SECRET_ACCESS_TOKEN=[your-secret-access-token]
PASSWORD=[your-nodemailer-email-password]
USERMAIL=[your-nodemailer-email]
DATABASE_URL: '[your-database-url]'
PORT=7321
```

#### 5. Run Frontend
```
$ cd react
$ npm install
$ npm start
```
#### 6. Add a .env file in frontend folder
```
REACT_APP_URL=[backend-server-url]
```
##### Running on port: http://localhost:8080

## Contributing 
Any contributions you make are greatly appreciated.

1. Fork the Project
2. Create your Feature Branch (git checkout -b feature/NewFeature)
3. Commit your Changes (git commit -m 'Add some NewFeature')
4. Push to the Branch (git push origin feature/NewFeature)
5. Open a Pull Request

