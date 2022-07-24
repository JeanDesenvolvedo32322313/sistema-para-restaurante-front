
export const SearchConfirm = ({ valueSeach, setSearch, ReadDados }: any) => {
    return (
        <div className="container-xl px-4 mt-4">
            <div className="row">
                <div className="col-md-8">
                </div>
                <div className="col-md-4">
                    <div className="input-group mb-3 ">
                        <input name="search" value={valueSeach} onChange={(e) => setSearch(e.target.value)} type="text" className="form-control" placeholder="Pesquisar..." />
                        <button className="btn btn-primary" onClick={() => { ReadDados() }}>Pesquisar</button>
                    </div>
                </div>
            </div>
        </div>
    )
}