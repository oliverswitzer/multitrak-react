import firebase from './firebase';
import {FirebaseDatabaseClient} from "./firebase-database-client";

export class FirebaseDatabaseClientImpl extends FirebaseDatabaseClient {
  constructor() {
    super();

    const db = firebase.firestore();
    const settings = { timestampsInSnapshots: true};
    db.settings(settings);

    this.db = db
  }

  findBySlug() {

  }
}