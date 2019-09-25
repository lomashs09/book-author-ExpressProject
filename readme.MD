

BOOKS and AUTHOR Express Project


RUN npm install to install all dependencies.

FIRST CREATE Three MYSQL TABLES

CREATE Table for Books with the following Details:

book_id int primary key,

title varchar not null,

GENRE varchar,

author_id int foreign key;


CREATE table Authors with the following Details:

author_id int primary key auto increment,

name varchar;


CREATE table Users with the following Details:

name varchar,

email nvarchar,

phone bigint,

password varchar;



CREATE a seperate config.js file in root directory of project 

Inside config.js connect your database.

the config.js has already been imported in the project  so no need to Import it anywhere.

you can see the "database" variable is already Connected to config.js

RUN THE SERVER

GOTO localhost:port

Create an Account and the details will be saved in customer table described Above.

after successful sign up the JWT token will be Generated.

USE the Generated Token to send PUT, POST and DELETE Request to the given EndPoints






