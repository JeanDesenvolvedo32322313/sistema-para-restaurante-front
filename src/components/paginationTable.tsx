import Pagination from "react-js-pagination";

export const PaginationTable = ({ dadosPagination, functionPagination }: any) => {
    return (
        <div>
            <Pagination
                activePage={dadosPagination?.current_page ? dadosPagination?.current_page : 0}
                itemsCountPerPage={dadosPagination?.per_page ? dadosPagination?.per_page : 0}
                totalItemsCount={dadosPagination?.total ? dadosPagination?.total : 0}
                onChange={(pageNumber) => {
                    functionPagination(pageNumber)
                }}
                pageRangeDisplayed={8}
                itemClass="page-item"
                linkClass="page-link"
                firstPageText="Primeira"
                lastPageText="Última"
            />
        </div>
    )
}