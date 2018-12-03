import {SongGateway} from "./song-gateway";
import {FirebaseStorageClient} from "./firebase/firebase-storage-client";
import {FirebaseDatabaseClient} from "./firebase/firebase-database-client";

const context = describe;

function buildStemData(partialStem) {
  return {
    name: partialStem.name || 'some stem name',
  };
}

class FirebaseDatabaseClientStub extends FirebaseDatabaseClient {
  constructor() {
    super();
    this._findBySlugStub = null;
  }

  findBySlug() {
    return this._findBySlugStub;
  }

  set findBySlugStub(response) {
    this._findBySlugStub = response;
  }
}

class FirebaseStorageClientFake extends FirebaseStorageClient {
  getDownloadUrlForStem(stem) {
    return `http://somefakestorage.com/${stem.name}`
  }
}

describe('SongGateway', function () {
  let songGateway;
  let firebaseDatabaseClientStub;
  let firebaseStorageClientFake;

  beforeEach(function () {
    firebaseDatabaseClientStub = new FirebaseDatabaseClientStub();
    firebaseStorageClientFake = new FirebaseStorageClientFake();

    songGateway = new SongGateway({
      firebaseDatabaseClient: firebaseDatabaseClientStub,
      firebaseStorageClient: firebaseStorageClientFake
    })
  });

  context('given firestore database has a song with slug foo', () => {
    beforeEach(function () {
      const firestoreSong = {
        id: 'some uuid',
        slug: 'foo',
        stems: [],
        title: 'foo song'
      };

      firebaseDatabaseClientStub.findBySlugStub = [firestoreSong]
    });

    it('returns the song with an id and title', () => {
      const song = songGateway.findBySlug('foo');

      expect(song.id).toEqual('some uuid');
      expect(song.title).toEqual('foo song');
    });

    describe('when no song matches the given slug', function () {
      beforeEach(function () {
        firebaseDatabaseClientStub.findBySlugStub = []
      });

      it('return null', function () {
        expect(songGateway.findBySlug('foo')).toBe(null)
      });
    });


    describe('fetching stems with urls', () => {
      beforeEach(function () {
        const songData = {
          id: 'some uuid',
          slug: 'foo',
          stems: [
            buildStemData({ name: 'stem-1.mp3' }),
            buildStemData({ name: 'stem-2.mp3' }),
            buildStemData({ name: 'stem-3.mp3' })
          ],
          title: 'foo song'
        };

        firebaseDatabaseClientStub.findBySlugStub = [songData]
      });

      it('returns the song with stems', () => {
        const song = songGateway.findBySlug('foo');

        expect(song.stems.length).toEqual(3);
        expect(song.stems[0].src).toEqual('http://somefakestorage.com/stem-1.mp3');
        expect(song.stems[1].src).toEqual('http://somefakestorage.com/stem-2.mp3');
        expect(song.stems[2].src).toEqual('http://somefakestorage.com/stem-3.mp3');
      });
    });
  });
});