import React from 'react';
import { useNavigate } from 'react-router-dom';
import { doc, deleteDoc } from 'firebase/firestore';
import { db } from '../firebase';

function DeleteDocument({ id }) {
  const navigate = useNavigate();
  const docRef = doc(db, 'documents', id);

  const handleClick = async () => {
    try {
      await deleteDoc(docRef);
      navigate('/');
    } catch (error) {
      console.error('Error deleting document: ', error);
    }
  };

  return (
    <button onClick={handleClick}>Delete</button>
  );
}

export default DeleteDocument;