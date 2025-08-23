import { useEffect, useMemo, useState } from "react";
import { LiveProvider, LivePreview, LiveError } from "react-live";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import React from "react";
import { ClipboardCopy, ClipboardCheck, Code2 } from "lucide-react";
import API from "../../services/api";
import {
  detectComponents,
  detectDefaultExportName,
  stripESM,
} from "./PreviewBox";

const MyComponents = ({ userToken }) => {
  const [components, setComponents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showCodeIndex, setShowCodeIndex] = useState(null);
  const [copiedIndex, setCopiedIndex] = useState(null);

  // prepare sanitized preview code per component
  const processedComponents = useMemo(() => {
    return components.map((comp) => {
      const defaultName = detectDefaultExportName(comp.code);
      const componentNames = detectComponents(comp.code);
      const chosen = defaultName || componentNames[0] || null;

      let safe = stripESM(comp.code);

      const userAlreadyRenders = /<\s*[A-Z][\w]*/.test(safe);

      if (!userAlreadyRenders && chosen) {
        safe += `\n\nrender(<${chosen} />);`;
        return { ...comp, finalCode: safe, useNoInline: true };
      }

      return {
        ...comp,
        finalCode: safe,
        useNoInline: userAlreadyRenders ? false : true,
      };
    });
  }, [components]);

  useEffect(() => {
    const fetchComponents = async () => {
      try {
        const res = await API.get("/api/components");
        if (res.status === 200) {
          setComponents(res.data);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchComponents();
  }, [userToken]);

  const handleCopy = (code, index) => {
    navigator.clipboard.writeText(code);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  if (loading)
    return (
      <div className="flex items-center justify-center h-[70vh]">
        <p className="text-gray-500 dark:text-gray-400 text-lg">
          Loading your components...
        </p>
      </div>
    );

  if (!components.length)
    return (
      <div className="flex flex-col items-center justify-center h-[70vh] gap-4">
        <p className="text-gray-500 dark:text-gray-300 text-lg">
          You haven't generated any components yet.
        </p>
        <p className="text-gray-400 dark:text-gray-500 text-sm">
          Start creating in the Playground!
        </p>
      </div>
    );

  return (
    <div className="flex flex-col w-full gap-6 p-6 bg-gray-950 text-gray-200">
      <h1 className="text-3xl font-bold text-white">My Components</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {processedComponents.map((comp, i) => (
          <div
            key={i}
            className="bg-gray-900 max-h-[400px] w-full rounded-3xl shadow-xl overflow-hidden flex flex-col border border-gray-700"
          >
            {/* Header */}
            <div className="px-5 py-3 border-b border-gray-700 flex justify-between items-center">
              <h2 className="text-lg font-semibold line-clamp-1">
                {comp.prompt}
              </h2>
              <button
                onClick={() => setShowCodeIndex(showCodeIndex === i ? null : i)}
                className="text-indigo-400 cursor-pointer text-sm font-medium hover:underline"
              >
                {showCodeIndex === i ? "Hide Code" : <Code2 />}
              </button>
            </div>

            {/* Body */}
            <div className="p-4 flex-1 overflow-auto">
              {showCodeIndex === i ? (
                <div className="flex flex-col gap-2">
                  {/* Copy Button */}
                  <button
                    onClick={() => handleCopy(comp.code, i)}
                    className="self-end flex items-center gap-2 px-3 py-1.5 text-xs font-medium 
                      text-gray-200 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors shadow-sm"
                  >
                    {copiedIndex === i ? (
                      <>
                        <ClipboardCheck className="w-4 h-4 text-green-400" />
                        Copied
                      </>
                    ) : (
                      <>
                        <ClipboardCopy className="w-4 h-4" />
                        Copy
                      </>
                    )}
                  </button>

                  {/* Syntax Highlighted Code */}
                  <SyntaxHighlighter
                    language="jsx"
                    style={oneDark}
                    className="w-full rounded-2xl overflow-auto"
                  >
                    {comp.code}
                  </SyntaxHighlighter>
                </div>
              ) : (
                // React live preview
                <LiveProvider
                  code={comp.finalCode}
                  scope={{ React }}
                  noInline={comp.useNoInline}
                >
                  <div className="w-full min-h-[150px] flex items-center justify-center p-4 rounded-2xl bg-gray-800 shadow-inner">
                    <LivePreview />
                  </div>
                  <LiveError className="text-red-500 mt-2 text-sm font-mono" />
                </LiveProvider>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyComponents;
