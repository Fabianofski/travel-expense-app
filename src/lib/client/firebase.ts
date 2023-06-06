import admin from 'firebase-admin';
import {
	FIREBASE_PRIVATE_KEY,
	FIREBASE_PROJECT_ID,
	FIREBASE_CLIENT_EMAIL,
	FIREBASE_DATABASE_URL
} from '$env/static/private';

const firebaseConfig = {
	credential: admin.credential.cert({
		projectId: FIREBASE_PROJECT_ID,
		privateKey: FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
		clientEmail: FIREBASE_CLIENT_EMAIL
	}),
	databaseURL: FIREBASE_DATABASE_URL
};

admin.initializeApp(firebaseConfig);
const database = admin.database();

export { admin, database };
