import React from 'react';
import Movie from './Movie';
import SearchBox from './SearchBox';
import Pagination from './Pagination';
import Notification from './Notification';
import Failed from './Failed';

import { ThreeBounce } from 'better-react-spinkit'
import ScrollToTop from 'react-scroll-up';

import { connect } from 'react-redux';
import { fetchSearchLoading } from '../redux/actions/movies';
import { settings } from '../services/ApiSettings';

class SagaSearch extends React.Component {
  state = {
    queryText: '',
    page: 1,
    collection: [],
  }

  handleSearchInput = (e) => {
    this.setState({
      queryText: e.target.value
    })
  }

  handleSearchSubmit = (e) => {
    e.preventDefault();
    const {queryText} = this.state;

    if (queryText !== '') {
      this.props.fetchSearchLoading(queryText);
    }
  }

  handleMovieId = (movieId) => () => {
    this.props.getSingleMovieFetch(movieId);
  }

  componentDidUpdate(prevProps) {
    const exist = this.state.collection.find(x => x.id === this.props.movie.id) != undefined;
    // Typical usage (don't forget to compare props):
    if (this.props.movie.id !== prevProps.movie.id && !exist) {
      this.setState((prevState) => {
        return {
          collection: [ ...prevState.collection, this.props.movie ]
        }
      })
    }
  }

  render() {
    const results = this.props.items;
    const { collection } = this.state;
    const {totalResults, currentPage, totalPages, isLoading, isFailed} = this.props;

    //console.log('state collection', collection.map((movie) => movie.id));

    return (
      <React.Fragment>
        <SearchBox
          handleSearchInput={this.handleSearchInput}
          handleSearchSubmit={this.handleSearchSubmit}
        />

        {this.state.queryText !== '' ?
          <React.Fragment>
            <Notification
            currentPage={currentPage}
            totalPages={totalPages}
            totalResults={totalResults}
            />

            <Pagination
              fetchSearch={this.props.fetchSearchLoading}
              query={this.state.queryText}
              currentPage={currentPage}
              totalPages={totalPages}
              totalResults={totalResults}
            />

            {isFailed && <Failed isError={isFailed} />}

            {isLoading ?
            <ThreeBounce className="spinner" size={50} color="#01d277" /> :
            <div className="movies">
              {results.map((movie) => (
                <Movie
                  key={movie.id}
                  movieId={movie.id}
                  movieTitle={movie.title}
                  moviePoster={movie.poster_path ? `${settings.baseImageUrl}${settings.imageSize}${movie.poster_path}`: undefined}
                  movieLink={`/movie/${movie.id}`}
                  handleMovieId={this.handleMovieId(movie.id)}
                  moreDetails={true}
                  details={collection}
                />
              ))}
            </div>
            }

            <Pagination
              fetchSearch={this.props.fetchSearch}
              query={this.state.queryText}
              currentPage={currentPage}
              totalPages={totalPages}
              totalResults={totalResults}
            />
          </React.Fragment>:
          ''
        }

        <ScrollToTop showUnder={160} style={{right: 200}}>
          <i className="scroll-up"></i>
        </ScrollToTop>
      </React.Fragment>
    )
  }
}

const mapStateToProps = (state) => {
  const { items, totalResults, totalPages, currentPage, isLoading, isFailed } = state.search;
  return { items, totalResults, totalPages, currentPage, isLoading, isFailed, movie: state.movie.item }
}

const mapDispatchToProps = {
  fetchSearchLoading,
};

export default connect(mapStateToProps, mapDispatchToProps)(SagaSearch);
