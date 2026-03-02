import { BottomMenu } from '../components/BottomMenu/BottomMenu'
import { mount } from '../utils/dom'

export function renderAbout(root: HTMLElement) {
	root.innerHTML = `
    
    <header class="width-fix mt-3">
      <div class="card">
        <div class="d-flex">
          <a href="#/" class="container-voltar">
            <i class="fas fa-arrow-left"></i>
          </a>
          <div class="infos text-center">
            <h1 class="mb-0"><b>Sobre a loja</b></h1>
          </div>
        </div>
      </div>
    </header>

    <section class="width-fix mt-5 mb-4">
      <div class="card">
        <div class="d-flex">
          <div class="container-img-sobre"
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
	mount('#app-bottom-menu', BottomMenu({ isOpen: false }))
}
