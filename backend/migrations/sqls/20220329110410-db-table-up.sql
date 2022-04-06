create table catogery(id serial primary key, name varchar(100) unique not null);
create table brand (id serial primary key, name varchar(100)unique not null, description text);
create table coupon(id serial primary key, code varchar(50)unique not null,value_of_100 int);
create table users(id serial primary key, f_name varchar(50), l_name varchar(50), email varchar(500) unique not null, password varchar(500) not null, birthday date, phone varchar(12),status varchar(50), created_at timestamp,city varchar(150),address varchar(500),coupon_id bigint references coupon(id)on delete set null);
create table product (id serial primary key, code varchar(50)unique,name varchar(50),model varchar(150),images text[],image text, description text,category_id bigint references catogery(id)on delete set null, price float, currency varchar(20), vote_count int, vote_total int,stock bigint, brand_id bigint references brand(id)on delete set null);
create table orders(id serial primary key, status varchar(20), total float,time_start timestamp, time_arrival timestamp, compelete_at timestamp, user_id bigint references users(id)on delete cascade);
create table order_product (id serial primary key, quantity int ,order_id bigint references orders(id)on delete cascade, product_id bigint references product(id)on delete set null);
create table comment(id serial primary key, subject varchar(200), message text, created_time timestamp, user_id bigint references users(id)on delete cascade, product_id bigint references product(id)on delete cascade);
