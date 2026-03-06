import { renderLogin } from '../pages/login'
import { renderDashboard } from '../pages/dashboard'
import { renderOrders } from '../pages/orders'
import { renderMenuAdmin } from '../pages/menu'
import { renderSettings } from '../pages/settings'
import { renderCompany } from '../pages/company'
import { renderReports } from '../pages/reports'

export function getRoute() {
	return (window.location.hash || '#/login').replace('#', '')
}

export function isLogged() {
	return !!localStorage.getItem('admin_token')
}

export function router(app: HTMLDivElement) {
	const route = getRoute()

	if (!isLogged() && route !== '/login') {
		window.location.hash = '#/login'
		return
	}

	if (route === '/login') return renderLogin(app)
	if (route === '/home') return renderDashboard(app)
	if (route === '/orders') return renderOrders(app)
	if (route === '/menu') return renderMenuAdmin(app)
	if (route === '/settings') return renderSettings(app)
	if (route === '/company') return renderCompany(app)
	if (route === '/reports') return renderReports(app)

	app.innerHTML = `<div style="padding:20px;">404</div>`
}
