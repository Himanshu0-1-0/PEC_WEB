// src/components/GoogleLogin.js
import React, { useState } from "react";
import { auth, googleProvider, signInWithPopup } from "../../firebase.js";
import { useAuth } from "../../context/AuthContext.js";

const Login = () => {
  const [error, setError] = useState(null);
  const { currentUser } = useAuth();

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      const emailDomain = user.email.split('@')[1];

      if (emailDomain !== 'pec.edu.in') {
        await auth.signOut();
        setError('You must sign in with a pec.edu.in email address.');
      } else {
        // Successful login
        console.log('Login successful with PEC email');
      }
    } catch (error) {
      setError(error.message);
    }
    };

    return (
      <div>
        <h2>Login with Google</h2>
        {currentUser ? (
          <p>Welcome, {currentUser.email}</p>
        ) : (
          <button onClick={handleGoogleLogin}>Login with Google</button>
        )}
        {error && <p>{error}</p>}
      </div>
    );
};

export default Login;
