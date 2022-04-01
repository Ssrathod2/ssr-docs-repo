//import { initializeApp } from "firebase/app";
import firebase from 'firebase/compat/app'
import 'firebase/compat/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyAgOW6VMBV71sMyztzXcYUtYwjytkHxZWk',
  authDomain: 'docs-yt-1d30d.firebaseapp.com',
  projectId: 'docs-yt-1d30d',
  storageBucket: 'docs-yt-1d30d.appspot.com',
  messagingSenderId: '914998623218',
  appId: '1:914998623218:web:94bcb4c0b7ea696a7ec96b',
}

const app = !firebase.apps.length
  ? firebase.initializeApp(firebaseConfig)
  : firebase.app()

const db = app.firestore()

export { db }
