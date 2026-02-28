import { Header } from '../components/Header/Header.ts'
import { Categories } from '../components/Categories/Categories'
import { mount } from '../utils/dom.ts'

function bootstrap() {
	mount('#app-header', Header())
	mount('#app-categories', Categories())
}

bootstrap()
