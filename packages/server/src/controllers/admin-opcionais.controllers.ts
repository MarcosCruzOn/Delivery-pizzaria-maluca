import { Request, Response } from 'express'
import { db } from '../database/connection.js'

export async function createOpcional(req: Request, res: Response) {
	try {
		const { nome, minimo, maximo, tiposimples } = req.body

		const [result]: any = await db.query(
			'INSERT INTO opcional (nome, minimo, maximo, tiposimples) VALUES (?, ?, ?, ?)',
			[nome, minimo, maximo, tiposimples]
		)

		return res.status(201).json({ id: result.insertId })
	} catch (error) {
		console.error(error)
		return res.status(500).json({ error: 'Erro ao criar opcional' })
	}
}

export async function listOpcionais(req: Request, res: Response) {
	try {
		const [rows] = await db.query('SELECT * FROM opcional')

		res.json(rows)
	} catch (error) {
		console.error(error)
		res.status(500).json({ error: 'Erro ao buscar opcionais' })
	}
}

export async function createOpcionalItem(req: Request, res: Response) {
	try {
		const { idopcional, nome, valor } = req.body

		const [result]: any = await db.query(
			'INSERT INTO opcionalitem (idopcional, nome, valor) VALUES (?, ?, ?)',
			[idopcional, nome, valor]
		)

		return res.status(201).json({ id: result.insertId })
	} catch (error) {
		console.error(error)
		return res.status(500).json({ error: 'Erro ao criar item' })
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
