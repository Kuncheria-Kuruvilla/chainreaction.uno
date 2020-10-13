import * as firebase from 'firebase';

import { FirebaseConfig } from '../config/keys';

firebase.initializeApp(FirebaseConfig);

export const accesscodeMapRef = firebase.database().ref('/accesscodeMap');
export const playgroundsRef = firebase.database().ref('/playgrounds');
