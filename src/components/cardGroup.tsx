
interface ICardGroup {
    itens?: any;
    size: string;
    attr?: any
}


export default function CardGroup({ itens, size, attr }: ICardGroup) {
    return (
        <div className={attr === 0 ? '' : 'container-xl px-4 mt-n10'}>
            <div className="row">

                {
                    itens &&
                    (
                        itens.map((I: any, k: any) => (
                            <div style={{ cursor: 'pointer' }} onClick={() => { I.functionFilter(I.id) }} key={k} className={`col-xl-${size} mb-4`}>
                                <div className="card lift h-100" >

                                    <div className="card-body d-flex justify-content-center flex-column">
                                        <div className="d-flex align-items-center justify-content-between">
                                            <div className="me-3">
                                                <i className="feather-xl text-primary mb-3" data-feather="package"></i>
                                                {
                                                    I.Icon &&
                                                    (<I.Icon style={{ fontSize: 30, marginBottom: 20, color: '#6900c7' }} />)
                                                }

                                                <h5>{I.title}</h5>
                                                <div className=" small">{I.value}</div>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    )
                }


            </div>
        </div>
    )
}