import { mount } from '../utils/dom'
import { BottomMenu } from '../components/BottomMenu/BottomMenu'

type Item = {
	id: number
	name: string
	description: string
	priceText: string
	imageUrl: string
}

const MOCK: Record<number, Item> = {
	1: {
		id: 1,
		name: 'Calabresa',
		description:
			'Molho de tomate, mussarela, cebola, calabresa, catupiry, tomate, orégano e azeitonas',
		priceText: 'R$ 39,90',
		imageUrl: '/img/calabresa.jpg',
	},
	2: {
		id: 2,
		name: 'Lombo com Calabresa',
		description:
			'Molho de tomate, lombo, mussarela, cebola, calabresa, catupiry, tomate, orégano e azeitonas',
		priceText: 'R$ 39,90',
		imageUrl: '/img/lombo.jpg',
	},
}

export function renderItem(root: HTMLElement, id: number) {
	const item = MOCK[id]
	if (!item) {
		root.innerHTML = `<h1 style="padding:20px;">Produto não encontrado</h1>`
		return
	}

	root.innerHTML = `

    <header class="width-fix mt-3">
      <div class="card">
        <div class="d-flex">
          <a href="#/" class="container-voltar">
            <i class="fas fa-arrow-left"></i>
          </a>
          <div class="infos text-center">
            <h1 class="mb-0"><b>Detalhes do produto</b></h1>
          </div>
        </div>
      </div>
    </header>

    <section class="imagem width-fix mt-4">
      <div class="container-imagem-produto" id="hero"></div>

      <div class="card mb-2">
        <div class="d-flex">
          <div class="infos-produto">
            <p class="name mb-2"><b>${item.name}</b></p>
            <p class="description mb-4">${item.description}</p>
            <p class="price"><b>${item.priceText}</b></p>
          </div>
        </div>
      </div>
    </section>

    <section class="opcionais width-fix mt-5 pb-5">
      <div class="container-group mb-5">
        <span class="badge">Obrigatório</span>

        <p class="title-categoria mb-0"><b>Deseja borda?</b></p>
        <span class="sub-title-categoria">Escolha 1 opção</span>

        <div class="card card-opcionais mt-2">
          <div class="infos-produto-opcional">
            <p class="name mb-0"><b>Catupiry</b></p>
            <p class="price mb-0"><b>+ R$ 8,90</b></p>
          </div>
          <div class="checks">
            <label class="container-check">
              <input type="checkbox" name="borda" value="catupiry" />
              <span class="checkmark"></span>
            </label>
          </div>
        </div>

        <div class="card card-opcionais mt-2">
          <div class="infos-produto-opcional">
            <p class="name mb-0"><b>Cheddar</b></p>
            <p class="price mb-0"><b>+ R$ 8,90</b></p>
          </div>
          <div class="checks">
            <label class="container-check">
              <input type="checkbox" name="borda" value="cheddar" />
              <span class="checkmark"></span>
            </label>
          </div>
        </div>
      </div>

      <div class="container-group mb-5">
        <p class="title-categoria mb-0"><b>Observações</b></p>
        <span class="sub-title-categoria">Informe alguma observação abaixo</span>
        <textarea class="form-control mt-2" rows="5" id="obs"></textarea>
      </div>
    </section>

    <section class="menu-bottom details">
      <div class="add-carrinho">
        <button type="button" class="btn-menos" id="minus"><i class="fas fa-minus"></i></button>
        <span class="add-numero-itens" id="qty">1</span>
        <button type="button" class="btn-mais" id="plus"><i class="fas fa-plus"></i></button>
      </div>

      <button type="button" class="btn btn-yellow btn-sm" id="addBtn">
        Adicionar <span id="total">R$ 0,00</span>
      </button>
    </section>

    <div id="app-bottom-menu"></div>
  `

	// imagem grande (mesma ideia do seu HTML)
	const hero = root.querySelector<HTMLDivElement>('#hero')!
	hero.style.backgroundImage = `url(${item.imageUrl})`
	hero.style.backgroundSize = 'cover'

	// radio behavior: borda obrigatória (1 opção)
	const bordas = Array.from(
		root.querySelectorAll<HTMLInputElement>('input[name="borda"]')
	)
	bordas.forEach((ck) =>
		ck.addEventListener('change', () => {
			if (ck.checked)
				bordas
					.filter((x) => x !== ck)
					.forEach((x) => (x.checked = false))
			recalc()
		})
	)

	// qty
	const qtyEl = root.querySelector<HTMLElement>('#qty')!
	root.querySelector('#minus')!.addEventListener('click', () => {
		qtyEl.textContent = String(Math.max(1, Number(qtyEl.textContent) - 1))
		recalc()
	})
	root.querySelector('#plus')!.addEventListener('click', () => {
		qtyEl.textContent = String(Number(qtyEl.textContent) + 1)
		recalc()
	})

	// botão adicionar (mock)
	root.querySelector('#addBtn')!.addEventListener('click', () => {
		const borda = bordas.find((b) => b.checked)?.value ?? null
		const obs = (
			root.querySelector<HTMLTextAreaElement>('#obs')?.value ?? ''
		).trim()
		const qty = Number(qtyEl.textContent || 1)
		console.log('Adicionar:', { id: item.id, qty, borda, obs })
		window.location.hash = '#/cart'
	})

	function parseBRL(text: string) {
		const cleaned = text
			.replace(/\s/g, '')
			.replace('R$', '')
			.replace('.', '')
			.replace(',', '.')
		const n = Number(cleaned)
		return Number.isFinite(n) ? n : 0
	}
	function brl(n: number) {
		return n.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
	}
	function recalc() {
		const base = parseBRL(item.priceText)
		const qty = Number(qtyEl.textContent || 1)
		const hasBorda = bordas.some((b) => b.checked)
		const total = (base + (hasBorda ? 8.9 : 0)) * qty
		root.querySelector<HTMLElement>('#total')!.textContent = brl(total)
	}

	recalc()

	// Aqui, o bottom menu normal não é necessário porque a tela já tem menu-bottom.details,
	// mas se você quiser manter consistente, deixe fechado:
	mount('#app-bottom-menu', BottomMenu({ isOpen: false }))
}
