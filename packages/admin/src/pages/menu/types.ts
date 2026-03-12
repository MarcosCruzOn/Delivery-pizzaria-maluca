export type Product = {
	id: number
	name: string
	description: string
	priceText: string
	imageUrl: string
	addonsCount?: number
}

export type Category = {
	id: string
	iconClass: string
	title: string
	products: Product[]
}
