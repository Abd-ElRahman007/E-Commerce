import Client from '../database';

//create table catogery(id serial primary key, name varchar(100) unique not null);

export type catogery = {
    id?: number;
    name: string;
  };


export class Catogery {
    async index(): Promise<catogery[]> {
        try {
            const conn = await Client.connect();
            const sql = 'select * from catogery;';
            const res = await conn.query(sql);
            conn.release();
            return res.rows;
        } catch (e) {
            throw new Error(`${e}`);
        }
    }

    async show(id: number): Promise<catogery> {
        try {
            const conn = await Client.connect();
            const sql = 'select * from catogery where id =($1);';
            const res = await conn.query(sql, [id]);
            conn.release();
            return res.rows[0];
        } catch (e) {
            throw new Error(`${e}`);
        }
    }

    async create(c: catogery): Promise<string> {
        try {
            const conn = await Client.connect();
            const sql = 'insert into catogery (name) values($1)RETURNING *;';
            const res = await conn.query(sql, [c.name]);
            conn.release();
            return 'created';
        } catch (e) {
            throw new Error(`${e}`);
        }
    }

    async update(c: catogery): Promise<string> {
        try {
            const conn = await Client.connect();
            const sql = 'update catogery set name=($1) where id=($2) RETURNING *; ';
            const res = await conn.query(sql, [c.name, c.id]);
            conn.release();
            return 'updated';
        } catch (e) {
            throw new Error(`${e}`);
        }
    }

    async delete(id: number): Promise<string> {
        try {
            const conn = await Client.connect();
            const sql = 'delete from catogery where id =($1);';
            const res = await conn.query(sql, [id]);
            conn.release();
            return 'deleted';
        } catch (e) {
            throw new Error(`${e}`);
        }
    }
}
