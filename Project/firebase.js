import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
	apiKey: 'AIzaSyBxN_mGpvPgY6taaSzDaK5FnGEAbPNGEmI',
	authDomain: 'labmis-1c6c2.firebaseapp.com',
	projectId: 'labmis-1c6c2',
	storageBucket: 'labmis-1c6c2.appspot.com',
	messagingSenderId: '481878077751',
	appId: '1:481878077751:web:661f45bd58d78ef164aab2',
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
