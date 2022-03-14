import dotenv from 'dotenv';

dotenv.config();

interface TokenEnv {
  EXP: string;
  EXP_REFRESH: string;
  SECRET_KEY: string;
  SECRET_REFRESH_KEY: string;
  TOKEN_REFRESH_PATH: string;
  TOKEN_REFRESH_NAME: string;
}

interface DB {
  port: number;
  host: string;
  name: string;
}

interface Users {
  admin: string;
  admin_pass: string;
  test: string;
  test_pass: string;
}

interface Configuration {
  IS_PRODUCTION: boolean;
  PORT: number;
  token: Readonly<TokenEnv>;
  db: Readonly<DB>;
  users: Readonly<Users>;
  origin: string;
}

const {
  NODE_ENV,
  SERVER_PORT,
  TOKEN_EXP_TIME,
  TOKEN_EXP_REFRESH_TIME,
  TOKEN_SECRET_KEY,
  TOKEN_REFRESH_SECRET_KEY,
  TOKEN_REFRESH_PATH,
  TOKEN_REFRESH_NAME,
  MONGO_HOST,
  MONGO_PORT,
  MONGO_DB_NAME,
  ADMIN_USERNAME,
  ADMIN_PASSWORD,
  TEST_CUSTOMER_USERNAME,
  TEST_CUSTOMER_PASSWORD,
  ORIGIN,
} = process.env;

export const env: Readonly<Configuration> = {
  IS_PRODUCTION: NODE_ENV === 'production',
  PORT: Number(SERVER_PORT),
  token: {
    EXP: TOKEN_EXP_TIME,
    SECRET_KEY: TOKEN_SECRET_KEY,
    SECRET_REFRESH_KEY: TOKEN_REFRESH_SECRET_KEY,
    EXP_REFRESH: TOKEN_EXP_REFRESH_TIME,
    TOKEN_REFRESH_PATH,
    TOKEN_REFRESH_NAME,
  } as TokenEnv,
  db: {
    port: Number(MONGO_PORT),
    host: MONGO_HOST,
    name: MONGO_DB_NAME,
  } as DB,
  users: {
    admin: ADMIN_USERNAME,
    admin_pass: ADMIN_PASSWORD,
    test: TEST_CUSTOMER_USERNAME,
    test_pass: TEST_CUSTOMER_PASSWORD,
  } as Users,
  origin: ORIGIN as string,
};
