import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { firebase, auth } from './firebase';
import Editor from './components/Editor';
import Toolbar from './components/Toolbar';
import SignIn from './components/SignIn';
import NewDocument from './components/NewDocument';
import DocumentsList from './components/DocumentsList';

const AppContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
`;

const MainContainer = styled.div`
  border: 1px solid #ccc;
  border-radius: 5px;
`;

function App() {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    try {
      const unsubscribe = auth.onAuthStateChanged((user) => {
        setUser(user);
      });
      return unsubscribe;
    } catch (error) {
      setError(error.message);
    }
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!user) {
    return <SignIn />;
  }

  return (
    <Router>
      <AppContainer>
        <MainContainer>
          <Toolbar />
          <Routes>
            <Route path="/doc/:id" element={<><DocumentsList /><NewDocument /><Editor /></>} />
            <Route path="/" element={<><DocumentsList /><NewDocument /></>}/>
          </Routes>
        </MainContainer>
      </AppContainer>
    </Router>
  );
}

export default App;