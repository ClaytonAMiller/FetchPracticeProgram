import React from "react";
import "../Styles/styles.css";


const Pagination = ({
  currentPage,
  totalPages,
  handlePreviousPage,
  handleNextPage,
}) => {
  return (
    <div className="pagination-container">
      <button className="pagination-button" onClick={handlePreviousPage} disabled={currentPage === 1}>
        Previous
      </button>
      <p className="pagination-info">
        Page {currentPage} of {totalPages}
      </p>
      <button className="pagination-button" onClick={handleNextPage} disabled={currentPage === totalPages}>
        Next
      </button>
    </div>
  );
};

export default Pagination;