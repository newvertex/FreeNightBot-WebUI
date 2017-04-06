/* eslint-disable */
import React from 'react';
import { Message, Icon, List } from 'semantic-ui-react';

const list = [
  '${movie.Title} : The movie title',
  '${movie.Year} : Production date',
  '${movie.imdbID} : Movie id on Imdb',
  '${movie.Director} : Movie director',
  '${movie.Actors} : Movie actors',
  '${movie.Released} : Movie release date',
  '${movie.Country} : Which country is made',
  '${movie.Genre} : The genre of the movie',
  '${movie.Awards} : Awards for the movie',
  '${movie.imdbRating} : Movie rate on Imdb',
  '${movie.imdbVotes} : Movie votes on Imdb',
  '${movie.Plot} : Short summary about the movie',
];

export default function () {
  return (
    <Message info>
      <Icon name="help" />
      <strong>Templates helper placeholders</strong>

      <p>
        If you want to fill your template with imdb movie informations,<br />
        you can use following placeholders on any place of the text
        then placeholders will be replaced with actual movie info.
      </p>

      <List items={list} bulleted />
    </Message>
  );
}
