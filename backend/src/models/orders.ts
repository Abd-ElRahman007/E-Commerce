import Client from '../database';



export type order = {
  id?: number;
  status: string;
  total:number;
  time_start?:Date;
  time_arrival:Date;
  compelete_at:Date;
  user_id?: number;
};



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

    async show(id: number, user_id: number): Promise<order> {
        try {
            const conn = await Client.connect();
            const q = 'select * from orders where id=($1) and user_id=($2);';
            const res = await conn.query(q, [id, user_id]);
            conn.release();
            return res.rows[0];
        } catch (e) {
            throw new Error(`${e}`);
        }
    }

    async create(o: order): Promise<string> {
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

    async update(o: order): Promise<string> {
        try {
            const conn = await Client.connect();
            const q = 'select user_id from orders where id=($1) and user_id=($2);';
            const res = await conn.query(q, [o.id,o.user_id]);
            if (res.rows[0]) {
                const sql = 'update orders set status=($1), total=($2), compelete_at=($3),time_arrival=($4),time_start=($5) where id=($6) RETURNING *; ';
                const res = await conn.query(sql, [o.status,o.total,o.compelete_at,o.time_arrival,new Date(),o.id]);
                conn.release();
                return res.rows[0];
            }
            return 'not allowed';
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
    ): Promise<string> {
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
