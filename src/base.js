import Rebase from 're-base';
import firebase from 'firebase';

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyCsG62LI4vlgLc9GnYyekMmNAZQNlAZtf8",
    authDomain: "catch-of-the-day-667ea.firebaseapp.com",
    databaseURL: "https://catch-of-the-day-667ea.firebaseio.com"
    
});
const base = Rebase.createClass(firebaseApp.database());

//this is a named export
export { firebaseApp };

//this is a default export
export default base;