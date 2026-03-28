import multer from 'multer'
import path from 'path'
import { getDirname } from '../utils/pathUtils.js' // 👈 Importamos a nossa ferramenta

// Uma linha só e pronto!
const __dirname = getDirname(import.meta.url)

// Configuração do "Armazém" (Storage)
const storage = multer.diskStorage({
	// 1. Onde vamos guardar as fotos?
	destination: (req, file, cb) => {
		// Apontamos para a pasta "uploads" que fica na raiz do server
		cb(null, path.resolve(__dirname, '..', '..', 'uploads'))
	},

	// 2. Que nome vamos dar para a foto?
	filename: (req, file, cb) => {
		// Pegamos a data atual em milissegundos e juntamos com o nome original.
		// Exemplo: 16987654321-calabresa.jpg (Isso evita que fotos com o mesmo nome se apaguem)
		const nomeUnico = `${Date.now()}-${file.originalname}`
		cb(null, nomeUnico)
	},
})

// Criamos o nosso "recepcionista" passando as regras acima
export const uploadMiddleware = multer({ storage: storage })
