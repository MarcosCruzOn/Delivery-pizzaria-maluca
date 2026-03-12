import { renderCategories } from './renderCategories'
import type { Category } from './types'

export function renderMenu(root: HTMLElement, categories: Category[]) {
	const container = root.querySelector('#categoriasMenu')

	if (!container) return

	container.innerHTML = renderCategories(categories)
}
