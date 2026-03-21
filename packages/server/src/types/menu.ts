export type Categoria = {
	id: number
	nome: string
}

export type CreateProductDTO = {
	idcategoria: number
	nome: string
	descricao?: string
	valor: number
	imagem?: string | null
	opcionais?: number[]
}
