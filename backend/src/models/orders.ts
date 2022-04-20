import Client from '../database';


export type order = {
  id?: number;
  status: string;
  total:number;
  time_start?:Date;
  time_arrival:Date;
  compelete_at?:Date;
  user_id: number;
  shipping_cost: number;
  shipping_address: string;
  taxes: number;
  payment: string;
};

export type order_product = {
    id?:number;
    order_id?:number;
    product_id:number;
    quantity:number;
    command?:string;
}

export class Order {
    async index(id: number): Promise<order[]> {
        try {
            const conn = await Client.connect();
            const sql = 'select * from orders where user_id=($1);';
            const res = await conn.query(sql, [id]);
            conn.release();
            return res.rows;
        } catch (e) {
            throw new Error(`${e}`);
        }
    }

    async all_index(): Promise<order[]> {
        try {
            const conn = await Client.connect();
            const sql = 'select * from orders;';
            const res = await conn.query(sql);
            conn.release();
            return res.rows;
        } catch (e) {
            throw new Error(`${e}`);
        }
    }

    async show(order_id: number,user_id:number): Promise<{'order':order, 'products':order_product[] }> {
        try {
            const conn = await Client.connect();
            const q = 'select * from orders where id=($1) and user_id=($2) ;';
            const res = await conn.query(q, [order_id,user_id]);

            const q2 = 'select * from order_product where order_id=($1) ;';
            const res2 = await conn.query(q2, [order_id]);

            const all = {'order':res.rows[0], 'products':res2.rows};

            conn.release();
            return all;
        } catch (e) {
            throw new Error(`${e}`);
        }
    }

    async create(o: order): Promise<order> {
        try {
            const conn = await Client.connect();
            const sql =
        'insert into orders (status,total,time_start,time_arrival,compelete_at, user_id, payment,shipping_address,shipping_cost,taxes) values($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)RETURNING *;';
            const res = await conn.query(sql, [o.status,o.total,new Date(),o.time_arrival,null, o.user_id, o.payment,o.shipping_address,o.shipping_cost,o.taxes]);
            conn.release();
            return res.rows[0];
        } catch (e) {
            throw new Error(`${e}`);
        }
    }

    async update(o:order): Promise<order> {
        try {
            const conn = await Client.connect();
            
            const sql = 'update orders set total=($2),time_arrival=($3),taxes=($4),status=($5),shipping_cost=($6),shipping_address=($7),payment=($8),compelete_at=($9),time_start=($10) where id=($1) RETURNING *; ';
            const res = await conn.query(sql, [o.id, o.total,o.time_arrival,o.taxes,o.status,o.shipping_cost,o.shipping_address,o.payment,o.compelete_at,o.time_start]);
            conn.release();
            return res.rows[0];
            
            
        } catch (e) {
            throw new Error(`${e}`);
        }
    }

    async updateStatus(id:number, status:string,compelete_at:Date|null): Promise<order> {
        try {
            const conn = await Client.connect();
            
            const sql = 'update orders set status=($2),compelete_at=($3),time_start=($10) where id=($1) RETURNING *; ';
            const res = await conn.query(sql, [id, status,compelete_at]);
            conn.release();
            return res.rows[0];
            
            
        } catch (e) {
            throw new Error(`${e}`);
        }
    }

    async delete(id: number, user_id: number): Promise<string> {
        try {
            const conn = await Client.connect();
            const q = 'delete from orders where id=($1) and user_id=($2)';
            await conn.query(q, [id, user_id]);
            conn.release();
            return 'deleted';
        } catch (e) {
            throw new Error(`${e}`);
        }
    }

    async addProduct(quantity:number, order_id:number, product_id:number): Promise<order_product> {
        try {
            const conn = await Client.connect();
            const sql = 'insert into order_product (quantity, order_id, product_id) values($1,$2,$3)RETURNING *;';
            const res = await conn.query(sql, [quantity, order_id, product_id]);
            conn.release();
            return res.rows[0];
        } catch (e) {
            throw new Error(`${e}`);
        }
    }

    async showProduct(order_id: number, product_id:number): Promise<order_product> {
        try {
            const conn = await Client.connect();
            const sql = 'select * from brand where order_id =($1) and product_id=($2);';
            const res = await conn.query(sql, [order_id,product_id]);
            conn.release();
            return res.rows[0];
        } catch (e) {
            throw new Error(`${e}`);
        }
    }

    async updateProduct(quantity:number, order_id:number, product_id:number): Promise<order_product> {
        try {
            const conn = await Client.connect();
            const sql =
        'update order_product set quantity=($1) where order_id=($2) and product_id=($3)RETURNING *;';
            const res = await conn.query(sql, [quantity, order_id, product_id]);
            conn.release();
            return res.rows[0];
        } catch (e) {
            throw new Error(`${e}`);
        }
    }
    async deleteProduct(order_id:number, product_id:number): Promise<order_product> {
        try {
            const conn = await Client.connect();
            const sql =
        'delete from order_product where order_id=($2) and product_id=($3)RETURNING *;';
            const res = await conn.query(sql, [order_id, product_id]);
            conn.release();
            return res.rows[0];
        } catch (e) {
            throw new Error(`${e}`);
        }
    }
}
