import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { doc, onSnapshot, setDoc } from 'firebase/firestore';
import { useParams } from 'react-router-dom';
import DeleteDocument from './DeleteDocument';
import RenameDocument from './RenameDocument';
import { db } from '../firebase';

const EditorContainer = styled.div`
padding: 10px;
`;

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true };
    }

    componentDidCatch(error, info) {
        console.log(error, info);
    }

    render() {
        if (this.state.hasError) {
            return <h1>Something went wrong.</h1>;
        }

        return this.props.children;
    }
}

function Editor() {
    const quillRef = useRef(null);
    const { id } = useParams();
    const docRef = doc(db, 'documents', id);
    const [saveTimeoutId, setSaveTimeoutId] = useState(null);
    const [docName, setDocName] = useState(''); // Add state for document name

    useEffect(() => {
        try {
            onSnapshot(docRef, (doc) => {
                const editor = quillRef.current.getEditor();
                // Check if doc.data().content is not empty
                if (doc.data().content) {
                    const contents = JSON.parse(doc.data().content);
                    // Save the cursor position
                    const range = editor.getSelection();
                    editor.setContents(contents);
                    // Restore the cursor position
                    editor.setSelection(range);
                }
                // Update document name
                setDocName(doc.data().name || '');
            });
        } catch (error) {
            console.error('Error loading document: ', error);
        }
    }, [id]);

    const handleChange = (content, delta, source, editor) => {
        try {
            // Clear the previous save timeout
            if (saveTimeoutId) {
                clearTimeout(saveTimeoutId);
            }

            // Set a new save timeout
            const newSaveTimeoutId = setTimeout(() => {
                try {
                    const contents = editor.getContents();
                    setDoc(docRef, { content: JSON.stringify(contents), name: docName }); // Save document name as well
                } catch (error) {
                    console.error('Error saving document: ', error);
                }
            }, 100); // Save every 90 seconds

            // Save the new save timeout ID
            setSaveTimeoutId(newSaveTimeoutId);
        } catch (error) {
            console.error('Error saving document: ', error);
        }
    };

    return (
        <ErrorBoundary>
            <EditorContainer>
                <ReactQuill theme="snow" ref={quillRef} onChange={handleChange} />
                <DeleteDocument id={id} />
                <RenameDocument id={id} docName={docName} setDocName={setDocName} /> {/* Pass docName and setDocName as props */}
            </EditorContainer>
        </ErrorBoundary>
    );
}

export default Editor;