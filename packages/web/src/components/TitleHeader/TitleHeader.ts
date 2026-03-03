import './style.css'

export function TitleHeader({ title }: { title: string }) {
	const header = document.createElement('header')
	header.className = 'width-fix mt-3'

	header.innerHTML = `
        <header class="width-fix mt-3">
            <div class="card">
                <div class="d-flex">
                <a href="#/" class="container-voltar">
                    <i class="fas fa-arrow-left"></i>
                </a>
                <div class="infos text-center">
                    <h1 class="mb-0"><b>${title}</b></h1>
                </div>
                </div>
            </div>
        </header>
    `
	return header
}
