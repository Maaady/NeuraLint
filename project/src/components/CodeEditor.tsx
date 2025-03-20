import React, { useState } from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { atomOneDark } from 'react-syntax-highlighter/dist/esm/styles/hljs';

interface CodeEditorProps {
  initialCode: string;
  language: string;
  onCodeChange: (code: string) => void;
}

const CodeEditor: React.FC<CodeEditorProps> = ({ initialCode, language, onCodeChange }) => {
  const [code, setCode] = useState(initialCode);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newCode = e.target.value;
    setCode(newCode);
    onCodeChange(newCode);
  };

  return (
    <div className="relative rounded-md overflow-hidden border border-gray-700">
      <div className="absolute inset-0 overflow-hidden">
        <SyntaxHighlighter
          language={language}
          style={atomOneDark}
          className="h-full"
          showLineNumbers
          wrapLines
        >
          {code}
        </SyntaxHighlighter>
      </div>
      <textarea
        value={code}
        onChange={handleChange}
        className="absolute inset-0 w-full h-full bg-transparent text-transparent caret-white resize-none p-4 font-mono text-sm leading-normal z-10"
        spellCheck="false"
      />
    </div>
  );
};

export default CodeEditor;