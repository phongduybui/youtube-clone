/* eslint-disable */
import firebase from 'firebase/app';
import "firebase/auth";
import firebaseApp from '../firebaseConfig';

const provider = new firebase.auth.GoogleAuthProvider();

export const googleSignInPopup = () => {
  firebase.auth()
    .signInWithPopup(provider)
    // .then((result) => {
    //   console.log(result.user);
    // }).catch((error) => {
    //   console.log(error);
    // });
}

export const signOut = () => {
  firebase.auth()
    .signOut()
    // .then(() => {
    //   console.log('Sign-out successful.');
    // }).catch((error) => {
    //   console.log(error);
    // });
}