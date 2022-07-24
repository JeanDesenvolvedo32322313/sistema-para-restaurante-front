interface ICardComponent {
    att?: string
    children?: any
    title?: string
    onClick?: any
    buttonTitle?: string
    IconButton?: any
    containerCard?: any

}

export default function CardComponent({ att, children, title, onClick, buttonTitle, IconButton, containerCard }: ICardComponent) {
    return (
        <div className={containerCard === 0 ? '' : `container-xl card-header-actions  px-4 ${att === 'top' ? 'mt-n10' : ''}`}>
            <div className="card mb-4">
                <div className="card-header">{title}
                    {
                        buttonTitle &&
                        (<button className="btn btn-sm btn-primary" onClick={onClick} type="button">{
                            IconButton &&
                            (<IconButton style={{ marginRight: 5 }} />)
                        }{buttonTitle}</button>)
                    }
                </div>
                <div className="card-body">
                    {children}
                </div>
            </div>
        </div>
    )
}