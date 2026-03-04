import { mount } from '../utils/dom'
import { TitleHeader } from '../components/TitleHeader/TitleHeader'

export function renderAbout(root: HTMLElement) {
	root.innerHTML = `

    <div class="bg-top sobre"></div>    
    <div id="app-title-header"></div>

    <section class="width-fix mt-5 mb-4">
      <div class="card">

          <div class="d-flex">

              <div class="container-img-sobre">
                <img class="img-sobre" src="./logo.png" alt="Logo da Pizzaria Maluca" />  
              </div>

              <div class="infos">
                  <h1 class="title-sobre"><b>Pizzaria Maluca</b></h1>
                  <div class="infos-sub">
                      <p class="sobre mb-2">
                          Lorem ipsum dolor sit amet, consectetur
                          adipiscing elit. Sed eget nunc ut velit
                          pellentesque tempus. Donec eu justo sapien. In
                          tortor neque, dictum suscipit felis vel,
                          vehicula porttitor ex. Sed velit lectus,
                          malesuada sit amet nulla id, scelerisque luctus
                          turpis. Suspendisse magna metus, pharetra nec
                          fringilla nec, efficitur sed ante.
                      </p>
                  </div>
              </div>

          </div>

      </div>
        </section>


        <section class="lista width-fix mt-5 pb-5">

            <div class="container-group mb-5">
                <p class="title-categoria mb-0">
                    <i class="fas fa-map-marker-alt"></i>&nbsp; <b>Endereço</b>
                </p>
                <div class="card mt-2">
                    <p class="normal-text mb-0">Rua Olá Mundo, 123 - Meu Bairro, São Paulo/SP</p>
                </div>
            </div>

            <div class="container-group mb-5">
                <p class="title-categoria mb-0">
                    <i class="fas fa-clock"></i>&nbsp; <b>Horário de funcionamento</b>
                </p>
                <div class="card mt-2">
                    <p class="normal-text mb-0"><b>Segunda a Sexta</b></p>
                    <p class="normal-text mb-0">18:00 às 23:00</p>
                </div>
                <div class="card mt-2">
                    <p class="normal-text mb-0"><b>Sábado</b></p>
                    <p class="normal-text mb-0">17:00 às 23:00</p>
                </div>
            </div>

            <div class="container-group mb-5">
                <p class="title-categoria mb-0">
                    <i class="fas fa-coins"></i>&nbsp; <b>Formas de pagamento</b>
                </p>
                <div class="card mt-2">
                    <p class="normal-text mb-0"><b>Crédito</b></p>
                </div>
                <div class="card mt-2">
                    <p class="normal-text mb-0"><b>Débito</b></p>
                </div>
                <div class="card mt-2">
                    <p class="normal-text mb-0"><b>Dinheiro</b></p>
                </div>

            </div>

        </section>
  `

	// no sobre.html original você usa o menu fechado (disabled hidden) :contentReference[oaicite:4]{index=4}
	mount('#app-title-header', TitleHeader({ title: 'Sobre a loja' }))
}
