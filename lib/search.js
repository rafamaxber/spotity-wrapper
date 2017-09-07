'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.searchTrack = exports.searchPlaylist = exports.searchArtist = exports.searchAlbum = exports.search = undefined;

var _config = require('./config');

var _utils = require('./utils');

function search(query, type) {
  return fetch(_config.API_URL + 'search?q=' + query + '&type=' + type).then(_utils.toJson);
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

exports.search = search;
exports.searchAlbum = searchAlbum;
exports.searchArtist = searchArtist;
exports.searchPlaylist = searchPlaylist;
exports.searchTrack = searchTrack;