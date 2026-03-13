import { handleAddProduct } from './product/addProduct'
import { handleDeleteProduct } from './product/deleteProduct'
import { handleEditProduct } from './product/editProduct'

import { handleAddCategory } from './category/addCategory'
import { handleDeleteCategory } from './category/deleteCategory'

import { setupUploadEvents } from './product/uploadEvents'
import { setupProductSubmit } from './product/productSubmit'

export function setupMenuEvents(root: HTMLElement) {
	root.addEventListener('click', async (event) => {
		const target = event.target as HTMLElement

		const addProductBtn = target.closest("[data-action='add-product']")
		const deleteProductBtn = target.closest('.delete-product')
		const editProductBtn = target.closest('.edit-product')

		const addCategoryBtn = target.closest('#btnAddCategory')
		const deleteCategoryBtn = target.closest('.delete-category')

		if (addCategoryBtn) {
			event.preventDefault()
			handleAddCategory()
		}

		if (deleteCategoryBtn) {
			event.preventDefault()
			await handleDeleteCategory(deleteCategoryBtn as HTMLElement)
		}

		if (addProductBtn) {
			event.preventDefault()
			handleAddProduct(addProductBtn as HTMLElement)
		}

		if (deleteProductBtn) {
			event.preventDefault()
			await handleDeleteProduct(deleteProductBtn as HTMLElement)
		}

		if (editProductBtn) {
			event.preventDefault()
			handleEditProduct(editProductBtn as HTMLElement)
		}
	})

	// eventos separados
	setupUploadEvents(root)
	setupProductSubmit(root)
}
