function search(query, type) {
  return fetch(`https://api.spotify.com/v1/search?q=${query}&type=${type}`);
}
function searchAlbum() {

}
function searchArtist() {

}
function searchPlaylist() {

}
function searchTrack() {

}

export {
  search, searchAlbum, searchArtist, searchPlaylist, searchTrack,
};
