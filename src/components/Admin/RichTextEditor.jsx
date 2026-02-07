import React, { useRef, useEffect } from 'react';
import { Bold, Italic, List, Heading2, Type, Undo, Redo } from 'lucide-react';

const RichTextEditor = ({ value, onChange }) => {
    const editorRef = useRef(null);

    // Sync content from props only if it differs significantly properly
    // This is a naive implementation but sufficient for admin panels where one user edits.
    useEffect(() => {
        if (editorRef.current && value !== editorRef.current.innerHTML) {
            // Only update if the editor is empty or significantly different to avoid cursor jumps
            // In a real controlled input, this is hard.
            // Hack: We assume if the user is typing, we assume they are the source of truth.
            // We only load 'value' if we are focusing or it's first load.
            // Better: Compare text content?
            // Let's just do: If editor is NOT focused, or if it's empty.
            if (document.activeElement !== editorRef.current) {
                editorRef.current.innerHTML = value || '';
            }
        }
    }, [value]);

    const handleInput = () => {
        if (editorRef.current) {
            const html = editorRef.current.innerHTML;
            onChange(html);
        }
    };

    const exec = (command, val = null) => {
        document.execCommand(command, false, val);
        if (editorRef.current) {
            editorRef.current.focus();
            handleInput();
        }
    };

    const ToolbarButton = ({ onClick, icon: Icon, title }) => (
        <button
            onClick={(e) => { e.preventDefault(); onClick(); }}
            title={title}
            style={{
                cursor: 'pointer',
                padding: '6px',
                border: 'none',
                background: 'transparent',
                borderRadius: '4px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#555'
            }}
            onMouseOver={(e) => e.currentTarget.style.background = '#e5e5e5'}
            onMouseOut={(e) => e.currentTarget.style.background = 'transparent'}
        >
            <Icon size={18} />
        </button>
    );

    return (
        <div style={{ border: '1px solid #ddd', borderRadius: '6px', overflow: 'hidden', background: 'white' }}>
            <div style={{
                background: '#f8f9fa',
                padding: '8px 12px',
                borderBottom: '1px solid #eee',
                display: 'flex',
                gap: '8px',
                alignItems: 'center'
            }}>
                <ToolbarButton onClick={() => exec('bold')} icon={Bold} title="Bold" />
                <ToolbarButton onClick={() => exec('italic')} icon={Italic} title="Italic" />
                <div style={{ width: '1px', height: '20px', background: '#ddd', margin: '0 4px' }}></div>
                <ToolbarButton onClick={() => exec('formatBlock', 'H2')} icon={Heading2} title="Heading" />
                <ToolbarButton onClick={() => exec('formatBlock', 'P')} icon={Type} title="Paragraph" />
                <div style={{ width: '1px', height: '20px', background: '#ddd', margin: '0 4px' }}></div>
                <ToolbarButton onClick={() => exec('insertUnorderedList')} icon={List} title="Bullet List" />

                {/* Spacer */}
                <div style={{ flex: 1 }}></div>

                <ToolbarButton onClick={() => exec('undo')} icon={Undo} title="Undo" />
                <ToolbarButton onClick={() => exec('redo')} icon={Redo} title="Redo" />
            </div>

            <div
                ref={editorRef}
                contentEditable
                onInput={handleInput}
                style={{
                    minHeight: '400px',
                    padding: '20px',
                    outline: 'none',
                    lineHeight: '1.6',
                    fontFamily: 'sans-serif',
                    fontSize: '1rem',
                    color: '#333'
                }}
            />
            <style>{`
                .editor-content ul { padding-left: 20px; list-style-type: disc; }
                .editor-content h2 { font-size: 1.25rem; font-weight: bold; margin-top: 1em; margin-bottom: 0.5em; color: #333; }
                .editor-content p { margin-bottom: 1em; }
            `}</style>
        </div>
    );
};

export default RichTextEditor;
