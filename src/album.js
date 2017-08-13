function getAlbum(id) {
  return fetch(`https://api.spotify.com/v1/albums/${id}`)
    .then(data => data.json());
}

function getAlbuns(ids = []) {
  return fetch(`https://api.spotify.com/v1/albums?ids=${ids.join(',')}`)
    .then(data => data.json());
}

export {
  getAlbum,
  getAlbuns,
};
