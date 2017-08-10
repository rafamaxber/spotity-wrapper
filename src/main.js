function search(query, type) {
  return fetch(`https://api.spotify.com/v1/search?q=${query}&type=${type}`)
  .then(data => data.json());
}
function searchArtist(query) {
  return search(query, 'artist')
}
function searchAlbum(query) {
  return search(query, 'album')
}
function searchPlaylist(query) {
  return search(query, 'playlist')
}
function searchTrack(query) {
  return search(query, 'track')
}

export {
  search, searchAlbum, searchArtist, searchPlaylist, searchTrack,
};
