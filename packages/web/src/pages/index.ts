import { Header } from '../components/Header/Header.ts'
import { mount } from '../utils/dom.ts'

function bootstrap() {
	mount('#app-header', Header())
}

bootstrap()
