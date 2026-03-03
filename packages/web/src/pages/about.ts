import { mount } from '../utils/dom'
import { TitleHeader } from '../components/TitleHeader/TitleHeader'
import { BottomMenu } from '../components/BottomMenu/BottomMenu'

export function renderAbout(root: HTMLElement) {
	root.innerHTML = `
    
    <div id="app-title-header"></div>

    <section class="width-fix mt-5 mb-4">
      <div class="card">
        <div class="d-flex">
          <div class="logo-sobre">
           <img src="./logo.png" alt="Logo da Pizzaria Maluca">
          </div>

          <div class="infos">
            <h1 class="title-sobre"><b>Pizzaria Maluca</b></h1>
            <div class="infos-sub">
              <p class="sobre mb-2">
                Lorem ipsum...
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="lista width-fix mt-5 pb-5">
      <!-- aqui você pode colar o resto do conteúdo do seu sobre.html -->
    </section>

    <a href="#/" class="btn btn-yellow btn-full voltar">
      Voltar para o cardápio
    </a>

    <div id="app-bottom-menu"></div>
  `

	// no sobre.html original você usa o menu fechado (disabled hidden) :contentReference[oaicite:4]{index=4}
	mount('#app-title-header', TitleHeader({ title: 'Sobre a loja' }))
	mount('#app-bottom-menu', BottomMenu({ isOpen: false }))
}
