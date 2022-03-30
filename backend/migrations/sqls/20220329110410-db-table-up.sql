create table catogery(id serial primary key, name varchar(100) unique not null);
create table brand (id serial primary key, name varchar(100)unique not null, description text);
create table users(id serial primary key, f_name varchar(50), l_name varchar(50), email varchar(500) unique not null, password varchar(500) not null, birthday date, phone varchar(11),status varchar(50), created_at timestamp,city varchar(150),address varchar(500));
create table product (id serial primary key, code varchar(50),name varchar(50),model varchar(150),image text, description text,category_id bigint references catogery(id)on delete cascade, price float, currency varchar(20), vote_count int, vote_total int,stock bigint, brand_id bigint references brand(id)on delete cascade);
create table orders(id serial primary key, status varchar(20), total float,time_start timestamp, time_arrival timestamp, compelete_at timestamp, user_id bigint references users(id)on delete cascade);
create table order_product (id serial primary key, quantity int ,order_id bigint references orders(id)on delete cascade, product_id bigint references product(id));
create table comment(id serial primary key, subject varchar(200), message text, created_time timestamp, user_id bigint references users(id)on delete cascade, product_id bigint references product(id)on delete cascade);
create table product_images (id serial primary key, image bytea,product_id bigint references product(id)on delete cascade);
create table coupon(id serial primary key, code varchar(50),value int, user_id bigint references users(id));