import "dotenv/config";

export const ServerConfig = {
    HOST: process.env.HOST,
    PORT: process.env.PORT,
    FRONT_HOST: process.env.FRONT_HOST,
};

export const JwtConfig = {
    SECRET_KEY: process.env.SECRET_KEY,
    EXPIRE_DATE: process.env.EXPIRE_DATE,
};

export const GoogleCreden = "";

export const saltRounds = parseInt(process.env.SALT_ROUNDS, 10);

export const MailAuthConfig = {
    user: process.env.EMAIL_ACCOUNT,
    pass: process.env.EMAIL_PASSWORD,
};

export const CloudinaryConfig = {
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET,
    enhance_image_tag: true,
    static_file_support: false,
};

if (!ServerConfig.FRONT_HOST || !ServerConfig.HOST || !ServerConfig.PORT) {
    console.error("You are missing server config in env! Please check constants/secrect.js");
    process.exit(1);
}

if (!JwtConfig.EXPIRE_DATE || !JwtConfig.SECRET_KEY) {
    console.error("You are missing jwt config in env! Please check config/secrect.js");
    process.exit(1);
}

if (!saltRounds) {
    console.error("You are missing SALT_ROUNDS config in env for using bcrypt! Please check config/secrect.js");
    process.exit(1);
}