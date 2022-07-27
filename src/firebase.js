//import firebase from 'firebase/app'
// import 'firebase/auth'

import { initializeApp } from 'firebase/app'
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
} from 'firebase/auth'
import { getFirestore } from '@firebase/firestore'
import { useEffect, useState } from 'react'

const firebaseconfig = {
  apiKey: 'AIzaSyDuD5fOLirhMzk4Hwlquyqb2JorVScW3bA',
  authDomain: 'fir-react-a30f1.firebaseapp.com',
  projectId: 'fir-react-a30f1',
  storageBucket: 'fir-react-a30f1.appspot.com',
  messagingSenderId: '62010184012',
  appId: '1:62010184012:web:4b0172c3fc7f39a08c7fe9',
}

const app = initializeApp(firebaseconfig)

export const db = getFirestore(app)

export const auth = getAuth(app)

const provider = new GoogleAuthProvider()

export const signInWithGoogle = () => {
  signInWithPopup(auth, provider)
    .then((result) => {
      const name = result.user.displayName

      localStorage.setItem('name', name)
    })
    .catch((error) => {
      console.log(error)
    })
}

export const useAuth = () => {
  const [currentUser, setCurrentuser] = useState()

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => setCurrentuser(user))
    return unsub
  }, [])

  return currentUser
}
