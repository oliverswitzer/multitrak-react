import {FirebaseDatabaseClientImpl} from "./firebase-database-client-impl";

describe('FirebaseDatabaseClient', function () {
  let subject;

  beforeEach(function () {
    subject = new FirebaseDatabaseClientImpl();
  });

  describe('findBySlug', function () {
    it('return the song data for the given slug', () => {
      const songData = subject.findBySlug('say-it');

      expect(songData).toEqual({});
    })
  });
});