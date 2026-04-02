import { renderLogin } from '../pages/login' // Importa a tela de login que arrumamos
import { renderCompany } from '../pages/company'
import { renderDashboard } from '../pages/home'
import { renderMenuAdmin } from '../pages/menu'
import { renderSettings } from '../pages/settings'
import { renderOrders } from '../pages/orders'
import { renderReports } from '../pages/reports'

// Exportamos a função 'router' que o main.ts está desesperado procurando!
export async function router() {
	// Pegamos a div <div id="app"></div> lá do seu index.html raiz
	const appRoot = document.querySelector<HTMLElement>('#app')

	if (!appRoot) {
		console.error('Elemento #app não encontrado no index.html!')
		return
	}

	// Pegamos a parte da URL depois do # (o Hash)
	const hash = window.location.hash

	// Limpamos a tela inteira antes de desenhar a nova
	appRoot.innerHTML = ''

	// Verificamos em qual rota estamos
	switch (hash) {
		case '':
		case '#/':
		case '#/login':
			renderLogin(appRoot)
			break
		case '#/home':
			renderDashboard(appRoot)
			break
		case '#/company':
			renderCompany(appRoot)
			break
		case '#/menu':
			renderMenuAdmin(appRoot)
			break
		case '#/settings':
			renderSettings(appRoot)
			break
		case '#/orders':
			renderOrders(appRoot)
			break
		case '#/reports':
			renderReports(appRoot)
			break

		default:
			// Se o cara digitar #/batata, cai aqui
			appRoot.innerHTML = `<h1>Erro 404 - Página não encontrada</h1>`
	}
}
