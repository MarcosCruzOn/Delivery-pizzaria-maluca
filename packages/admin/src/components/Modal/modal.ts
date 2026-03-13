type ModalProps = {
	id: string
	title: string
	body: string
	footer?: string
	className?: string
}

export function Modal({ id, title, body, footer }: ModalProps) {
	return `
<div class="modal fade" id="${id}">
 <div class="modal-dialog">
  <div class="modal-content card-select">

   <div class="modal-header modal-top d-flex justify-content-between">
    <h5 class="modal-title">${title}</h5>
    <button class=" btn btn-white btn-sm" data-bs-dismiss="modal">
        <i class="fas fa-times"></i> Fechar
    </button>
   </div>

   <div class="modal-body">
    ${body}
   </div>

   ${
		footer
			? `
            <div class="modal-footer">
                ${footer}
            </div>
   `
			: ''
   }

  </div>
 </div>
</div>
`
}
