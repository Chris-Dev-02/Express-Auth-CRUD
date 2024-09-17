import { config } from "dotenv";

config()

export const PORT = process.env.PORT || 8000
export const SECRET_KEY = process.env.PORT || 'auth_crud_secret_key'
export const DB_NAME = process.env.PORT || 'basic_auth_crud'
export const DB_HOST = process.env.PORT || '127.0.0.1:27017'
