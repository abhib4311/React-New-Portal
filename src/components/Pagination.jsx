import React from 'react';

const Pagination = ({ currentPage, totalPages, handlePageChange }) => {
    const prePage = () => {
        if (currentPage > 1) {
            handlePageChange(currentPage - 1);
        }
    };

    const nextPage = () => {
        if (currentPage < totalPages) {
            handlePageChange(currentPage + 1);
        }
    };

    const handlePageClick = (page) => {
        handlePageChange(page);
    };

    const numbers = Array.from({ length: totalPages }, (_, i) => i + 1);

    return (
        <nav className="flex justify-center mt-4">
            <ul className='pagination flex space-x-2'>
                <li className='page-item'>
                    <button
                        className='page-link bg-gray-700 text-white px-4 py-2 rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-800'
                        onClick={prePage}
                        disabled={currentPage === 1}
                    >
                        Prev
                    </button>
                </li>
                {
                    numbers.map((n) => (
                        <li
                            className={`page-item ${currentPage === n ? 'active' : ''}`}
                            key={n}
                        >
                            <button
                                className={`page-link px-4 py-2 rounded ${currentPage === n ? 'bg-gray-900 text-white' : 'bg-gray-700 text-white hover:bg-gray-800'}`}
                                onClick={() => handlePageClick(n)}
                            >
                                {n}
                            </button>
                        </li>
                    ))
                }
                <li className='page-item'>
                    <button
                        className='page-link bg-gray-700 text-white px-4 py-2 rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-800'
                        onClick={nextPage}
                        disabled={currentPage === totalPages}
                    >
                        Next
                    </button>
                </li>
            </ul>
        </nav>
    );
};

export default Pagination;
