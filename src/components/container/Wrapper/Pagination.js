import React, { useEffect, useState } from 'react';
import './Pagination.scss';
import { TfiAngleDoubleLeft, TfiAngleDoubleRight } from 'react-icons/tfi'

const Pagination = ({ currentPage, postsPerPage, totalPosts, paginate }) => {
    const [isMobileView, setIsMobileView] = useState(window.innerWidth < 600);

    useEffect(() => {
        const handleMobileView = () => {
            setIsMobileView(window.innerWidth < 600);
        };
        window.addEventListener('resize', handleMobileView);
        return () => {
            window.removeEventListener('resize', handleMobileView);
        };
    })

    const pageNumbers = Math.ceil(totalPosts / postsPerPage);

    const handlePageChange = (pageNumber) => {
        if (pageNumber < 1) {
            paginate(pageNumbers);
        } else if (pageNumber > pageNumbers) {
            paginate(1);
        } else {
            paginate(pageNumber);
        }
    };

    return (
        <div className='paginate'>
            <div className="page-item"
                onClick={() => handlePageChange(currentPage - 1)}
            >
                <TfiAngleDoubleLeft /> <span>Previous</span>
            </div>
            <div className="page-text">

                {isMobileView ? <span className="page-number">
                    Page {currentPage} of {pageNumbers}
                </span> : <span className="page-number">
                    You are on page {currentPage}
                </span>}
            </div>
            <div className="page-item"
                onClick={() => handlePageChange(currentPage + 1)}
            >
                <span>Next</span> <TfiAngleDoubleRight />
            </div>
        </div>
    );
};

export default Pagination;
