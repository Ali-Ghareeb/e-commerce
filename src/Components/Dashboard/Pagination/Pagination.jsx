import ReactPaginate from 'react-paginate';
import "./pagination.css";

export default function PaginatedItems({ itemsPerPage, total, setPage }) {
    const pageCount = total / itemsPerPage;

    return (
        <>
            <ReactPaginate
                breakLabel="..."
                nextLabel=" >>"
                onPageChange={(e) => setPage(e.selected + 1)}
                pageRangeDisplayed={2}
                pageCount={pageCount}
                previousLabel="<< "
                renderOnZeroPageCount={null}
                containerClassName='custom-pagination'
                pageLinkClassName='pagination-tag-anchor mx-2 text-secondry rounded-circle'
                activeLinkClassName='bg-primary text-white'
            />
        </>
    );
}