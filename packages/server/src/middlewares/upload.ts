import multer from 'multer'
import path from 'path'
import fs from 'fs'

const uploadDir = path.resolve('packages/server/uploads')

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
