import React from 'react';
import PropTypes  from 'prop-types';

const Pagination = (props) => {
  const prevDisabled = props.currentPage === 1,
        nextDisabled = props.currentPage === props.totalPages,
        hasResults = props.totalResults > 0,
        noResults = props.totalResults === 0;

  return (
    <React.Fragment>
      {hasResults &&
      <div className="pagination">
        <button className="pagination__button button" onClick={props.handlePrevPage} disabled={prevDisabled}>
          {props.prev}
        </button>
        <p className="pagination__currentPage">
          {props.currentPage}
        </p>
        <button className="pagination__button button" onClick={props.handleNextPage} disabled={nextDisabled}>
          {props.next}
        </button>
        <p>Total results: {props.totalResults} <span className="search__results--sep">|</span> Current page: {props.currentPage} <span className="search__results--sep">|</span> Total pages: {props.totalPages}</p>
      </div>
      }

      {noResults && <p>There is no results</p>}
    </React.Fragment>
  )
}

Pagination.propTypes = {
  handlePrevPage: PropTypes.func.isRequired,
  handleNextPage: PropTypes.func.isRequired,
  currentPage: PropTypes.number,
  totalPages: PropTypes.number,
  totalResults: PropTypes.number
}

Pagination.defaultProps = {
  prev: 'prev',
  next: 'next'
}

export default Pagination;