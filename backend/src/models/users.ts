// import Client from '../database';
// import bcrypt from 'bcrypt';
// import dotenv from 'dotenv';
// dotenv.config();

// /*
// create table users(id serial primary key, f_name varchar(50), l_name varchar(50), 
// email varchar(500) unique not null, password varchar(500) not null, birthday date, 
// phone varchar(11),status varchar(50), created_at timestamp,city varchar(150),address varchar(500));

// */

// const { extra, round } = process.env;

// export type user = {
//   id?: number;
//   f_name: string;
//   l_name: string;
//   email:string;
//   password: string;
//   birthday:Date;
//   phone:string;
//   status:string;
//   created_at:AudioTimestamp;
//   city:string;
//   address:string;
// };

// export class User {
//     async index(): Promise<user[]> {
//         try {
//             const conn = await Client.connect();
//             const sql = 'select * from users;';
//             const res = await conn.query(sql);
//             conn.release();
//             return res.rows;
//         } catch (e) {
//             throw new Error(`${e}`);
//         }
//     }

//     async show(id: number): Promise<user> {
//         try {
//             const conn = await Client.connect();
//             const sql = 'select * from users where id =($1);';
//             const res = await conn.query(sql, [id]);
//             conn.release();
//             return res.rows[0];
//         } catch (e) {
//             throw new Error(`${e}`);
//         }
//     }

//     async create(u: user): Promise<user> {
//         const hash = bcrypt.hashSync(u.password + extra, parseInt(round as string));
//         try {
//             const conn = await Client.connect();
//             const sql =
//         'insert into users (first_name, last_name, password) values($1,$2,$3)RETURNING*;';
//             const res = await conn.query(sql, [u.first_name, u.last_name, hash]);
//             conn.release();
//             return res.rows[0];
//         } catch (e) {
//             throw new Error(`${e}`);
//         }
//     }

//     async update(u: user): Promise<user> {
//         try {
//             const conn = await Client.connect();
//             const sql =
//         'update users set first_name=($1), last_name=($2) where id=($3)RETURNING*; ';
//             const res = await conn.query(sql, [u.first_name, u.last_name, u.id]);
//             conn.release();
//             return res.rows[0];
//         } catch (e) {
//             throw new Error(`${e}`);
//         }
//     }

//     async delete(id: number): Promise<string> {
//         try {
//             const conn = await Client.connect();
//             const sql = 'delete from users where id =($1) ;';
//             const res = await conn.query(sql, [id]);
//             conn.release();
//             return 'deleted';
//         } catch (e) {
//             throw new Error(`${e}`);
//         }
//     }

//     async auth(email: string, pass: string): Promise<string> {
//         try {
//             const conn = await Client.connect();
//             const sql = 'select * from users where email=($1);';
//             const res = await conn.query(sql, [email]);
//             if (res.rows.length) {
//                 const isExist = bcrypt.compareSync(pass + extra, res.rows[0].password);
//                 if (isExist) return 'succeed';
//             }
//             return 'faild';
//         } catch (e) {
//             throw new Error(`${e}`);
//         }
//     }
// }
