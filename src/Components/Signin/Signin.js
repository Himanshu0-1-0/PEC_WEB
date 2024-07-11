// src/components/GoogleLogin.js
import React, { useState } from "react";
import { auth, googleProvider, signInWithPopup,db } from "../../firebase.js";
import { useAuth } from "../../context/AuthContext.js";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { useNavigate } from 'react-router-dom';
import "./Signin.css"

const Login = () => {
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const { currentUser,userPosts } = useAuth();

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
            authorities: false,
            profilePic: user.photoURL
          });
          console.log('User added to the database');
        } else {
          console.log('User already exists in the database');
        }
        console.log('Login successful with PEC email');
        console.log(userPosts);
        navigate('/dashboard');
      }
    } catch (error) {
      console.log(error);
      setError(error.message);
    }
    };

    return (
      <div className="csd">
        <div className="sls">
          <img src="/PEC.png" alt="PEC_logo" className="sasw"/>
        </div>
        <div className="adad">
        <h2>Login with Google</h2>
        </div>
        
        {currentUser ? (
          <p>Welcome, {currentUser.displayName}</p>
          // <>
          // <p>{currentUser.uid}</p>
          // <img src={currentUser.photoURL} alt="img" />
          // <p>{isAuthority=="true"?"Ss":"Aa"}</p>
          // </>
          
          // <p>{currentUser.photoURL}</p>
        ) : (
          <button onClick={handleGoogleLogin} className="saow "> 
        <img src="/google.png" alt="Google Logo"  className="saq"/>
               <div className="dfd">
               Login with Google
                </div></button>
        )}
        {error && <p>{error}</p>}
      </div>
    );
};

export default Login;
