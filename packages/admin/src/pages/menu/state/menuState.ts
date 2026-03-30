import type { Category, Opcional } from '../types'

export const menuState = {
	categories: [] as Category[],

	selectedCategoryId: null as number | null,

	selectedProductId: null as number | null,

	uploadedImageUrl: '',

	currentImageUrl: null as string | null,

	opcionais: [] as Opcional[],
}
