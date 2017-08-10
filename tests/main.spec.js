import chai, {
  expect,
} from 'chai';

import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import sinonStubPromise from 'sinon-stub-promise';
import {
  search,
  searchAlbum,
  searchArtist,
  searchPlaylist,
  searchTrack,
} from '../src/main';

chai.use(sinonChai);
sinonStubPromise(sinon);
global.fetch = require('node-fetch');

describe('Spotify Wrapper', () => {
  let fetchedStub;
  let promise;

  beforeEach(() => {
    fetchedStub = sinon.stub(global, 'fetch');
    promise = fetchedStub.returnsPromise()
  });

  afterEach(() => {
    fetchedStub.restore();
  });

  describe('Smoke tests', () => {
    it('Should exist the search method', () => expect(search).to.exist);
    it('Should exist the searchAlbum method', () => expect(searchAlbum).to.exist);
    it('Should exist the searchArtist method', () => expect(searchArtist).to.exist);

    it('Should exist the searchTrack method', () => {
      expect(searchTrack).to.exist;
    });

    it('Should exist the searchPlaylist method', () => {
      expect(searchPlaylist).to.exist;
    });

  });

  describe('Generic search', () => {
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

    it('Should return the JSON Data from the Promise', () => {
      promise.resolves({ body: 'json' });
      const artist = search('Includes', 'artist');
      expect(artist.resolveValue).to.be.eql({ body: 'json' });
    });
  });

  describe('searchArtist', () => {
    it('Should call fetch function', () => {
      const artist = searchArtist();
      expect(fetchedStub).to.have.been.calledOnce;
    });

    it('Should call fetch with the correct URL', () => {
      const artist = searchArtist('Muse')
      expect(fetchedStub).to.have.been
        .calledWith('https://api.spotify.com/v1/search?q=Muse&type=artist')

      const artist2 = searchArtist('Incubus')
      expect(fetchedStub).to.have.been
        .calledWith('https://api.spotify.com/v1/search?q=Incubus&type=artist')
    });
  });

  describe('searchAlbum', () => {
    it('Should call fetch function', () => {
      const album = searchAlbum();
      expect(fetchedStub).to.have.been.calledOnce;
    });

    it('Should call fetch with the correct URL', () => {
      const album = searchAlbum('Muse')
      expect(fetchedStub).to.have.been
        .calledWith('https://api.spotify.com/v1/search?q=Muse&type=album')

      const album2 = searchAlbum('Incubus&type=album')
    });
  });

  describe('searchPlaylist', () => {
    it('Should call fetch function', () => {
      const playlist = searchPlaylist();
      expect(fetchedStub).to.have.been.calledOnce;
    });

    it('Should call fetch with the correct URL', () => {
      const playlist = searchPlaylist('Muse')
      expect(fetchedStub).to.have.been
        .calledWith('https://api.spotify.com/v1/search?q=Muse&type=playlist')

      const playlist2 = searchPlaylist('Wesley Safadão')
      expect(fetchedStub).to.have.been
        .calledWith('https://api.spotify.com/v1/search?q=Wesley Safadão&type=playlist')
    });
  });

  describe('searchTrack', () => {
    it('Should call fetch function', () => {
      const track = searchTrack();
      expect(fetchedStub).to.have.been.calledOnce;
    });

    it('Should call fetch with the correct URL', () => {
      const track = searchTrack('Muse')
      expect(fetchedStub).to.have.been
        .calledWith('https://api.spotify.com/v1/search?q=Muse&type=track')

      const track2 = searchTrack('Incubus')
      expect(fetchedStub).to.have.been
        .calledWith('https://api.spotify.com/v1/search?q=Incubus&type=track')
    });
  });
});