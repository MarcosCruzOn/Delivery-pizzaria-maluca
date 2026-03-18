import {
	createHorarioQuery,
	listHorarioQuery,
	deleteHorarioQuery,
} from '../database/queries/horario.queries.js'

export async function createHorarioService(data: any) {
	if (!data.diainicio) throw new Error('Dia início obrigatório')

	return createHorarioQuery(data)
}

export async function listHorarioService() {
	return listHorarioQuery()
}

export async function deleteHorarioService(id: number) {
	return deleteHorarioQuery(id)
}
