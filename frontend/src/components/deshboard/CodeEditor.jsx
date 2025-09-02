import React, { useState } from "react";
import { ClipboardCheck, ClipboardCopy, Download } from "lucide-react";
import Editor from "@monaco-editor/react"; // assuming you’re using monaco

const CodeEditor = ({ code, setCode }) => {
  const [iscopy, setIscopy] = useState(false);

  // Copy to clipboard
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setIscopy(true);
      setTimeout(() => setIscopy(false), 2000);
    } catch (err) {
      console.error("❌ Failed to copy code:", err.message);
    }
  };

  // Download code as file
  const handleDownload = () => {
    const blob = new Blob([code], { type: "text/javascript" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = "GeneratedComponent.jsx";
    link.click();

    URL.revokeObjectURL(url);
  };

  return (
    <div className="flex-1 bg-gray-900 rounded-3xl shadow-xl overflow-hidden border border-gray-800">
      {/* Header */}
      <div className="flex items-center justify-between px-4 md:px-5 py-3 border-b border-gray-800 bg-gray-800/80 backdrop-blur-sm">
        <span className="text-sm font-semibold text-indigo-400 flex items-center gap-2">
          💻 <span className="hidden sm:inline">Code Editor</span>
        </span>

        {/* Actions */}
        <div className="flex items-center gap-2">
          {/* Copy Button */}
          <button
            onClick={handleCopy}
            className="flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-gray-200 
                       bg-gray-700 rounded-lg hover:bg-gray-600 
                       transition-colors shadow-sm active:scale-95"
          >
            {iscopy ? (
              <ClipboardCheck className="w-4 h-4 text-green-400" />
            ) : (
              <ClipboardCopy className="w-4 h-4" />
            )}
            <span className="hidden sm:inline">
              {iscopy ? "Copied" : "Copy"}
            </span>
          </button>

          {/* Download Button */}
          <button
            onClick={handleDownload}
            className="flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-gray-200 
                       bg-gray-700 rounded-lg hover:bg-gray-600 
                       transition-colors shadow-sm active:scale-95"
          >
            <Download className="w-4 h-4 text-indigo-400" />
            <span className="hidden sm:inline">Download</span>
          </button>
        </div>
      </div>

      {/* Monaco Editor */}
      <Editor
        height="55vh"
        language="javascript"
        value={code}
        onChange={(value) => setCode(value || "")}
        theme="vs-dark"
        options={{
          fontSize: 14,
          minimap: { enabled: true },
          scrollBeyondLastLine: false,
          automaticLayout: true,
        }}
      />
    </div>
  );
};

export default CodeEditor;
