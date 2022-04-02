Database Schema:
        
    Products Table:

        create table product (id serial primary key, code varchar(50)unique,name varchar(50),model varchar(150),image text, description text,category_id bigint references catogery(id)on delete set null, price float, currency varchar(20), vote_count int, vote_total int,stock bigint, brand_id bigint references brand(id)on delete set null);

        create table product_images (id serial primary key, image text,product_id bigint references product(id)on delete cascade);


        index  --> /products     [get] no content in body
                                 [return] {id,name,price,stock,image,brand_id,category_id}

        show   --> /products/:id [get] no content in body
                                 [return] {id,code,name,model,,description,currency,vote_count,vote_total,price,stock,image,brand_id,category_id}

        create --> /products     [post] body{code,  name,  model,  image,  description,category_id, price, currency, vote_count,    vote_total, stock, brand_id} header{token}
                                 [return] {id,code,name,model,,description,currency,vote_count,vote_total,price,stock,image,brand_id,category_id}

        update --> /products/:id [patch]  body{code,  name,  model,  image,  description,category_id, price, currency , vote_count, vote_total, stock, brand_id} header{token}
                                 [return] {id,code,name,model,,description,currency,vote_count,vote_total,price,stock,image,brand_id,category_id}

        delete --> /products/:id [delete]  header{token}
                                 [return] {'deleted'}

    Users Table:

        create table users(id serial primary key, f_name varchar(50), l_name varchar(50), email varchar(500) unique not null, password varchar(500) not null, birthday date, phone varchar(12),status varchar(50), created_at timestamp,city varchar(150),address varchar(500),coupon_id bigint references coupon(id)on delete set null);


        index   --> /users     [get]    header{token}
                                [return] {id,f_name,l_name,email,password,birthday,phone,status,created_at,address,coupon_id}

        show    --> /users/:id [get]    header{token}
                                [return] {id,f_name,l_name,email,password,birthday,phone,status,created_at,address,coupon_id}
                                
        create  --> /users     [post]   body{f_name, l_name, email, password, birthday, phone, status, city,address}
                                [return] {"resault": [id,f_name,l_name,email,password,birthday,phone,status,created_at,address,coupon_id],"token":""}
                                
        update  --> /users/:id [patch]  body{f_name, l_name, email, birthday, phone, city,address} header{token}
                                [return] {"resault": [id,f_name,l_name,email,password,birthday,phone,status,created_at,address,coupon_id],"token":""}
                                
        delete  --> /users/:id [delete] header{token}
                                [return] {'deleted'}
                                
        login   --> /login     [post]   body{username, password}
                                [return] {'succeeded'| 'failed'}
                                
        get_token-> /users/:id/get_token [get] no body content
                                [return] {"token":""}
                                
        

    Orders Table:
        
        create table orders(id serial primary key, status varchar(20), total float,time_start timestamp, time_arrival timestamp, compelete_at timestamp, user_id bigint references users(id)on delete cascade);


        index      --> /users/:user_id/orders           [get] header{token}
                                [return] {id,status,total,time_start,time_arrival,compelete_at,user_id}
                                
        show       --> /users/:user_id/orders/:order_id [get] header{token}
                                [return] {id,status,total,time_start,time_arrival,compelete_at,user_id}
                                
        create     --> /users/:user_id/orders           [post] body{status,total,time_arrival,compelete_at} header{token}
                                [return] {id,status,total,time_start,time_arrival,compelete_at,user_id}
                                
        update     --> /users/:user_id/orders/:order_id [patch] body{status,total,time_arrival,compelete_at} header{token}
                                [return] {id,status,total,time_start,time_arrival,compelete_at,user_id}
                                
        delete     --> /users/:user_id/orders/:order_id [delete] header{token}
                                [return] {'deleted'}
                                


    order_products Table:

        create table order_product (id serial primary key, quantity int ,order_id bigint references orders(id)on delete cascade, product_id bigint references product(id)on delete set null);

        addProduct --> /users/:user_id/orders/:order_id/products [post] body{product_id, quantit} header{token}
                                                                 [return] {id,quantity,order_id,product_id}


    Categoey Table:

        create table catogery(id serial primary key, name varchar(100) unique not null);

        index      --> /categories          [get]
                                            [return] {id,name}

        show       --> /categories/:id      [get]
                                            [return all products in category] {id,name,price,stock,image,brand_id,category_id}

        create     --> /categories          [post] body{name} header{token}
                                            [return] {id,name}

        update     --> /categories/:id      [patch] body{name} header{token}
                                            [return] {id,name}

        delete     --> /categories/:id      [delete] header{token}
                                            [return] {'deleted'}


   

    Brand Table:

        create table brand (id serial primary key, name varchar(100)unique not null, description text);

        index      --> /brands          [get]
                                        [return]{id,name,description}
        
        show       --> /brands/:id      [get]
                                        [return]{id,name,description}
        
        create     --> /brands          [post] body{name,description} header{token}
                                        [return]{id,name,description}
        
        update     --> /brands/:id      [patch] body{name,description} header{token}
                                        [return]{id,name,description}
        
        delete     --> /brands/:id      [delete] header{token}
                                        [return]{'deleted'}
        


    Coupon Table:

        create table coupon(id serial primary key, code varchar(50)unique not null,value_of_100 int);

        index      --> /coupons          [get]
                                         [return]{id,code,value_of_100}

        show       --> /coupons/:id      [get]
                                         [return]{id,code,value_of_100}

        create     --> /coupons          [post] body{code,value_of_100} header{token}
                                         [return]{id,code,value_of_100}

        update     --> /coupons/:id      [patch] body{code,value_of_100} header{token}
                                         [return]{id,code,value_of_100}

        delete     --> /coupons/:id      [delete] header{token}
                                         [return]{'deleted'}



    Comment Table:

        create table comment(id serial primary key, subject varchar(200), message text, created_time timestamp, user_id bigint references users(id)on delete cascade, product_id bigint references product(id)on delete cascade);

        index      --> product/:product_id/comments         [get]
                                                            [return]{id,subject,message,created_at,user_id,product_id}

        show       --> product/:product_id/comments/:id     [get]
                                                            [return]{id,subject,message,created_at,user_id,product_id}

        create     --> product/:product_id/comments         [post] body{subject,message,user_id,product_id} header{token}
                                                            [return]{id,subject,message,created_at,user_id,product_id}

        update     --> product/:product_id/comments/:id     [patch] body{subject,message,user_id,product_id} header{token}
                                                            [return]{id,subject,message,created_at,user_id,product_id}

        delete     --> product/:product_id/comments/:id     [delete] header{token}
                                                            [return]{'deleted'}
