export function mount(selector: string, el: Element) {
	const target = document.querySelector(selector)
	if (!target) throw new Error(`Mount target não encontrado: ${selector}`)
	target.replaceWith(el)
}
