import admin from 'firebase-admin';
import { credential, databaseURL } from './credentials';

const firebaseConfig = {
	credential: admin.credential.cert(credential),
	databaseURL: databaseURL
};

admin.initializeApp(firebaseConfig);
const database = admin.database();

export { admin, database };
