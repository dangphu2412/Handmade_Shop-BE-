export const JwtConfig = {
    SECRET_KEY: process.env.SECRET_KEY,
    EXPIRE_DATE: process.env.EXPIRE_DATE,
};

export const GoogleCreden = "";

export const saltRounds = parseInt(process.env.SALT_ROUNDS, 10);
