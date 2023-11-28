import React, { useEffect, useState } from "react";
import "./Pagination.css";

export default function MemberPagination({
  currentPage,
  setCurrentPage,
  totalMembers,
  filteredMembers
}) {
  const membersPerPage = 10;
  const totalPages = Math.ceil(filteredMembers.length / membersPerPage);

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [totalPages, currentPage, setCurrentPage]);

  const handlePageChange = (event, page) => {
    setCurrentPage(page);
    localStorage.setItem("currentPage", page);
  };

  const handleFirstPage = () => {
    setCurrentPage(1);
  };

  const handleLastPage = () => {
    setCurrentPage(totalPages);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="pagination-container">
      <div className="pagination">
        <div>
          <button
            className={`pagination-button ${currentPage === 1 ? "active" : ""}`}
            onClick={handleFirstPage}
          >
            First
          </button>
          <button className="pagination-button" onClick={handlePrevPage}>
            Previous
          </button>
          {pageNumbers.map((page) => (
            <button
              key={page}
              className={`pagination-button ${
                currentPage === page ? "active" : ""
              }`}
              onClick={(event) => handlePageChange(event, page)}
            >
              {page}
            </button>
          ))}
          <button className="pagination-button" onClick={handleNextPage}>
            Next
          </button>
          <button
            className={`pagination-button ${
              currentPage === totalPages ? "active" : ""
            }`}
            onClick={handleLastPage}
          >
            Last
          </button>
        </div>
      </div>
    </div>
  );
}
