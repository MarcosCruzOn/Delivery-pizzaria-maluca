// Define o formato do item que vai pro carrinho
export type CartItem = {
	idproduto: number
	nome: string
	quantidade: number
	precoUnitario: number
	precoTotal: number
	observacao: string
	opcionais: { nome: string; valor: number }[]
}

// Pega o carrinho atual ou cria um vazio
export function getCart() {
	const cart = localStorage.getItem('maluca_cart')
	return cart ? JSON.parse(cart) : { itens: [], total: 0 }
}

// Adiciona um item novo e atualiza o total
export function addToCart(item: CartItem) {
	const cart = getCart()
	cart.itens.push(item)
	cart.total += item.precoTotal
	localStorage.setItem('maluca_cart', JSON.stringify(cart))
}

// Limpa o carrinho (usaremos depois de finalizar o pedido)
export function clearCart() {
	localStorage.removeItem('maluca_cart')
}
