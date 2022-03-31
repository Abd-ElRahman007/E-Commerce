Database Schema:
        
    Products Table:

        table product (id serial primary key, code varchar(50),name varchar(50),model varchar(150),image bytea, description text,category_id bigint references catogery(id)on delete cascade, price float, currency varchar(20), vote_count int, vote_total int,stock bigint, brand_id bigint references brand(id)on delete cascade);
        
        table product_images (id serial primary key, image bytea,product_id bigint references product(id)on delete cascade);


        index  --> /products     [get] no content in body

        show   --> /products/:id [get] no content in body

        create --> /products     [post] body{code,  name,  model,  image,  description,category_id, price, currency, vote_count,    vote_total, stock, brand_id} header{token}

        update --> /products/:id [patch]  body{code,  name,  model,  image,  description,category_id, price, currency , vote_count, vote_total, stock, brand_id} header{token}

        delete --> /products/:id [delete]  header{token}

    Users Table:

        (id serial primary key, first_name varchar, last_name varchar, password varchar)

        index   --> /users     [get]    header{token}
        show    --> /users/:id [get]    header{token}
        create  --> /users     [post]   body{f_name, l_name, email, password, birthday, phone, status,created_at, city,address}
        update  --> /users/:id [patch]  body{f_name, l_name, email, birthday, phone,created_at, city,address} header{token}
        delete  --> /users/:id [delete] header{token}
        login   --> /login     [post]   body{username, password}
        get_token-> /users/:id/get_token [get] no body content
        

    Orders Table:
        
        table orders(id serial primary key, status varchar(20), total float,time_start timestamp, time_arrival timestamp, compelete_at timestamp, user_id bigint references users(id)on delete cascade);

        index      --> /users/:user_id/orders           [get] header{token}
        show       --> /users/:user_id/orders/:order_id [get] header{token}
        create     --> /users/:user_id/orders           [post] body{status,total,time_start,time_arrival,compelete_at, user_id} header{token}
        update     --> /users/:user_id/orders/:order_id [patch] body{status,total} header{token}
        delete     --> /users/:user_id/orders/:order_id [delete] header{token}


    order_products Table:

        table order_product (id serial primary key, quantity int ,order_id bigint references orders(id)on delete cascade, product_id bigint references product(id)on delete set null);

        addProduct --> /users/:user_id/orders/:order_id/products [post] body{product_id, quantit} header{token}



    Categoey Table:

        table catogery(id serial primary key, name varchar(100) unique not null);

        index      --> /categories          [get]
        show       --> /categories/:id      [get]
        create     --> /categories          [post] body{name} header{token}
        update     --> /categories/:id      [patch] body{name} header{token}
        delete     --> /categories/:id      [delete] header{token}

   

    Brand Table:

        table brand (id serial primary key, name varchar(100)unique not null, description text);

        index      --> /brands          [get]
        show       --> /brands/:id      [get]
        create     --> /brands          [post] body{name,description} header{token}
        update     --> /brands/:id      [patch] body{name,description} header{token}
        delete     --> /brands/:id      [delete] header{token}


    Coupon Table:

        table brand (id serial primary key, code string, value_of_100 string);

        index      --> /coupons          [get]
        show       --> /coupons/:id      [get]
        create     --> /coupons          [post] body{code,value_of_100} header{token}
        update     --> /coupons/:id      [patch] body{code,value_of_100} header{token}
        delete     --> /coupons/:id      [delete] header{token}


    Comment Table:

        table brand (id serial primary key, subject string, message string, created_at Date, user_id int, product_id int);

        index      --> /coupons          [get]
        show       --> /coupons/:id      [get]
        create     --> /coupons          [post] body{subject,message,created_at,user_id,product_id} header{token}
        update     --> /coupons/:id      [patch] body{subject,message,created_at,user_id,product_id} header{token}
        delete     --> /coupons/:id      [delete] header{token}










//product col create req:
   "code":"",
    "name":"",  
    "model":"",  
    "image":"",  
    "description":"",
    "category_id":"", 
    "price":"", 
    "currency":"", 
    "vote_count":"",    
    "vote_total":"", 
    "stock":"", 
    "brand_id":""
    