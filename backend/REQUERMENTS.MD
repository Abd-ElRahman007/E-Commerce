Database Schema:
        
    Products Table:

        index  --> /products?page=&limit=&brand=&category=&name=

                any of the query will return data only should put page and limit together to paginate.
                                            [get] no content in body
                                            [return] {id,code,name,model,images,description,currency,vote_count,vote_total,price,stock,image,brand_id,category_id}

        show   --> /products/:id [get] no content in body
                                 [return] {id,code,name,model,images,description,currency,vote_count,vote_total,price,stock,image,brand_id,category_id}


        create --> /products     [post] body{code[required],  name,  model,  image[required],  description,category_id[required],                             price[required], currency[required], vote_count,    vote_total, stock[required], brand_id[required]}       
        
                                header{token for admin only}
                                 [return] {id,code,name,model,,description,currency,vote_count,vote_total,price,stock,image,brand_id,category_id}

        update --> /products/:id [patch]  body{code,  name,  model,  image,  description,category_id, price, currency , vote_count, vote_total, stock,                              brand_id} header{token for admins only}
                                 [return] {id,code,name,model,,description,currency,vote_count,vote_total,price,stock,image,brand_id,category_id}

        delete --> /products/:id [delete]  header{token admins only}
                                 [return] {'deleted'}

    Users Table:

        index   --> /users     [get]    header{token admins only}
                                [return] {id,f_name,l_name,email,password,birthday,phone,status,created_at,address,coupon_id}

        show    --> /users/:id [get]    header{token admin or user itself}
                                [return] {id,f_name,l_name,email,password,birthday,phone,status,created_at,address,coupon_id}
                                
        create  --> /users     [post]   body{f_name, l_name, email[required], password[required], birthday, phone, status[required], city,address}
                                [return] {"resault": [id,f_name,l_name,email,password,birthday,phone,status,created_at,address,coupon_id],"token":""}
                                
        update  --> /users/:id [patch]  body{f_name, l_name, email, birthday, phone, city,address} header{token user it self except status and coupon_id admins can}
                                [return] {"resault": [id,f_name,l_name,email,password,birthday,phone,status,created_at,address,coupon_id],"token":""}
                                
        delete  --> /users/:id [delete] header{token user itself}
                                [return] {'deleted'}
                                
        login   --> /login     [post]   body{email[required], password[required]}
                                [return] {'succeeded':token| 'failed'}
                                
        get_token-> /users/:id/get_token [get] no body content admins only
                                [return] {"token":""}
                                
        

    Orders Table:

        index      --> /users/:user_id/orders           [get] header{token}
                                [return] {id,status,total,time_start,time_arrival,compelete_at,user_id}
                                
        show       --> /users/:user_id/orders/:order_id [get] header{token}
                                [return] {id,status,total,time_start,time_arrival,compelete_at,user_id}
                                
        create     --> /users/:user_id/orders           [post] body{status,total,time_arrival,compelete_at} header{token}
                                [return] {id,status,total,time_start,time_arrival,compelete_at,user_id}
                                
        update     --> /users/:user_id/orders/:order_id [patch] body{status,total,time_arrival,compelete_at} header{token users only}
                                [return] {id,status,total,time_start,time_arrival,compelete_at,user_id}
                                
        delete     --> /users/:user_id/orders/:order_id [delete] header{token for admins only}
                                [return] {'deleted'}
                                


    order_products Table:

        addProduct --> /users/:user_id/orders/:order_id/products/product_id [post] body{quantit[required]} header{token user only}
                                                                 [return] {id,quantity,order_id,product_id}


    Categoey Table:

        index      --> /categories          [get]
                                            [return] {id,name}

        show       --> /categories/:id      [get]
                                            [return all products in category] {id,name,price,stock,image,brand_id,category_id}

        create     --> /categories          [post] body{name[required]} header{token for admins only}
                                            [return] {id,name}

        update     --> /categories/:id      [patch] body{name} header{token for admins only}
                                            [return] {id,name}

        delete     --> /categories/:id      [delete] header{token for admins only}
                                            [return] {'deleted'}


   

    Brand Table:

        index      --> /brands          [get]
                                        [return]{id,name,description}
        
        show       --> /brands/:id      [get]
                                        [return]{id,name,description}
        
        create     --> /brands          [post] body{name[required],description} header{token for admins only}
                                        [return]{id,name,description}
        
        update     --> /brands/:id      [patch] body{name[optional],description[optional]} header{token for admins only}
                                        [return]{id,name,description}
        
        delete     --> /brands/:id      [delete] header{token for admins only}
                                        [return]{'deleted'}
        


    Coupon Table:

        index      --> /coupons          [get]
                                         [return]{id,code,value_of_100}

        show       --> /coupons/:id      [get]
                                         [return]{id,code,value_of_100}

        create     --> /coupons          [post] body{code[required],value_of_100[required]} header{token for admins only}
                                         [return]{id,code,value_of_100}

        update     --> /coupons/:id      [patch] body{code,value_of_100} header{token for admins only}
                                         [return]{id,code,value_of_100}

        delete     --> /coupons/:id      [delete] header{token for admins only}
                                         [return]{'deleted'}



    Comment Table:

        index      --> products/:product_id/comments         [get]
                                                            [return]{id,subject,message,created_at,user_id,product_id}

        show       --> products/:product_id/comments/:id     [get]
                                                            [return]{id,subject,message,created_at,user_id,product_id}

        create     --> products/:product_id/comments         [post] body{subject[required],message,user_id[required]} header{token}
                                                            [return]{id,subject,message,created_at,user_id,product_id}

        update     --> products/:product_id/comments/:id     [patch] body{subject,message,user_id,product_id} header{token for user who write it only}
                                                            [return]{id,subject,message,created_at,user_id,product_id}

        delete     --> products/:product_id/comments/:id     [delete] header{token for admins or user who write it}
                                                            [return]{'deleted'}







