export type Product = {
	id: number
	name: string
	description: string
	priceText: string
	imageUrl: string
	addonsCount?: number
	opcionais?: Opcional[]
}

export type Category = {
	id: string
	iconClass: string
	title: string
	products: Product[]
}

export type OpcionalItem = {
	id: number
	name: string
	price: number
}

export type Opcional = {
	id: number
	name: string
	required: boolean
	min: number
	max: number
	items: OpcionalItem[]
}
