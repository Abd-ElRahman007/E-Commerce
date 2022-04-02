import Client from '../database';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';

dotenv.config();

const { extra } = process.env;


export type user = {
  id?: number;
  f_name: string;
  l_name: string;
  email:string;
  password: string;
  birthday:Date;
  phone:string;
  status:string;
  created_at:Date;
  city:string;
  address:string;
  coupon_id?:number;
};

export class User {
    async index(): Promise<user[]> {
        try {
            const conn = await Client.connect();
            const sql = 'select * from users;';
            const res = await conn.query(sql);
            conn.release();
            return res.rows;
        } catch (e) {
            throw new Error(`${e}`);
        }
    }

    async show(id: number): Promise<user> {
        try {
            const conn = await Client.connect();
            const sql = 'select * from users where id =($1);';
            const res = await conn.query(sql, [id]);
            conn.release();
            return res.rows[0];
        } catch (e) {
            throw new Error(`${e}`);
        }
    }

    async create(u: user): Promise<user> {
        try {
            const conn = await Client.connect();
            const sql =
        'insert into users (f_name, l_name, email, password, birthday, phone, status,created_at, city,address) values($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)RETURNING*;';
            const res = await conn.query(sql, [u.f_name, u.l_name, u.email, u.password, u.birthday, u.phone, u.status, u.created_at, u.city,u.address]);
            conn.release();
            return res.rows[0];
        } catch (e) {
            throw new Error(`${e}`);
        }
    }

    async update(u: user): Promise<user> {
        try {
            const conn = await Client.connect();
            const sql =
        'update users set f_name=($1), l_name=($2),email=($3),birthday=($4),phone=($5),status=($6),city=($7),address=($8) where id=($9)RETURNING*; ';
            const res = await conn.query(sql, [u.f_name, u.l_name, u.email, u.birthday, u.phone, u.status, u.city,u.address, u.id]);
            conn.release();
            return res.rows[0];
        } catch (e) {
            throw new Error(`${e}`);
        }
    }

    async delete(id: number): Promise<string> {
        try {
            const conn = await Client.connect();
            const sql = 'delete from users where id =($1) ;';
            const res = await conn.query(sql, [id]);
            conn.release();
            return 'deleted';
        } catch (e) {
            throw new Error(`${e}`);
        }
    }

    async auth(email: string, pass: string): Promise<string> {
        try {
            const conn = await Client.connect();
            const sql = 'select * from users where email=($1);';
            const res = await conn.query(sql, [email]);
            if (res.rows.length) {
                const isExist = bcrypt.compareSync(pass + extra, res.rows[0].password);
                if (isExist) return 'succeeded';
            }
            return 'failed';
        } catch (e) {
            throw new Error(`${e}`);
        }
    }
}
