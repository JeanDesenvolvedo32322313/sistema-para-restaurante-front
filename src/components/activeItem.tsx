export function Active({ value }: any) {
    return (
        <>
            {
                value === "1" ?
                    (
                        <span className="badge bg-light text-success"> Ativo</span>
                    ) : value === "0" ?
                        (
                            <span className="badge bg-light text-danger">Inativo</span>
                        ) : ''
            }
        </>
    )
}
