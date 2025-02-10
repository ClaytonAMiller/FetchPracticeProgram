import React from "react";

const Pagination = ({
  currentPage,
  totalPages,
  handlePreviousPage,
  handleNextPage,
  goToLastPage,
}) => {
  return (
    <div style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}>
      <button onClick={handlePreviousPage} disabled={currentPage === 1}>
        Previous
      </button>
      <p style={{ margin: "0 10px" }}>
        Page {currentPage} of {totalPages}
      </p>
      <button onClick={handleNextPage} disabled={currentPage === totalPages}>
        Next
      </button>
    </div>
  );
};

export default Pagination;