import Client from '../database';
import { user } from './users';
//create table comment(id serial primary key, subject varchar(200), message text, created_time timestamp, user_id bigint references users(id)on delete cascade, product_id bigint references product(id)on delete cascade);


export type comment = {
    id?: number;
    subject?: string;
    message:string;
    created_time?:Date;
    user_id?:number;
    product_id?:number;
    vote?:number;
  };


export class Comment {
    async index(product_id:number): Promise<comment[]> {
        
        try {
            const conn = await Client.connect();
            const sql = 'select * from comment where product_id=($1);';
            const res = await conn.query(sql,[product_id]);
            console.log(res.rows);
            
            conn.release();
            return res.rows;
        } catch (e) {
            throw new Error(`${e}`);
        }
    }

    async show(product_id: number, id:number): Promise<comment> {
        try {
            const conn = await Client.connect();
            const sql = 'select * from comment where id =($1) and product_id=($2);';
            const res = await conn.query(sql, [id,product_id]);
            conn.release();
            return res.rows[0];
        } catch (e) {
            throw new Error(`${e}`);
        }
    }

    async create(c: comment): Promise<comment> {
        try {            
            const conn = await Client.connect();
            const sql = 'insert into comment (subject,message,created_time,user_id,product_id,vote) values($1,$2,$3,$4,$5,$6)RETURNING *;';
            const res = await conn.query(sql, [c.subject,c.message,new Date(),c.user_id,c.product_id,c.vote]);
            conn.release();
            return res.rows[0];
        } catch (e) {
            throw new Error(`${e}`);
        }
    }

    async update(c: comment): Promise<comment> {
        try {
            const conn = await Client.connect();
            const sql = 'update comment set subject=($1),message=($2),product_id=($4),vote=($6) where id=($5) and user_id=($3) RETURNING *; ';
            const res = await conn.query(sql, [c.subject,c.message,c.user_id,c.product_id, c.id,c.vote]);
            conn.release();
            return res.rows[0];
        } catch (e) {
            throw new Error(`${e}`);
        }
    }

    async delete(product_id:number,id: number): Promise<string> {
        try {
            const conn = await Client.connect();
            
            const sql = 'delete from comment where id =($1) and product_id=($2);';
            await conn.query(sql, [id,product_id]);
            conn.release();
                        
            return 'deleted';
        } catch (e) {
            throw new Error(`${e}`);
        }
    }
}
