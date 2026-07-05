import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { formatDate, formatProfit } from "../utils/format";

const ROWS_PER_PAGE = 10;

function ReferralsTable({ referrals, search, onSearchChange, sort, onSortChange }) {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  useEffect(function () {
    setCurrentPage(1);
  }, [referrals]);

  const totalRows = referrals.length;
  const totalPages = Math.max(1, Math.ceil(totalRows / ROWS_PER_PAGE));

  let page = currentPage;
  if (page > totalPages) {
    page = totalPages;
  }

  const startIndex = (page - 1) * ROWS_PER_PAGE;
  const endIndex = startIndex + ROWS_PER_PAGE;
  const rowsForThisPage = referrals.slice(startIndex, endIndex);

  const showingFrom = totalRows === 0 ? 0 : startIndex + 1;
  const showingTo = Math.min(endIndex, totalRows);

  function goToReferral(id) {
    navigate("/referral/" + id);
  }

  function handlePreviousClick() {
    if (page > 1) {
      setCurrentPage(page - 1);
    }
  }

  function handleNextClick() {
    if (page < totalPages) {
      setCurrentPage(page + 1);
    }
  }

  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <section className="section">
      <div className="table-toolbar">
        <h2 className="section-title">All referrals</h2>

        <div className="toolbar-controls">
          <input
            type="search"
            className="search-input"
            placeholder="Name or service…"
            aria-label="Search referrals"
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
          />

          <label className="sort-label">
            Sort by date
            <select className="sort-select" value={sort} onChange={(e) => onSortChange(e.target.value)}>
              <option value="desc">Newest first</option>
              <option value="asc">Oldest first</option>
            </select>
          </label>
        </div>
      </div>

      <div className="table-wrapper">
        <table className="referrals-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Service</th>
              <th>Date</th>
              <th className="profit-col">Profit</th>
            </tr>
          </thead>
          <tbody>
            {rowsForThisPage.length === 0 ? (
              <tr className="empty-row">
                <td colSpan="4">No matching entries</td>
              </tr>
            ) : (
              rowsForThisPage.map(function (row) {
                return (
                  <tr key={row.id} className="referral-row" onClick={() => goToReferral(row.id)}>
                    <td>{row.name}</td>
                    <td>{row.serviceName}</td>
                    <td className="date-col">{formatDate(row.date)}</td>
                    <td className="profit-col">{formatProfit(row.profit)}</td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      <div className="table-footer">
        <p className="entries-text">
          Showing {showingFrom}–{showingTo} of {totalRows} entries
        </p>

        <div className="pagination">
          <button type="button" className="page-button" onClick={handlePreviousClick} disabled={page === 1}>
            Previous
          </button>

          {totalPages > 1 &&
            pageNumbers.map(function (num) {
              return (
                <button
                  key={num}
                  type="button"
                  className={num === page ? "page-button active" : "page-button"}
                  onClick={() => setCurrentPage(num)}
                >
                  {num}
                </button>
              );
            })}

          <button type="button" className="page-button" onClick={handleNextClick} disabled={page === totalPages}>
            Next
          </button>
        </div>
      </div>
    </section>
  );
}

export default ReferralsTable;
