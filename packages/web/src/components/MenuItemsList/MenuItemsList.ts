import './style.css'

import { MenuItemCard, type MenuItem } from '../MenuItemsCards/MenuItemsCards'

export function MenuItemsList(items: MenuItem[]): HTMLElement {
	const container = document.createElement('div')
	container.className = 'width-fix mt-4'

	if (!items.length) {
		container.innerHTML = `
      <div class="empty-state">
        <p><b>Nenhum produto cadastrado.</b></p>
        <p>
          Vá até o <b>painel administrativo</b> e adicione produtos ao cardápio.
        </p>
      </div>
    `
		return container
	}

	items.forEach((item) => {
		container.appendChild(MenuItemCard(item))
	})

	return container
}
