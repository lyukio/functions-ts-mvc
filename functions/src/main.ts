import * as functions from 'firebase-functions';
import * as admin from "firebase-admin";
// import * as firebase from "firebase";
// require('firebase/auth');

var app = admin.initializeApp(functions.config().firebase);

export const authFb = app.auth();
export const db = admin.firestore();
db.settings({timestampsInSnapshots: true});
export const auth = admin.auth();