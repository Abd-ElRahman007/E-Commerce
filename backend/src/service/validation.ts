import joi from 'joi';
//users(id, f_name, l_name, email, password, birthday, phone,status, created_at,city,address,coupon_id);

const userShema = joi.object({
    f_name:joi.string().min(3).max(30),
    l_name:joi.string().min(3).max(30),
    email:joi.string().email().lowercase().required(),
    password:joi.string().min(8).required(),
    birthday:joi.date().max('1-1-2004').iso(),
    phone:joi.string(),
    city:joi.string(),
    address:joi.string(),
});

export {userShema};