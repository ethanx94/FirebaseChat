import React, { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";

import Chat from './Containers/Chat';
import Login from './Containers/Login';
import { firestore, auth } from "./firebase";

import "./styles.css";

function App() {
  const [user] = useAuthState(auth);

  useEffect(() => {
    if (user) {
      let canceled = false;
      const userDoc = firestore.doc(`users/${user.uid}`);

      userDoc.get().then(snapshot => {
        if (canceled) {
          return;
        }
        if (!snapshot.exists) {
          userDoc.set({
            displayName: user.displayName,
            photoURL: user.photoURL
          });
        }
      });

      return () => (canceled = true);
    }
  }, [user]);

  if (!user) {
    return <Login />;
  } else {
    return <Chat user={user} />;
  }
}

export default App;
