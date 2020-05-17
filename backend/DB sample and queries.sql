insert into forums(forum_name,pwd_hash,email,phone_no) values ('yash', 'bdrhsdg','yasaswirajmadari@gmail.com','7416136474');
insert into forums(forum_name,pwd_hash,email,phone_no) values ('Sai', 'ghrdhynj32kw','Sk_king@gmail.com','7412544581');
insert into forums(forum_name,pwd_hash,email,phone_no) values ('Axai', 'ghrdhyn34trmnklfs','akshayyy@gmail.com','6533444581');
insert into forums(forum_name,pwd_hash,email,phone_no) values ('Aaris', 'gh4y5htki','aarisshNibba@gmail.com','4585244581');

 forum_id | forum_name |     pwd_hash      |           email            |  phone_no
----------+------------+-------------------+----------------------------+------------
        1 | yash       | grhe44            | yasaswirajmadari@gmail.com | 7416136474
        2 | Sai        | ghrdhynj32kw      | Sk_king@gmail.com          | 7412544581
        3 | Axai       | ghrdhyn34trmnklfs | akshayyy@gmail.com         | 6533444581
        4 | Aaris      | gh4y5htki         | aarisshNibba@gmail.com     | 4585244581

insert into faculty(faculty_name,faculty_roll,faculty_dept,email,phone,pwd_hash) values ('Sai', '18P44tenj3','CSE','Sk_kigvrdfhng@gmail.com','7412544581','ergjnwkrw');
insert into faculty(faculty_name,faculty_roll,faculty_dept,email,phone,pwd_hash) values ('Praveen', '18P35wenj3','CSE','pappu_sir@gmail.com','6432244581','errthgjnwkrw');
insert into faculty(faculty_name,faculty_roll,faculty_dept,email,phone,pwd_hash) values ('kiran', '18P44t56y3','CSE','kiran_kigvrdfhng@gmail.com','7454544581','erg467wkrw');
insert into faculty(faculty_name,faculty_roll,faculty_dept,email,phone,pwd_hash) values ('X AE a-12', '18P26tenj3','CSE','Sk_kdgshddfhng@gmail.com','7456544581','erg4e5yhjnwkrw');

 faculty_id | faculty_name | faculty_roll | faculty_dept |           email            |   phone    |    pwd_hash
------------+--------------+--------------+--------------+----------------------------+------------+----------------
          1 | Sai          | 18P44tenj3   | CSE          | Sk_kigvrdfhng@gmail.com    | 7412544581 | ergjnwkrw
          2 | Praveen      | 18P35wenj3   | CSE          | pappu_sir@gmail.com        | 6432244581 | errthgjnwkrw
          3 | kiran        | 18P44t56y3   | CSE          | kiran_kigvrdfhng@gmail.com | 7454544581 | erg467wkrw
          4 | X AE a-12    | 18P26tenj3   | CSE          | Sk_kdgshddfhng@gmail.com   | 7456544581 | erg4e5yhjnwkrw

insert into requests(forum_id,forum_name,filename,status,subject) values ('1','yash','letter1.json','pending','Permission for attendance');
insert into requests(forum_id,forum_name,filename,status,subject) values ('2','Sai','letter2.json','pending','Permission for reduction of attendance');
insert into requests(forum_id,forum_name,filename,status,subject) values ('3','Axai','letter3.json','pending','Permission for going out to a movie');
insert into requests(forum_id,forum_name,filename,status,subject) values ('4','Aaris','letter4.json','pending','Permission for attendance');

 request_id | forum_id | forum_name |   filename   | status  |                subject
------------+----------+------------+--------------+---------+----------------------------------------
          1 |        1 | yash       | letter1.json | pending | Permission for attendance
          2 |        2 | Sai        | letter2.json | pending | Permission for reduction of attendance
          3 |        3 | Axai       | letter3.json | pending | Permission for going out to a movie
          4 |        4 | Aaris      | letter4.json | pending | Permission for attendance

insert into recipients(request_id,faculty_id) values (1,2);
insert into recipients(request_id,faculty_id) values (1,3);
insert into recipients(request_id,faculty_id) values (2,4);
insert into recipients(request_id,faculty_id) values (3,1);
insert into recipients(request_id,faculty_id) values (4,2);
insert into recipients(request_id,faculty_id) values (4,3);

 request_id | faculty_id
------------+------------
          1 |          2
          1 |          3
          2 |          4
          3 |          1
          4 |          2
          4 |          3

select forum_name,subject,status from requests where request_id in (select request_id from recipients where faculty_id=4);

Create table faculty_registration_request(faculty_name varchar(128),faculty_dept varchar(8),faculty_roll varchar(11),email varchar(128),phone varchar(11));

Create table forum_registration_request(forum_name varchar(128),email varchar(128),phone varchar(11));
