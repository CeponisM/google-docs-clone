import React, { useState } from 'react';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import { auth, GoogleAuthProvider, EmailAuthProvider } from '../firebase'; // Import auth and GoogleAuthProvider

function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null); // Add state for error

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSignUp = async (event) => {
    event.preventDefault();
    try {
      await auth.createUserWithEmailAndPassword(email, password);
    } catch (error) {
      setError(error.message); // Set error message
    }
  };

  const uiConfig = {
    signInFlow: 'popup',
    signInOptions: [
      EmailAuthProvider.PROVIDER_ID,
      GoogleAuthProvider.PROVIDER_ID, // Add Google sign-in
      // Add other providers as needed.
    ],
    callbacks: {
      signInSuccessWithAuthResult: () => false,
    },
  };

  return (
    <div>
      <h1>Google Docs Clone</h1>
      <p>Please sign in:</p>
      {error && <p>Error: {error}</p>} {/* Display error message */}
      <form onSubmit={handleSignUp}>
        <input type="email" value={email} onChange={handleEmailChange} placeholder="Email" />
        <input type="password" value={password} onChange={handlePasswordChange} placeholder="Password" />
        <button type="submit">Sign Up</button>
      </form>
      <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={auth} />
    </div>
  );
}

export default SignIn;