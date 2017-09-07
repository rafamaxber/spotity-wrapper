import API_URL from './config';
import { toJson } from './utils';

function search(query, type) {
  return fetch(`${API_URL}search?q=${query}&type=${type}`)
    .then(toJson);
}
function searchArtist(query) {
  return search(query, 'artist');
}
function searchAlbum(query) {
  return search(query, 'album');
}
function searchPlaylist(query) {
  return search(query, 'playlist');
}
function searchTrack(query) {
  return search(query, 'track');
}

export {
  search, searchAlbum, searchArtist, searchPlaylist, searchTrack,
};
