import {FirebaseStorageClientImpl} from "./firebase-storage-client-impl";

describe('FirebaseStorageClient', function () {
  let subject;

  beforeEach(function () {
    subject = new FirebaseStorageClientImpl();
  });

  describe('getDownloadUrlForStem', () => {
    it('should return the download url for a stem belonging to a song with the given id', async () => {
      const stemUrl = await subject.getDownloadUrlForStem('ZYXyQ196YfY6pP2V6uTC', 'Dance Vocal.mp3');

      expect(stemUrl).toEqual('');
    })
  });
});