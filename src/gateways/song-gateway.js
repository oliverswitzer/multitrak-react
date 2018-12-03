import {FirebaseDatabaseClientImpl} from "./firebase/firebase-database-client-impl";
import {FirebaseStorageClientImpl} from "./firebase/firebase-storage-client-impl";

export class SongGateway {
  constructor({
    firebaseDatabaseClient = new FirebaseDatabaseClientImpl(),
    firebaseStorageClient = new FirebaseStorageClientImpl(),
  }) {
    this.firebaseDatabaseClient = firebaseDatabaseClient;
    this.firebaseStorageClient = firebaseStorageClient;
  }

  findBySlug = (slug) => {
    const songDatas = this.firebaseDatabaseClient.findBySlug(slug);

    if (songDatas.length === 0)
      return null;

    return this._toSong(songDatas[0]);
  };

  _toSong = (songData) => {
    return {
      id: songData.id,
      title: songData.title,
      stems: songData.stems.map((stemData) => {
        return {
          name: stemData.name,
          src: this.firebaseStorageClient.getDownloadUrlForStem(songData.id, stemData.name)
        }
      })
    };
  }
}