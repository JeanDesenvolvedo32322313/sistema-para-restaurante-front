
interface ITableComponent {
    colunas?: any;
    children?: any;
    size?: string;
    textCenter?: boolean
}

export default function TableComponent({ colunas, children, size, textCenter }: ITableComponent) {
    return (
        <div className="table-responsive ">
            <table className={`table table-hover table-${size} text-${textCenter ? 'center' : ''}`}>
                {
                    colunas &&
                    (
                        <thead>
                            <tr>
                                {
                                    colunas.map((c: any, k: any) => (
                                        <th key={k} >
                                            {c}
                                        </th>
                                    ))
                                }
                            </tr>
                        </thead>
                    )
                }
                <tbody>
                    {children}
                </tbody>
            </table>
        </div>
    )
} 