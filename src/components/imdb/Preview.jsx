import React from 'react';

function ImdbPreview({ movie }) {
  return (
    <div className="field">
      {/* // TODO: use semantic ui to display informations more pretty */}
      {movie.Title} ({movie.Year})
      {movie.Type} - {movie.imdbID}
      Actors: {movie.Actors}
      Director: {movie.Director}
      Writer: {movie.Writer}
      Genre: {movie.Genre}
      Country: {movie.Country}
      Language: {movie.Language}
      Awards: {movie.Awards}
      Rated: {movie.Rated}
      imdbRating: {movie.imdbRating}
      imdbVotes: {movie.imdbVotes}
      Released: {movie.Released}
      Runtime: {movie.Runtime}
      Plot: {movie.Plot}

    </div>
  );
}

export default ImdbPreview;
