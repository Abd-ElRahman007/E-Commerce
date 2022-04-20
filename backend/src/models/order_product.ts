// import Client from '../database';

// //create table brand (id serial primary key, name varchar(100)unique not null, description text);


// export type order_product = {
//     id?:number;
//     order_id?:number;
//     product_id:number;
//     quantity:number
// }


// export class Order_product {
//     async index(id:number): Promise<order_product[]> {
//         try {
//             const conn = await Client.connect();
//             const sql = 'select * from order_product where order_id=($1);';
//             const res = await conn.query(sql,[id]);
//             conn.release();
//             return res.rows;
//         } catch (e) {
//             throw new Error(`${e}`);
//         }
//     }

//     async show(id: number): Promise<order_product> {
//         try {
//             const conn = await Client.connect();
//             const sql = 'select * from brand where id =($1);';
//             const res = await conn.query(sql, [id]);
//             conn.release();
//             return res.rows[0];
//         } catch (e) {
//             throw new Error(`${e}`);
//         }
//     }

//     async addProduct(op:order_product): Promise<order_product> {
//         try {
//             const conn = await Client.connect();
//             const sql =
//         'insert into order_product (quantity, order_id, product_id) values($1,$2,$3)RETURNING *;';
//             const res = await conn.query(sql, [op.quantity, op.order_id, op.product_id]);
//             conn.release();
//             return res.rows[0];
//         } catch (e) {
//             throw new Error(`${e}`);
//         }
//     }

//     async update(op: order_product): Promise<order_product> {
//         try {
//             const conn = await Client.connect();
//             const sql =
//         'update order_product set quantity=($1) where order_id=($2) and product_id=($3) and id=($4) RETURNING *; ';
//             const res = await conn.query(sql, [op.quantity, op.order_id, op.product_id,op.id]);
//             conn.release();
//             return res.rows[0];
//         } catch (e) {
//             throw new Error(`${e}`);
//         }
//     }
    
//     async delete(id: number): Promise<string> {
//         try {
//             const conn = await Client.connect();
//             const sql = 'delete from order_product where id =($1);';
//             await conn.query(sql, [id]);
//             conn.release();
//             return 'deleted';
//         } catch (e) {
//             throw new Error(`${e}`);
//         }
//     }
// }
