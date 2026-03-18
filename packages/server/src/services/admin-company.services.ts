import {
	getCompanyQuery,
	updateCompanyAboutQuery,
} from '../database/queries/company.queries.js'
import { updateCompanyAddressQuery } from '../database/queries/company.queries.js'

export async function getCompanyService() {
	return getCompanyQuery()
}

export async function updateCompanyAboutService(data: any) {
	const { nome, sobre } = data

	if (!nome) throw new Error('Nome obrigatório')

	return updateCompanyAboutQuery(nome, sobre)
}

export async function updateCompanyAddressService(data: any) {
	if (!data.cep) throw new Error('CEP obrigatório')
	if (!data.endereco) throw new Error('Endereço obrigatório')

	return updateCompanyAddressQuery(data)
}
