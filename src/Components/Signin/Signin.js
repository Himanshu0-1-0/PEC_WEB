// src/components/GoogleLogin.js
import React, { useState } from "react";
import { auth, googleProvider, signInWithPopup,db } from "../../firebase.js";
import { useAuth } from "../../context/AuthContext.js";
import { doc, getDoc, setDoc } from "firebase/firestore";

const Login = () => {
  const [error, setError] = useState(null);
  const { currentUser } = useAuth();

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      console.log(user)
      const emailDomain = user.email.split('@')[1];

      if (emailDomain !== 'pec.edu.in') {
        await auth.signOut();
        setError('You must sign in with a pec.edu.in email address.');
      } else {
        const userDocRef = doc(db, 'users', user.uid);
        console.log(user.uid);
        const userDoc = await getDoc(userDocRef);
        if (!userDoc.exists()) {
          // Add new user to the database
          await setDoc(userDocRef, {
            email: user.email,
            name: user.displayName,
            posts: [],
            authorities: []
          });
          console.log('User added to the database');
        } else {
          console.log('User already exists in the database');
        }
        console.log('Login successful with PEC email');
        console.log(currentUser)
      }
    } catch (error) {
      console.log(error);
      setError(error.message);
    }
    };

    return (
      <div>
        <h1>s</h1>
        <h1>s</h1>
        <h1>s</h1>
        <h1>s</h1>
        <h2>Login with Google</h2>
        {currentUser ? (
          // <p>Welcome, {currentUser.displayName}</p>
          <img src={currentUser.photoURL} alt="img" />
          // <p>{currentUser.photoURL}</p>
        ) : (
          <button onClick={handleGoogleLogin}>Login with Google</button>
        )}
        {error && <p>{error}</p>}
      </div>
    );
};

export default Login;
