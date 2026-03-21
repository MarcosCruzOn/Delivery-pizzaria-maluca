import { Request, Response } from 'express'
import { db } from '../database/connection.js'

export async function listOpcionais(req: Request, res: Response) {
	try {
		const [rows] = await db.query('SELECT * FROM opcional')

		res.json(rows)
	} catch (error) {
		console.error(error)
		res.status(500).json({ error: 'Erro ao buscar opcionais' })
	}
}

export async function listOpcionalItens(req: Request, res: Response) {
	try {
		const { id } = req.params

		const [rows] = await db.query(
			'SELECT * FROM opcionalitem WHERE idopcional = ?',
			[id]
		)

		res.json(rows)
	} catch (error) {
		console.error(error)
		res.status(500).json({ error: 'Erro ao buscar itens do opcional' })
	}
}
