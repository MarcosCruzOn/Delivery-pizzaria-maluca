export function EmptyState(text: string): HTMLElement {
	const div = document.createElement('div')
	div.className = 'empty-state'

	div.innerHTML = `
    <p><b>${text}</b></p>
    <p>
      Vá até o <b>painel administrativo</b> para configurar.
    </p>
  `

	return div
}
