import chai, {
  expect
} from 'chai';

import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import sinonStubPromise from 'sinon-stub-promise';

chai.use(sinonChai);
sinonStubPromise(sinon);

global.fetch = require('node-fetch');

import {
  search,
  searchAlbum,
  searchArtist,
  searchPlaylist,
  searchTrack
} from '../src/main.js';

describe('Spotify Wrapper', () => {

  describe('Smoke tests', () => {

    it('Should exist the search method', () => {
      expect(search).to.exist;
    });

    it('Should exist the searchAlbum method', () => {
      expect(searchAlbum).to.exist;
    });

    it('Should exist the searchArtist method', () => {
      expect(searchArtist).to.exist;
    });

    it('Should exist the searchTrack method', () => {
      expect(searchTrack).to.exist;
    });

    it('Should exist the searchPlaylist method', () => {
      expect(searchPlaylist).to.exist;
    });

  });

  describe('Generic search', () => {
    let fetchedStub;

    beforeEach(() => {
      fetchedStub = sinon.stub(global, 'fetch');
    });

    afterEach(() => {
      fetchedStub.restore();
    });

    it('Should call fetch function', () => {
      const artist = search();
      expect(fetchedStub).to.have.been.calledOnce;
    });

    it('Should receive the correct url to fetch', () => {

      context('Passing one type', () => {
        const artist = search('Incubus', 'artist');

        expect(fetchedStub).to.have.been
          .calledWith('https://api.spotify.com/v1/search?q=Incubus&type=artist');

        const album = search('Incubus', 'album');

        expect(fetchedStub).to.have.been
          .calledWith('https://api.spotify.com/v1/search?q=Incubus&type=album');

      });

      context('Passing more than one type', () => {
        const artistAlbuns = search('Incubus', ['artist', 'album']);

        expect(fetchedStub).to.have.been
          .calledWith('https://api.spotify.com/v1/search?q=Incubus&type=artist,album');
      });


    });


  });

});

