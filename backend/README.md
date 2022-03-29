.env file

{
port = 5000

db_user = marwan
db_password = marwan
db_host = 127.0.0.1
db_name = store
db_name_test = store_test
env = dev


extra = marwan
round = 5
token = lkdfg
}

set up database config
{
     Database: 
                port: 5432
                create user: create user marwan with password 'marwan';

                create database: create database store owner marwan;
                                 create database store_test owner marwan;
                
                grant all on database store to marwan;
                grant all on database store_test to marwan;

        if you don't have db-migrate install it [npm i db-migrate , npm i db-migrate db-migrate-pg]!!!
}