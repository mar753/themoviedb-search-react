import React, { Component } from 'react';
import config from '../config.json';

const imageBorder = {
  border: 'solid 1px #999999',
  width: '185px',
  height: '278px'
};

class SearchItem extends Component {
  render() {
    const movie = this.props.movie;
    const moviePoster = this.renderMoviePoster(movie);
    const movieReleaseDate = this.renderMovieReleaseDate(movie);
    const movieVoteAverage = this.renderMovieVoteAverage(movie);
    const movieOverview = this.renderMovieOverview(movie);
    return (
      <div className="row padding-top-bottom-2">
        <div className="col-sm-4 col-md-3 col-md-offset-3 align-middle">
          {moviePoster}
        </div>
        <div className="col-sm-4 col-md-3">
          <h2 className="font-bold">{movie.title}
            {movieReleaseDate}
          </h2>
          {movieVoteAverage}
          {movieOverview}
        </div>
      </div>
    );
  }

  renderMoviePoster(movie) {
    const imageBaseUrl = config['image-url'];
    return (
        movie.poster_path ?
          <img src={imageBaseUrl + movie.poster_path} alt="Poster" /> :
          <div style={imageBorder}></div>
    );
  }

  renderMovieReleaseDate(movie) {
    return (
        !!movie.release_date &&
          <span> ({movie.release_date.substr(0, 4)})</span>
    );
  }

  renderMovieVoteAverage(movie) {
    return (
      !!movie.vote_average &&
        <h4>Rate {movie.vote_average}/10</h4>
    );
  }

  renderMovieOverview(movie) {
    return (
      !!movie.overview && (
        movie.overview.length < 300 ?
          <h5>{movie.overview}</h5> :
          <h5>{movie.overview.substr(0, 300)}...</h5>)
    );
  }
}

export default SearchItem;
