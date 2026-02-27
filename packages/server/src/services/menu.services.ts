import type { MenuItem } from '../types/menu.js'

const menu: MenuItem[] = [
	{
		id: 1,
		name: 'Pizza Calabresa',
		description: 'Calabresa, cebola e queijo',
		price: 45,
	},
	{
		id: 2,
		name: 'Pizza Frango c/ Catupiry',
		description: 'Frango desfiado e catupiry',
		price: 49,
	},
]

export function listMenu(): MenuItem[] {
	return menu
}

export function getMenuItemById(id: number): MenuItem | undefined {
	return menu.find((m) => m.id === id)
}
