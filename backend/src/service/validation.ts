import joi from 'joi';
//validation schema file

const userSchema = {
    create: joi.object({
        admin_email:joi.string().email().lowercase().optional(),
        admin_password:joi.string().optional(),
        f_name:joi.string().min(3).max(30).optional(),
        l_name:joi.string().min(3).max(30).optional(),
        email:joi.string().email().lowercase().required(),
        password:joi.string().min(8).required(),
        status: joi.string().lowercase().default('active').valid('active','admin','deactive','suspended'),
        birthday:joi.date().max('1-1-2004').optional(),
        phone:joi.string().optional(),
        city:joi.string().optional(),
        address:joi.string().optional(),
        coupon_id:joi.number().optional()
    }),
    //
    update: joi.object({
        admin_email:joi.string().email().lowercase().optional(),
        admin_password:joi.string().optional(),
        f_name:joi.string().min(3).max(30).optional(),
        l_name:joi.string().min(3).max(30).optional(),
        email:joi.string().email().lowercase().optional(),
        password:joi.string().min(8).optional(),
        status: joi.string().lowercase().default('active').valid('admin','active','deactive','suspended'),
        birthday:joi.date().max('1-1-2004').optional(),
        phone:joi.string().optional(),
        city:joi.string().optional(),
        address:joi.string().optional(),
        coupon_id:joi.number().optional()
    }),
    //
    login: joi.object({
        email:joi.string().email().lowercase().required(),
        password:joi.string().min(8).required(),
    }),
    //
    reset_password: joi.object({
        password:joi.string().min(8).required(),
    }),
};

const brandSchema = {
    create:joi.object({
        admin_email:joi.string().email().lowercase().optional(),
        admin_password:joi.string().optional(),
        name: joi.string().required(),
        description:joi.string().optional()
    }),
    //
    update:joi.object({
        admin_email:joi.string().email().lowercase().optional(),
        admin_password:joi.string().optional(),
        name: joi.string().optional(),
        description:joi.string().optional()
    })
};

const catSchema = {
    create:joi.object({
        admin_email:joi.string().email().lowercase().optional(),
        admin_password:joi.string().optional(),
        name: joi.string().required()
    }),
    //
    update:joi.object({
        admin_email:joi.string().email().lowercase().optional(),
        admin_password:joi.string().optional(),
        name: joi.string().optional()
    })
};
//
const couponSchema = {
    create:joi.object({
        admin_email:joi.string().email().lowercase().optional(),
        admin_password:joi.string().optional(),
        code: joi.string().required(),
        value_of_100:joi.number().max(100).min(0).required()
    }),
    //
    update:joi.object({
        admin_email:joi.string().email().lowercase().optional(),
        admin_password:joi.string().optional(),
        code: joi.string().optional(),
        value_of_100:joi.number().max(100).min(0).optional()
    })
};
//
const commentSchema = {
    create:joi.object({
        admin_email:joi.string().email().lowercase().optional(),
        admin_password:joi.string().optional(),
        subject: joi.string().max(255).optional(),
        message:joi.string().max(1000).required(),
        vote:joi.number().max(5).min(0).optional()
    }),
    //
    update:joi.object({
        admin_email:joi.string().email().lowercase().optional(),
        admin_password:joi.string().optional(),
        subject: joi.string().max(255).optional(),
        message:joi.string().max(1000).optional(),
        vote:joi.number().max(5).min(0).optional()
    })
};

const productSchema = {
    create: joi.object({
        admin_email:joi.string().email().lowercase().optional(),
        admin_password:joi.string().optional(),

        name: joi.string().optional(),
        price: joi.number().min(0).required(),
        code:joi.string().required(),
        model:joi.string().optional(),
        image:joi.string().required(),
        images:joi.array().optional(),
        description:joi.string().optional(),
        category_id:joi.number().min(0).required(),
        currency:joi.string().lowercase().required().valid('egp','eur','usd','cad','gbp','aud'),
        vote_count:joi.number().default(0).required(),
        vote_total:joi.number().default(0).required(),
        stock:joi.number().min(0).required(),
        brand_id:joi.number().min(0).required(),
    }),
    //
    update: joi.object({
        admin_email:joi.string().email().lowercase().optional(),
        admin_password:joi.string().optional(),

        name: joi.string().optional(),
        price: joi.number().min(0).optional(),
        code:joi.string().optional(),
        model:joi.string().optional(),
        image:joi.string().optional(),
        images:joi.array().optional(),
        description:joi.string().optional(),
        category_id:joi.number().min(0).optional(),
        currency:joi.string().optional().valid('egp','eur','usd','cad','gbp','aud'),
        vote_count:joi.number().default(0).optional(),
        vote_total:joi.number().default(0).optional(),
        stock:joi.number().min(0).optional(),
        brand_id:joi.number().min(0).optional(),
    })
};

const orderSchema = {
    create: joi.object({
        admin_email:joi.string().email().lowercase().optional(),
        admin_password:joi.string().optional(),

        order:joi.object({
            status:joi.string().valid('open','pendding','canceled','complete').required(),
            total:joi.number().required(),
            time_arrival:joi.date().optional(),
            compelete_at:joi.date().optional(),
            payment:joi.string().valid('on_delivery','online').required(),
            shipping_address:joi.string().required(),
            shipping_cost:joi.number().min(0).required(),
            taxes:joi.number().min(0).optional(),
        }),
        products:joi.array().items(
            joi.object({
                product_id:joi.number().optional(),
                quantity:joi.number().optional(),
            })
        ).required()
    }),
    //
    update: joi.object({
        admin_email:joi.string().email().lowercase().optional(),
        admin_password:joi.string().optional(),

        order:joi.object({
            status:joi.string().valid('open','pendding','canceled','complete').optional(),
            total:joi.number().optional(),
            time_arrival:joi.date().optional(),
            compelete_at:joi.date().optional(),
            payment:joi.string().valid('on_delivery','online').optional(),
            shipping_address:joi.string().optional(),
            shipping_cost:joi.number().min(0).optional(),
            taxes:joi.number().min(0).optional(),
        }),
        products:joi.array().items(
            joi.object({
                product_id:joi.number().optional(),
                quantity:joi.number().optional(),
            })
        ).optional()

    })
};
export {userSchema, brandSchema, catSchema, couponSchema, commentSchema, productSchema, orderSchema};

