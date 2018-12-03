import firebase from './firebase';

import {FirebaseStorageClient} from "./firebase-storage-client";

export class FirebaseStorageClientImpl extends FirebaseStorageClient {
  constructor() {
    super();

    this.storage = firebase.storage();
  }

  async getDownloadUrlForStem(songId, stemName) {
    const storageRef = this.storage.ref(`songs/${songId}/`);

    const downloadUrlPromise = storageRef.child(stemName).getDownloadURL();

    return await downloadUrlPromise;
  }
}