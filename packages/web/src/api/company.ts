export async function getCompany() {
	const res = await fetch('http://localhost:3333/company')
	return res.json()
}

export async function getHorarios() {
	const res = await fetch('http://localhost:3333/company/horario')
	return res.json()
}
