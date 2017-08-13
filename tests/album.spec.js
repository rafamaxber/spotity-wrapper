
import chai, {
  expect,
} from 'chai';

import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import sinonStubPromise from 'sinon-stub-promise';
import {
  getAlbum,
  getAlbuns,
} from '../src/album';

sinonStubPromise(sinon);
chai.use(sinonChai);
global.fetch = require('node-fetch');

describe('Album', () => {
  let fetchedStub;
  let promise;

  beforeEach(() => {
    fetchedStub = sinon.stub(global, 'fetch');
    promise = fetchedStub.returnsPromise();
  });

  afterEach(() => {
    fetchedStub.restore();
  });

  describe('Smoke tests', () => {
    it('Should getAlbum exists', () => expect(getAlbum).to.be.exists);
  });

  describe('getAlbum', () => {
    it('Should call fetch function', () => {
      const album = getAlbum();
      expect(fetchedStub).to.have.been.calledOnce;
    });
    it('Should receive the correct url', () => {
      context('Passing one album', () => {
        const album = getAlbum('4aawyAB9vmqN3uQ7FjRGTy');
        expect(fetchedStub).to.have.been
          .calledWith('https://api.spotify.com/v1/albums/4aawyAB9vmqN3uQ7FjRGTy');

        const album2 = getAlbum('4aawyAB9vmqN3uQ7FjRGTk');
        expect(fetchedStub).to.have.been
          .calledWith('https://api.spotify.com/v1/albums/4aawyAB9vmqN3uQ7FjRGTk');
      });
    });
    it('Should return a JSON in promise', () => {
      promise.resolves({ body: 'json' });
      const album = getAlbum('4aawyAB9vmqN3uQ7FjRGTy');
      expect(album.resolveValue).to.be.eql({ body: 'json' });
    });
  });

  describe('getAlbuns', () => {
    it('Should call fetch function', () => {
      const albuns = getAlbuns();
      expect(fetchedStub).to.have.been.calledOnce;
    });
    it('Should receive the correct url', () => {
      context('Passing three id albuns', () => {
        const albuns = getAlbuns(['382ObEPsp2rxGrnsizN5TX', '1A2GTWGtFfWp7KSQTwWOyo', '2noRn2Aes5aoNVsU6iWThc']);
        expect(fetchedStub).to.have.been
          .calledWith('https://api.spotify.com/v1/albums?ids=382ObEPsp2rxGrnsizN5TX,1A2GTWGtFfWp7KSQTwWOyo,2noRn2Aes5aoNVsU6iWThc');
      });
    });
    it('Should return a JSON in promise', () => {
      promise.resolves({ body: 'json' });
      const albuns = getAlbuns(['382ObEPsp2rxGrnsizN5TX', '1A2GTWGtFfWp7KSQTwWOyo', '2noRn2Aes5aoNVsU6iWThc']);
      expect(albuns.resolveValue).to.be.eql({ body: 'json' });
    });
  });
});
