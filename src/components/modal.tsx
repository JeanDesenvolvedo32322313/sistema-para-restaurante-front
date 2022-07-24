interface IModalComponnet {
    id?: string,
    title?: string,
    children?: any,
    buttonSend?: any,
    buttonClose?: any,
    onClick?: any,
    modalSize?: any,
    modalDialog?: string
}

function ModalDialog({ id, title, children, buttonSend, buttonClose, onClick, modalSize, modalDialog }: IModalComponnet) {

    return (
        <div className="modal fade" id={`${id}`} role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className={`modal-dialog modal-dialog-${modalDialog} modal-${modalSize}`} role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">{title}</h5>
                        <button type="button" className="btn " onClick={() => { (window as any).$(`#${id}`).modal("hide") }} data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        {children}
                    </div>
                    <div className="modal-footer">
                        {
                            buttonClose &&
                            buttonClose[0] &&
                            (<button type="button" className="btn btn-secondary" onClick={() => { (window as any).$(`#${id}`).modal("hide") }}>{buttonClose[1]}</button>)
                        }

                        {
                            buttonSend &&
                            buttonSend[0] &&
                            (<button type="button" onClick={onClick} className="btn btn-primary">{buttonSend[1]}</button>)
                        }

                    </div>
                </div>
            </div>
        </div >
    )
}

export { ModalDialog }