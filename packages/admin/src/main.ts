import '../../ui/styles/theme.css'
import './styles/painel.css'

import { renderLogin } from './pages/login'
import { renderDashboard } from './pages/dashboard'
import { renderOrders } from './pages/orders'

function getRoute() {
	return (window.location.hash || '#/login').replace('#', '')
}

function isLogged() {
	return !!localStorage.getItem('admin_token')
}

function router() {
	const app = document.querySelector<HTMLDivElement>('#app')
	if (!app) return

	const route = getRoute()
	app.innerHTML = ''

	if (!isLogged() && route !== '/login') {
		window.location.hash = '#/login'
		return
	}

	if (route === '/login') {
		renderLogin(app)
		return
	}

	if (route === '/dashboard') {
		renderDashboard(app)
		return
	}

	if (route === '/orders') return renderOrders(app)

	app.innerHTML = `<div style="padding:20px;">404</div>`
}

window.addEventListener('hashchange', router)
router()
