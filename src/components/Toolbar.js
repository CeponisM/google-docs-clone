import React from 'react';
import styled from 'styled-components';

const ToolbarContainer = styled.div`
display: flex;
justify-content: space-between;
padding: 10px;
border-bottom: 1px solid #ccc;
`;

const Button = styled.button`
margin-right: 5px;
`;

function Toolbar({ editor }) {
    const handleBold = () => {
        editor.format('bold', true);
    };

    const handleItalic = () => {
        editor.format('italic', true);
    };

    const handleUnderline = () => {
        editor.format('underline', true);
    };

    const handleUndo = () => {
        editor.history.undo();
    };

    const handleRedo = () => {
        editor.history.redo();
    };

    return (
        <ToolbarContainer>
            <div>
                {/* Add drop-down menu 'file' */}
            </div>
            <div>
                <Button onClick={handleUndo}>Undo</Button>
                <Button onClick={handleRedo}>Redo</Button>
            </div>
        </ToolbarContainer>
    );
}

export default Toolbar;