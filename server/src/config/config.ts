import { config as dotenvConfig } from 'dotenv';
dotenvConfig();

interface OptionalConfig {
  PORT_API: number;
  NODE_ENV: string;
}

interface RequiredConfig {
  DB_CONNECTION_STRING: string;
  JWT_SECRET: string;
}

const optionalConfig: OptionalConfig = {
  PORT_API: parseInt(process.env.PORT_API || '3000', 10),
  NODE_ENV: process.env.NODE_ENV || 'development',
};
// 将字符串转换为数字，10表示使用十进制

const requiredConfig: RequiredConfig = {
  DB_CONNECTION_STRING: process.env.DB_CONNECTION_STRING!,
  JWT_SECRET: process.env.JWT_SECRET!,
};

for (const key in requiredConfig) {
  if (requiredConfig[key as keyof RequiredConfig] == null) {
    throw new Error(`Missing value for environment variable ${key}`);
  }
}

const config = { ...optionalConfig, ...requiredConfig };

export default config;
