export type Categoria = {
	id: number
	nome: string
}

export type Produto = {
	id: number
	categoria_id: number
	nome: string
	descricao: string | null
	preco: number
	imagem_url: string | null
}

export type MenuCategoria = {
	id: number
	nome: string
	produtos: Produto[]
}
