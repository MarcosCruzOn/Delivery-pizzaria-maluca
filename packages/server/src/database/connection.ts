import mysql from 'mysql2/promise'
import dotenv from 'dotenv'

// Carrega as configurações do .env
dotenv.config()

// Cria o Pool de conexões
const pool = mysql.createPool({
	host: process.env.DB_HOST,
	user: process.env.DB_USER,
	password: process.env.DB_PASSWORD,
	database: process.env.DB_NAME,
	waitForConnections: true,
	connectionLimit: 10, // Limite máximo de "atendentes" simultâneos
	queueLimit: 0,
})

export default pool
