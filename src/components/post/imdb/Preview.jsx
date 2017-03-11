import React from 'react';
import { Segment } from 'semantic-ui-react';

function ImdbPreview({ movie }) {
  return (
    <Segment className="field imdb-preview">
      <h3>
        {movie.Title} <small>({movie.Year}) - {movie.imdbID}</small>
      </h3>
      <div>
        <strong>Director: </strong>
        <span>{movie.Director}</span>
      </div>
      <div>
        <strong>Actors: </strong>
        <span>{movie.Actors}</span>
      </div>
      <div>
        <strong>Released: </strong>
        <span>{movie.Released}</span>
      </div>
      <div>
        <strong>Country: </strong>
        <span>{movie.Country}</span>
      </div>
      <div>
        <strong>Genre: </strong>
        <span>{movie.Genre}</span>
      </div>
      <div>
        <strong>Awards: </strong>
        <span>{movie.Awards}</span>
      </div>
      <div>
        <strong>imdbRating: </strong>
        <span>{movie.imdbRating}</span>
      </div>
      <div>
        <strong>imdbVotes: </strong>
        <span>{movie.imdbVotes}</span>
      </div>
      <div>
        <strong>Summary: </strong>
        <span>{movie.Plot}</span>
      </div>
    </Segment>
  );
}

export default ImdbPreview;
