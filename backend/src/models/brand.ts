import Client from '../database';
import { Product } from './products';

//create table brand (id serial primary key, name varchar(100)unique not null, description text);


export type brand = {
    id?: number;
    name: string;
    description?: string;
  };

export class Brand {
    async index(): Promise<brand[]> {
        try {
            const conn = await Client.connect();
            const sql = 'select * from brand;';
            const res = await conn.query(sql);
            conn.release();
            return res.rows;
        } catch (e) {
            throw new Error(`${e}`);
        }
    }

    async show(id: number): Promise<brand> {
        try {
            const conn = await Client.connect();
            const sql = 'select * from brand where id =($1);';
            const res = await conn.query(sql, [id]);
            conn.release();
            return res.rows[0];
        } catch (e) {
            throw new Error(`${e}`);
        }
    }

    async create(b: brand): Promise<brand> {
        try {
            const conn = await Client.connect();
            const sql =
        'insert into brand (name, description) values($1, $2)RETURNING *;';
            const res = await conn.query(sql, [b.name, b.description]);
            conn.release();
            return res.rows[0];
        } catch (e) {
            throw new Error(`${e}`);
        }
    }

    async update(b: brand): Promise<brand> {
        try {
            const conn = await Client.connect();
            const sql =
        'update brand set name=($1), description=($2) where id=($3) RETURNING *; ';
            const res = await conn.query(sql, [b.name, b.description, b.id]);
            conn.release();
            return res.rows[0];
        } catch (e) {
            throw new Error(`${e}`);
        }
    }
    
    async delete(id: number): Promise<string> {
        const product_obj = new Product();
        try {
            const products = await product_obj.search_by_cat_or_brand(id, 'brand');
            if(!products)
            {
                const conn = await Client.connect();
                const sql = 'delete from brand where id =($1);';
                await conn.query(sql, [id]);
                conn.release();
                return 'deleted';
            }else throw new Error('can not delete the brand');
        } catch (e) {
            throw new Error(`${e}`);
        }
    }
}
