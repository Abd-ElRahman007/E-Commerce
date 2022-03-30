Database Schema:
        
    Products Table:

        table product (id serial primary key, code varchar(50),name varchar(50),model varchar(150),image bytea, description text,category_id bigint references catogery(id)on delete cascade, price float, currency varchar(20), vote_count int, vote_total int,stock bigint, brand_id bigint references brand(id)on delete cascade);
        
        table product_images (id serial primary key, image bytea,product_id bigint references product(id)on delete cascade);


        index  --> /products     [get] no content in body
        show   --> /products/:id [get] no content in body
        create --> /products     [post] body{code,  name,  model,  image,  description,category_id, price, currency, vote_count,    vote_total, stock, brand_id} header{token}

        update --> /products/:id [patch]  body{code,  name,  model,  image,  description,category_id, price, currency , vote_count, vote_total, stock, brand_id} header{token}

        delete --> /products/:id [delete]  header{token}

    Categoey Table:

        table catogery(id serial primary key, name varchar(100) unique not null);

        index      --> /categories          [get]
        show       --> /categories/:id      [get]
        create     --> /categories          [post] body{name} header{token}
        update     --> /categories/:id      [patch] body{name} header{token}
        delete     --> /categories/:id      [delete] header{token}

   