import { config } from 'dotenv'
config()

export const MYSQL_DATA_DIR = process.env.MYSQL_DATA_DIR || "C:/Program Files/MySQL/MySQL Server 8.0/Data"
export const MYSQL_DIR = process.env.MYSQL_DIR || "C:/Program Files/MySQL/MySQL Server 8.0"