import Client from '../database';



export type order = {
  id?: number;
  status: string;
  total:number;
  time_start?:Date;
  time_arrival:Date;
  compelete_at:Date;
  user_id: number;
};

export type order_product = {
    order_id?:number;
    product_id:number;
    quantity:number
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

    async show(id: number,user_id:number): Promise<order> {
        try {
            const conn = await Client.connect();
            const q = 'select * from orders right join order_product on orders.id=($1) and orders.user_id=($2) left join product on order_product.product_id=product.id;;';
            const res = await conn.query(q, [id,user_id]);
            conn.release();
            return res.rows[0];
        } catch (e) {
            throw new Error(`${e}`);
        }
    }

    async create(o: order): Promise<order> {
        try {
            const conn = await Client.connect();
            const sql =
        'insert into orders (status,total,time_start,time_arrival,compelete_at, user_id) values($1,$2,$3,$4,$5,$6)RETURNING *;';
            const res = await conn.query(sql, [o.status,o.total,new Date(),o.time_arrival,o.compelete_at, o.user_id]);
            conn.release();
            return res.rows[0];
        } catch (e) {
            throw new Error(`${e}`);
        }
    }

    async update(o: order): Promise<order> {
        try {
            const conn = await Client.connect();
            
            const sql = 'update orders set status=($1), total=($2), compelete_at=($3),time_arrival=($4),time_start=($5) where id=($6) RETURNING *; ';
            const res = await conn.query(sql, [o.status,o.total,o.compelete_at,o.time_arrival,new Date(),o.id]);
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

    async addProduct(
        order_id: number,
        product_id: number,
        quantity: number
    ): Promise<order_product> {
        try {
            const conn = await Client.connect();
            const sql =
        'insert into order_product (quantity, order_id, product_id) values($1,$2,$3)RETURNING *;';
            const res = await conn.query(sql, [quantity, order_id, product_id]);
            conn.release();
            return res.rows[0];
        } catch (e) {
            throw new Error(`${e}`);
        }
    }
}
