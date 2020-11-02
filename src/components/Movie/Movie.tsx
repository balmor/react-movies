import React from 'react';
import { Link } from 'react-router-dom';
import tmdbSquare from '../../images/tmdb-square.svg';
import settings from '../../api/config';

type MovieProps = {
  movieId: number;
  movieTitle: string;
  moviePoster: string;
  movieLink: string;
  moreDetails?: boolean;
  handleMovieId?: () => void;
};

export const Movie: React.FC<MovieProps> = ({
  movieId,
  movieTitle,
  moviePoster,
  movieLink,
  moreDetails,
  handleMovieId,
}) => {
  const tmdbPoster: string | undefined = moviePoster
    ? `${settings.api.baseImageUrl}${settings.api.imageSize}${moviePoster}`
    : tmdbSquare;

  const ButtonDetail = (): JSX.Element => {
    return (
      <button className="button icon-magnifier icons" onClick={handleMovieId} type="button">
        detail
      </button>
    );
  };

  return (
    <div className="movies__box" key={movieId}>
      <Link to={movieLink}>
        <img className="movies__poster" src={tmdbPoster} alt={movieTitle} />
      </Link>
      <div className={`movies__detail ${moreDetails && 'movies__detail--top'}`}>
        <h2 className="movies__title movies__title--top">{movieTitle}</h2>
      </div>
      <Link className="button" to={movieLink}>
        view
      </Link>

      {moreDetails && <ButtonDetail />}
    </div>
  );
};
