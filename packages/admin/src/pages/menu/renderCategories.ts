import { renderCategory } from './renderCategory'
import type { Category } from './types'

export function renderCategories(categories: Category[]) {
	if (!categories.length) {
		return `
		<div class="card mt-3 p-4 text-center">
		 <p><b>Nenhuma categoria criada ainda</b></p>
		</div>
		`
	}

	return categories.map((cat, idx) => renderCategory(cat, idx === 0)).join('')
}
