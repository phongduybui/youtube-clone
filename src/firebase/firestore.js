/* eslint-disable */
import firebase from "firebase/app";
import "firebase/firestore";
import firebaseApp from '../firebaseConfig';

const db = firebase.firestore();

export const addComment = (comment) => {
  return db.collection("comments").add(comment);
}

export const getComment = async (uid, videoId) => {
  let results = {};
  const response = await db.collection("comments").get();

  response.forEach(doc => {
      if(doc.data().uid === uid && doc.data().snippet.videoId === videoId) {
        results = { ...results, [doc.id]: doc.data() }
      }
  });
  return results;
}

// export const 