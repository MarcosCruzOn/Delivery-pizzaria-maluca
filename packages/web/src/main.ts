import '@delivery/ui/styles/theme.css'

import { renderHome } from './pages/index'
import { renderAbout } from './pages/about'
import { renderCart } from './pages/cart'
import { renderOrder } from './pages/order'
import { renderItem } from './pages/item'

// pega a rota atual do hash: "#/about" -> "/about"
function getRoute(): string {
	const hash = window.location.hash || '#/'
	return hash.replace('#', '')
}

function router() {
	const route = getRoute()
	const app = document.querySelector<HTMLDivElement>('#app')
	if (!app) return

	app.innerHTML = '' // limpa a tela

	if (route === '/' || route === '') return renderHome(app)
	if (route === '/about') return renderAbout(app)
	if (route === '/cart') return renderCart(app)
	if (route === '/order') return renderOrder(app)

	//rota dinâmica: /item/123
	if (route.startsWith('/item/')) {
		const idText = route.replace('/item/', '')
		const id = Number(idText)
		if (!Number.isFinite(id)) {
			app.innerHTML = `<h1 style="padding:20px;">404</h1>`
			return
		}
		renderItem(app, id)
		return
	}
}

// roda ao abrir e ao mudar o hash
window.addEventListener('hashchange', router)
router()
