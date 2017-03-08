import { IMGUR_CLIENT_ID } from '../../config';

const API = 'https://api.imgur.com/3/upload';
const CLIENT_ID = `Client-ID ${IMGUR_CLIENT_ID}`;

function upload(file) {
  let data = new FormData();
  data.append('image', file);

  return fetch(
    API,
    {
      method: 'POST',
      headers: {
        Authorization: CLIENT_ID,
      },
      body: data,
    }
  );
}

export default upload;
