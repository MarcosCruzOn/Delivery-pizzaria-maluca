import type { Request, Response } from 'express'

export function getAbout(_req: Request, res: Response) {
	res.json({ message: 'Sobre a Pizzaria Maluca!' })
}
