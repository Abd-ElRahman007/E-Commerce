import Client from '../database';



export type product = {
    id?: number;
    code: string;
    name: string;
    model: string;
    images?: Array<string>;
    description: string;
    category_id: number;
    price: number;
    currency: string;
    vote_count: number;
    vote_total: number;
    stock: number;
    brand_id: number;
};



export class Product {
    async index(): Promise<product[]> {
        try {
            const conn = await Client.connect();
            const sql = 'select * from product;';
            const res = await conn.query(sql);
            conn.release();
            
            
            return res.rows;
        } catch (e) {
            throw new Error(`${e}`);
        }
    }

    async show(id: number): Promise<object> {
        try {
            const conn = await Client.connect();
            const sql = 'select * from product where id =($1);';
            const res = await conn.query(sql, [id]);
            
            conn.release();
            return res.rows[0];
        } catch (e) {
            throw new Error(`${e}`);
        }
    }

    async search_by_category(category_id: number): Promise<product[]> {
        try {
            const conn = await Client.connect();
            const sql = 'select * from product where category_id =($1);';
            const res = await conn.query(sql, [category_id]);
            conn.release();
            return res.rows;
        } catch (e) {
            throw new Error(`${e}`);
        }
    }
    

    async create(p: product): Promise<string> {
        try {
            const conn = await Client.connect();

            const sql =
        'insert into product (code,  name,  model,  images,  description,category_id, price, currency , vote_count, vote_total, stock, brand_id) values($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12)RETURNING *;';
            const res = await conn.query(sql, [
                p.code,
                p.name,
                p.model,
                p.images,
                p.description,
                p.category_id,
                p.price,
                p.currency,
                p.vote_count,
                p.vote_total,
                p.stock,
                p.brand_id,
            ]);
            conn.release();
            return res.rows[0];
        } catch (e) {
            throw new Error(`${e}`);
        }
    }

    async update(p: product): Promise<string> {
        try {
            const conn = await Client.connect();
            const sql =
        'update product set code=($1),  name=($2),  model=($3),  images=($4),  description=($5),category_id=($6), price=($7), currency=($8) , vote_count=($9), vote_total=($10), stock=($11), brand_id=($12) where id=($13) RETURNING *; ';
            const res = await conn.query(sql, [
                p.code,
                p.name,
                p.model,
                p.images,
                p.description,
                p.category_id,
                p.price,
                p.currency,
                p.vote_count,
                p.vote_total,
                p.stock,
                p.brand_id,
                p.id,
            ]);
            conn.release();
            return res.rows[0];
        } catch (e) {
            throw new Error(`${e}`);
        }
    }

    async delete(id: number): Promise<string> {
        try {
            const conn = await Client.connect();
            const sql = 'delete from product where id =($1);';
            await conn.query(sql, [id]);
            conn.release();
            return 'deleted';
        } catch (e) {
            throw new Error(`${e}`);
        }
    }
}
