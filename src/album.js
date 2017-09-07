import { API_URL } from './config';

function getAlbum(id) {
  return fetch(`${API_URL}albums/${id}`)
    .then(data => data.json());
}

function getAlbuns(ids = []) {
  return fetch(`${API_URL}albums?ids=${ids.join(',')}`)
    .then(data => data.json());
}

export {
  getAlbum,
  getAlbuns,
};