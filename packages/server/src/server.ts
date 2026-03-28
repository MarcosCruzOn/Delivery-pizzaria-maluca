import express, { Request, Response } from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import routes from './routes/index.js'
import path from 'path'

import { getDirname } from './utils/pathUtils.js' // 👈 Importamos a nossa ferramenta

import uploadRoutes from './routes/upload.routes.js'

// Carrega as variáveis de ambiente do arquivo .env
dotenv.config()

// Inicializa o aplicativo Express
const app = express()

// O CORS permite que seu Admin e sua Web (que rodam em portas diferentes) consigam conversar com esta API
app.use(cors())

// Permite que o servidor entenda informações enviadas no formato JSON
app.use(express.json())

// Olha a elegância! Em uma linha você tem o __dirname resolvido:
const __dirname = getDirname(import.meta.url)

app.use('/uploads', express.static(path.resolve(__dirname, '..', 'uploads')))

// 2. Adicione esta linha (Todas as nossas rotas vão começar com /api):
app.use('/api', routes)

//  Conectando a rota de upload especificamente no caminho /api/admin/upload
app.use('/api/admin/upload', uploadRoutes)

// Criando uma rota de teste bem simples para sabermos se está funcionando
app.get('/teste', (req: Request, res: Response) => {
	return res.json({
		mensagem:
			'Olá! O servidor da Pizzaria Maluca está rodando perfeitamente! 🍕',
	})
})

// Define a porta puxando do .env, ou usa a 3333 como padrão
const PORT = process.env.PORT || 3333

// Faz o servidor "escutar" a porta definida e avisa no terminal
app.listen(PORT, () => {
	console.log(`🚀 Servidor rodando na porta ${PORT}`)
})
