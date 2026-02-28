import './style.css'

export function Header(): HTMLElement {
	const header = document.createElement('header')
	header.className = 'width-fix mt-5'

	header.innerHTML = `
    <div class="card">
      <div class="d-flex">
        <div class="container-img"></div>

        <div class="infos">
          <h1><b>Pizzaria Maluca</b></h1>

          <div class="infos-sub">
            <p class="status-open">
              <i class="fa fa-clock"></i> Aberta
            </p>

            <a href="/sobre.html" class="link">
              ver mais
            </a>
          </div>
        </div>
      </div>
    </div>
  `

	return header
}
