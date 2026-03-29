import '@delivery/ui/styles/theme.css'
import './styles/painel.css'
import { router } from './routes/router'

const appElement = document.querySelector<HTMLDivElement>('#app')

if (!appElement) {
	throw new Error('Elemento #app não encontrado')
}

const app = appElement

function render() {
	app.innerHTML = ''
	router()
}

window.addEventListener('hashchange', render)
render()
