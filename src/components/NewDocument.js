import React from 'react';
import { useNavigate } from 'react-router-dom';
import { doc, setDoc, collection } from 'firebase/firestore';
import { db } from '../firebase';
import styled from 'styled-components';

// Styled component for the new document button
const NewDocumentButton = styled.button`
/* Add your styles here */
`;

function NewDocument() {
  // Hook for navigating programmatically
  const navigate = useNavigate();

  const handleClick = async () => {
    try {
      // Create a new document in Firestore
      const docRef = doc(collection(db, 'documents'));
      await setDoc(docRef, { name: 'Untitled Document', content: [''] }); // content is now an array with an empty string

      // Navigate to the new document's page
      navigate(`/doc/${docRef.id}`);
    } catch (error) {
      console.error('Error creating document: ', error);
    }
  };

  return (
    <NewDocumentButton onClick={handleClick}>New Document</NewDocumentButton>
  );
}

export default NewDocument;