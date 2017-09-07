'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getAlbuns = exports.getAlbum = undefined;

var _config = require('./config');

function getAlbum(id) {
  return fetch(_config.API_URL + 'albums/' + id).then(function (data) {
    return data.json();
  });
}

function getAlbuns() {
  var ids = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

  return fetch(_config.API_URL + 'albums?ids=' + ids.join(',')).then(function (data) {
    return data.json();
  });
}

exports.getAlbum = getAlbum;
exports.getAlbuns = getAlbuns;