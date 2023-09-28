import React, { useState, useEffect } from 'react';
import { doc, updateDoc, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase';

function RenameDocument({ id }) {
  const [name, setName] = useState('');
  const [error, setError] = useState(null);
  const docRef = doc(db, 'documents', id);

  // Fetch the document name from Firestore when the component mounts
  useEffect(() => {
    try {
      const unsubscribe = onSnapshot(docRef, (doc) => {
        setName(doc.data().name || '');  // provide a default value
      });
      return unsubscribe;
    } catch (error) {
      setError(error.message);
    }
  }, [id]);  

  const handleChange = (event) => {
    setName(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (name !== undefined) {  // ensure name is not undefined
      try {
        await updateDoc(docRef, { name });
      } catch (error) {
        setError(error.message);
      }
    }
  };  

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" value={name} onChange={handleChange} />
      <button type="submit">Rename</button>
    </form>
  );
}

export default RenameDocument;