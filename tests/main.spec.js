import chai, { expect } from 'chai';

import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import sinonStubPromise from 'sinon-stub-promise';

chai.use(sinonChai);
sinonStubPromise(sinon);

global.fetch = require('node-fetch');

import { search, searchAlbum, searchArtist, searchPlaylist, searchTrack } from '../src/main.js';

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

    it('Should call fetch function', () => {
      const fetchStub = sinon.stub(global, 'fetch');
      const artists = search();

      expect(fetchStub).to.have.been.calledOnce;
    });

   });

});
