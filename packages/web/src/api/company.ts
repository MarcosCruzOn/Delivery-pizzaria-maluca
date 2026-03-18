export async function getCompany() {
	const res = await fetch('http://localhost:3333/company')
	return res.json()
}
