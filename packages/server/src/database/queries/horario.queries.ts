import { db } from '../connection.js'

export async function createHorarioQuery(data: any) {
	const {
		diainicio,
		diafim,
		iniciohorarioum,
		fimhorarioum,
		iniciohorariodois,
		fimhorariodois,
	} = data

	const [result]: any = await db.execute(
		`
		INSERT INTO horario
		(diainicio, diafim, iniciohorarioum, fimhorarioum, iniciohorariodois, fimhorariodois)
		VALUES (?, ?, ?, ?, ?, ?)
	`,
		[
			diainicio,
			diafim,
			iniciohorarioum,
			fimhorarioum,
			iniciohorariodois || '',
			fimhorariodois || '',
		]
	)

	return result
}

export async function listHorarioQuery() {
	const [rows]: any = await db.execute(`
		SELECT * FROM horario ORDER BY diainicio
	`)
	return rows
}

export async function deleteHorarioQuery(id: number) {
	const [result]: any = await db.execute(
		`DELETE FROM horario WHERE idhorario = ?`,
		[id]
	)

	return result
}
