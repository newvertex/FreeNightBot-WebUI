import jsonp from 'fetch-jsonp';

const API = 'https://www.omdbapi.com/';

export function search(title) {
  const url = `${API}?s=${title}`;

  return jsonp(url)
    .then((res) => res.json())
    .then((res) => {
      if (res.Error) {
        return null;
      }

      let movies = res.Search.map((movie, index) => (
        {
          key: movie.imdbID,
          id: index,
          title: `${movie.Title} (${movie.Year})`,
          description: movie.imdbID,
          image: movie.Poster,
        }
      ))

      return movies;
    })
    .catch((err) => null);
}

export function get(id) {
  const url = `${API}?i=${id}`;

  return jsonp(url)
    .then((res) => res.json())
    .then((res) => {
      if (res.Error) {
        return null;
      }

      return res;
    })
    .catch((err) => null);
}
