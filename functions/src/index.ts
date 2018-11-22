import * as functions from 'firebase-functions';
import {instance as userController} from './controllers/user';

export const helloWorld = functions.https.onRequest((req, res) => {
    userController
});
