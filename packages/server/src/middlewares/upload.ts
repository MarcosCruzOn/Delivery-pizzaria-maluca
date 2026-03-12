import multer from 'multer'
import path from 'path'
import fs from 'fs'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const uploadDir = path.resolve(__dirname, '../../uploads')

if (!fs.existsSync(uploadDir)) {
	fs.mkdirSync(uploadDir, { recursive: true })
}

const storage = multer.diskStorage({
	destination: (_req, _file, cb) => {
		cb(null, uploadDir)
	},
	filename: (_req, file, cb) => {
		const ext = path.extname(file.originalname)
		const fileName = `produto-${Date.now()}${ext}`
		cb(null, fileName)
	},
})

export const upload = multer({ storage })
