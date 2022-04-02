import Client from '../database';

//create table coupon(id serial primary key, code varchar(50),value_of_100 int);


export type coupon = {
    id?: number;
    code: string;
    value_of_100:number;
  };


export class Coupon {
    async index(): Promise<coupon[]> {
        try {
            const conn = await Client.connect();
            const sql = 'select * from coupon;';
            const res = await conn.query(sql);
            conn.release();
            return res.rows;
        } catch (e) {
            throw new Error(`${e}`);
        }
    }

    async show(id: number): Promise<coupon> {
        try {
            const conn = await Client.connect();
            const sql = 'select * from coupon where id =($1);';
            const res = await conn.query(sql, [id]);
            conn.release();
            return res.rows[0];
        } catch (e) {
            throw new Error(`${e}`);
        }
    }

    async create(c: coupon): Promise<string> {
        try {
            const conn = await Client.connect();
            const sql = 'insert into coupon (code,value_of_100) values($1,$2)RETURNING *;';
            const res = await conn.query(sql, [c.code,c.value_of_100]);
            conn.release();
            return res.rows[0];
        } catch (e) {
            throw new Error(`${e}`);
        }
    }

    async update(c: coupon): Promise<string> {
        try {
            const conn = await Client.connect();
            const sql = 'update coupon set code=($1), value_of_100=($2) where id=($3) RETURNING *; ';
            const res = await conn.query(sql, [c.code, c.value_of_100, c.id]);
            conn.release();
            return res.rows[0];
        } catch (e) {
            throw new Error(`${e}`);
        }
    }

    async delete(id: number): Promise<string> {
        try {
            const conn = await Client.connect();
            const sql = 'delete from coupon where id =($1);';
            const res = await conn.query(sql, [id]);
            conn.release();
            return 'deleted';
        } catch (e) {
            throw new Error(`${e}`);
        }
    }
}
