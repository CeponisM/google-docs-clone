import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase';

function DocumentsList() {
  const [documents, setDocuments] = useState([]);
  const [error, setError] = useState(null);

  // Fetch the documents from Firestore when the component mounts
  useEffect(() => {
    try {
      const unsubscribe = onSnapshot(collection(db, 'documents'), (snapshot) => {
        const docs = snapshot.docs.map((doc) => ({
          id: doc.id,
          name: doc.data().name,
          content: doc.data().content,
        }));
        setDocuments(docs);
      }, (error) => {
        setError(error);
      });

      // Stop listening for changes when the component unmounts
      return unsubscribe;
    } catch (error) {
      setError(error.message);
    }
  }, []);

  // Display an error message if there was an error loading the documents
  if (error) {
    return <div>Error loading documents: {error}</div>;
  }

  // Display the list of documents
  return (
    <div>
      {documents.map((doc) => (
        <div key={doc.id}>
          <Link to={`/doc/${doc.id}`}>{doc.name || 'Untitled Document'}</Link>
        </div>
      ))}
    </div>
  );
}

export default DocumentsList;